const path = require("path");

const dotenv = require("dotenv");
const dotenvExpand = require("dotenv-expand");
var myEnv = dotenv.config({ path: "../.env" });
dotenvExpand(myEnv);

module.exports = {
  outputDir: path.resolve(__dirname, "../server/public"),
  devServer: {
    proxy: {
      "^/api": {
        target: "http://localhost:3000/",
      },
    },
  },
};
