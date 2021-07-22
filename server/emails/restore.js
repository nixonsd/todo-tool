const keys = require("../keys");

module.exports = function (to, user) {
  const message = `
  <h1>Restore Password</h1>
  <p>${user.name}, you have received this email to recover the password for your account. Otherwise, ignore this message.</p>
  <hr/>
  <p><a href="${keys.BASE_URL}">Click Here</a></p>
  <h5>Thanks for the support. TodoTool Team</h5>
`;
  return {
    to,
    from: keys.EMAIL_USER,
    subject: "TodoTool. Restore password",
    html: message,
  };
};
