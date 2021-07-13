const { Router } = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../../models/user");
const auth = require("../../middleware/auth");
const router = Router();

const AUTH_TOKEN_KEY = "sid";

router.post("/login", async (req, res) => {
  try {
    let data = {
      id: "auth_failed",
      status: 404,
      message: "Wrong login and/or password",
    };
    const { email, password, remember } = req.body;
    const candidate = await User.findOne({ email });
    if (candidate) {
      const areSame = await bcrypt.compare(password, candidate.password);
      if (areSame) {
        if (!remember) {
          req.session.cookie.expires = false;
          res.cookie(AUTH_TOKEN_KEY, req.session.id, {
            expires: false,
          });
        } else {
          req.session.cookie.maxAge = 31 * 24 * 60 * 60 * 1000;
          res.cookie(AUTH_TOKEN_KEY, req.session.id, {
            maxAge: 31 * 24 * 60 * 60 * 1000,
          });
        }

        req.session.user = { _id: candidate._id };
        req.session.isAuthenticated = true;
        req.session.save((err) => {
          if (err) {
            throw err;
          }
        });
        /// Send data to front-end
        data.id = "auth_succeed";
        data.message = req.session.id;
        data.status = 200;
      }
    }

    res
      .status(data.status)
      .send(JSON.stringify({ id: data.id, message: data.message }));
  } catch (e) {
    console.log(e);
  }
});

router.post("/logout", async (req, res) => {
  try {
    req.session.destroy((err) => {
      res.clearCookie(AUTH_TOKEN_KEY);
      res.clearCookie("connect.sid").status(204).send();
    });
  } catch (e) {
    console.log(e);
  }
});

router.post("/register", async (req, res) => {
  try {
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
