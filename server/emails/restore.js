const keys = require("../keys");

module.exports = function (to, user) {
  const message = `
  <h1>Restore Password</h1>
  <p>${user.name}, did you want to reset your password? Otherwise, ignore this message.</p>
  <hr/>
  <p><a href="${keys.BASE_URL}/restore/${user.resetToken}">Click here to reset</a></p>
  <h5>Thanks for the support. <a href="${keys.BASE_URL}">TodoTool Team</a></h5>
`;
  return {
    to,
    from: keys.EMAIL_FROM,
    subject: "Access recovery",
    html: message,
  };
};
