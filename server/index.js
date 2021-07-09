const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const keys = require("./keys");

/// Models
const User = require("./models/user");

/// Express Initializing
const app = express();
app.use(express.urlencoded({ extended: true }));

/// Middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(async (req, res, next) => {
  try {
    const user = await User.findById("60e5cf04095b6c03ec022dd7");
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
  }
});

/// Routes
const tasks = require("./routes/api/tasks");
app.use("/api/tasks", tasks);

/**
 * Main loop
 */
async function start_application() {
  try {
    await mongoose.connect(keys.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const candidate = await User.findOne();
    if (!candidate) {
      const user = new User({
        email: "bandanovvs@gmail.com",
        name: "Bogdan",
        password: "123456",
        avatarUrl:
          "https://avatars.githubusercontent.com/u/65295972?s=400&u=5086e0c4347484c9cfb8e5bad720948079e61d4c&v=4",
        tasks: [],
      });

      await user.save();
    }

    app.listen(keys.PORT, () => {
      console.log(`Server is running on port ${keys.PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

start_application();
