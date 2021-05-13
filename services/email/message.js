const configEmail = require("./config");

const messageConfirmRegister = async (email, user_id, token) => {
  const msg = {
    from: `"Olymp Cinema" <${process.env.EMAIL_PROFILE}>`,
    to: email,
    subject: "Confirm your account on Olymp Cinema",
    html: `<form action="http://localhost:4000/api/auth/register-confirm/${token.token}/${user_id}" method="POST"><button type="submit">I'am ready</button</form>`,
  };
  return await configEmail.sendMail(msg);
};

const notificationSendEmail = async (email, subject, content) => {
  const msg = {
    from: `"Olymp Cinema" <${process.env.EMAIL_PROFILE}>`,
    to: email,
    subject: subject,
    html: `<p style="color: blue; font-size: 46px;"> ${content}</p>`,
  };
  return await configEmail.sendMail(msg);
};

// console.log("Message sent: %s", info.messageId);
// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

module.exports = { messageConfirmRegister, notificationSendEmail };
