const { Router } = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const sendinBlue = require("nodemailer-sendinblue-transport");
const User = require("../../models/user");
const restoreEmail = require("../../emails/restore");
const auth = require("../../middleware/auth");
const keys = require("../../keys");
const router = Router();

const AUTH_TOKEN_KEY = "sid";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  service: "gmail",
  port: 587,
  secure: true,
  auth: {
    // type: service.type,
    type: "OAuth2",
    user: keys.EMAIL_USER,
    password: keys.EMAIL_PASSWORD,
    // serviceClient: service.client_id,
    // privateKey: service.private_key,
    scope: "https://www.googleapis.com/auth/gmail.send",
    clientId: keys.CLIENT_ID,
    clientSecret: keys.CLIENT_SECRET,
    refreshToken: keys.REFRESH_TOKEN,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

/**
 * Login API Method api/auth/login
 * * req.body {email: String, password: String, remember: Boolean}
 * @param req.body An object that consists of authorization data
 * @return session id
 */
router.post("/login", async (req, res) => {
  try {
    // Type
    const type = "default";
    // Fill first response data
    let data = {
      id: "auth_failed",
      status: 404,
      message: "Wrong login and/or password",
    };
    // Get user by email
    const { email, password, remember } = req.body;
    const candidate = await User.findOne({ type, email });
    // If user exists then go through
    if (candidate) {
      // Check wether passwords are same
      const areSame = await bcrypt.compare(password, candidate.password);
      if (areSame) {
        if (!remember) {
          // Short session
          req.session.cookie.expires = false;
          res.cookie(AUTH_TOKEN_KEY, req.session.id, {
            expires: false,
          });
        } else {
          // Long session
          req.session.cookie.maxAge = 31 * 24 * 60 * 60 * 1000;
          res.cookie(AUTH_TOKEN_KEY, req.session.id, {
            maxAge: 31 * 24 * 60 * 60 * 1000,
          });
        }
        // Session options
        req.session.user = { _id: candidate._id };
        req.session.isAuthenticated = true;
        req.session.save((err) => {
          if (err) {
            throw err;
          }
        });
        /// Send data to front-end
        data = {
          id: "auth_succeed",
          status: 200,
          message: req.session.id,
        };
      }
    }
    // Send Response
    res
      .status(data.status)
      .send(JSON.stringify({ id: data.id, message: data.message }));
  } catch (e) {
    console.log(e);
  }
});

/**
 * Login Google OAuth2 API Method api/auth/login
 * * req.body { loginType: String, google: OAuth2Obj }
 * @param req.body An object that consists of authorization data
 */
router.post("/login/google", async (req, res) => {
  try {
    // Fill first response data
    let data = {
      id: "auth_failed",
      status: 404,
      message: "Wrong login and/or password",
    };
    const { loginType, google } = req.body;
    const { OAuth2Client } = require("google-auth-library");
    const _client = new OAuth2Client(keys.CLIENT_ID);
    const ticket = await _client.verifyIdToken({
      idToken: google.Zb.id_token,
      audience: keys.CLIENT_ID,
    });
    const payload = ticket.getPayload();
    let email = payload["email"];
    let name = payload["name"];

    let candidate = await User.findOne({ type: loginType, email });
    if (!candidate) {
      const hash = await crypto.randomBytes(32);
      const user = new User({
        type: loginType,
        name,
        password: hash.toString("hex"),
        email,
      });
      candidate = user;
      // Save user
      await user.save();
    }

    // Long session
    req.session.cookie.maxAge = 31 * 24 * 60 * 60 * 1000;
    res.cookie(AUTH_TOKEN_KEY, req.session.id, {
      maxAge: 31 * 24 * 60 * 60 * 1000,
    });
    // Session options
    req.session.user = { _id: candidate._id };
    req.session.isAuthenticated = true;
    req.session.save((err) => {
      if (err) {
        throw err;
      }
    });
    /// Send data to front-end
    data = {
      id: "auth_succeed",
      status: 200,
      message: req.session.id,
    };
    // Send Response
    res
      .status(data.status)
      .send(JSON.stringify({ id: data.id, message: data.message }));
  } catch (e) {
    console.log(e);
  }
});

/**
 * Logout API Method api/auth/logout
 */
router.post("/logout", async (req, res) => {
  try {
    // Destroy session cookies
    req.session.destroy((err) => {
      res.clearCookie(AUTH_TOKEN_KEY);
      res.clearCookie("connect.sid").status(204).send();
    });
  } catch (e) {
    console.log(e);
  }
});

/**
 * Register API Method api/auth/register
 * * req.body {name: String, email: String, password: String}
 * @param req.body An object that consists of authorization data
 */
router.post("/register", async (req, res) => {
  try {
    // Fill first response data
    let data = {
      id: "auth_failed",
      status: 403,
      message: "This email is already in use",
    };
    // Get user info
    const { email, password, name } = req.body;
    // Check whether email is exsisted
    const user = await User.findOne({ email });
    if (!user) {
      /// Fill user data
      const hashPassword = await bcrypt.hash(password, 10);
      const user = new User({
        type: "default",
        name,
        email,
        password: hashPassword,
      });
      // Save user
      await user.save();
      // Write success response data
      data = {
        id: "auth_succeed",
        status: 201,
        message: "OK",
      };
    }
    // Send response
    res
      .status(data.status)
      .send(JSON.stringify({ id: data.id, message: data.message }));
  } catch (e) {
    console.log(e);
  }
});

/**
 * Add user reset token
 * * req.body {email: String}
 * @param req.body An object that consists of email
 */
router.post("/restore", (req, res) => {
  crypto.randomBytes(32, async (err, buffer) => {
    try {
      // Fill first response data
      let data = {
        id: "restore_failed",
        status: 404,
        message: "Email is not found",
      };

      // Get user by email
      const { email } = req.body;
      const user = await User.findOne({ type: "default", email });

      if (user) {
        if (!err) {
          // Generate Token
          const token = buffer.toString("hex");
          user.resetToken = token;
          user.resetTokenExp = Date.now() + 60 * 60 * 1000;
          await user.save();
          // Send Mail
          await transporter.sendMail(restoreEmail(email, user));
          // Write success response data
          data = {
            id: "restore_succeed",
            status: 200,
            message: "A reset link has been emailed",
          };
        } else {
          // Write error response data
          data = {
            id: "restore_failed",
            status: 500,
            message: "Internal error",
          };
        }
      }
      // Send response
      res
        .status(data.status)
        .send(JSON.stringify({ id: data.id, message: data.message }));
    } catch (e) {
      console.log(e);
    }
  });
});

router.post("/restore/:resetToken", async (req, res) => {
  try {
    // Type
    const type = "default";
    // Fill first response data
    let data = {
      id: "restore_failed",
      status: 404,
      message: "Reset token is invalid or expired",
    };
    // Get user info
    const resetToken = req.params.resetToken;
    const { password } = req.body;
    // Check whether reset token is exsisted and not expired
    const user = await User.findOne({ type, resetToken });
    if (user) {
      if (user.resetTokenExp > Date.now()) {
        // Change user password
        user.password = await bcrypt.hash(password, 10);
        user.resetToken = undefined;
        user.resetTokenExp = undefined;
        await user.save();
        // Write success response data
        data = {
          id: "restore_succeed",
          status: 200,
          message: "Password has been changed. Login with your new password",
        };
      }
    }
    // Send response
    res
      .status(data.status)
      .send(JSON.stringify({ id: data.id, message: data.message }));
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
