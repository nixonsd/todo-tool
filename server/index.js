const express = require("express");
const cookieParser = require("cookie-parser");
const history = require("connect-history-api-fallback");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const compression = require('compression');
const session = require("express-session");
const MongoStore = require("connect-mongodb-session")(session);
const varMiddleware = require("./middleware/variables");
const userMiddleware = require("./middleware/user");
const keys = require("./keys");

/// Express Initializing
const app = express();
app.use(history());
app.use(compression());
app.set("trust proxy", 1);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname + "/public/"));
  app.get("*", (req, res, next) => {
    if (req.path.match(/^\/api\/.*$/)) next();
    else res.sendFile(__dirname + "/public/index.html");
  });
}

const store = new MongoStore({
  collection: "sessions",
  uri: keys.MONGODB_URI,
});
app.use(express.urlencoded({ extended: true }));

/// Middlewares
app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  session({
    secret: keys.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store,
    proxy: process.env.NODE_ENV === "production",
    cookie: {
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // must be 'none' to enable cross-site delivery
      secure: process.env.NODE_ENV === "production", // must be true if sameSite='none'
    },
  })
);

app.use(
  cors({
    origin: ["http://localhost:8081", "https://localhost:8081"],
    credentials: true,
  })
);

app.use(helmet());
app.use(varMiddleware);
app.use(userMiddleware);

/// Routes
const tasks = require("./routes/api/tasks");
const auth = require("./routes/api/auth");
app.use("/api/tasks", tasks);
app.use("/api/auth", auth);

/**
 * Main loop
 */
async function start_application() {
  try {
    await mongoose.connect(keys.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    });

    app.listen(keys.PORT, () => {
      console.log(`Server is running on port ${keys.PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

start_application();
