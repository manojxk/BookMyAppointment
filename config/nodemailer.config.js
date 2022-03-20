const config = require("./auth.config");

const user = config.user;
const pass = config.pass;





const nodemailer = require("nodemailer");
const sendMail = async (name, email, confirmationCode, type) => {

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: user,
      pass: pass,
    },
  });

  let info = await transporter.sendMail({
    from: user, // sender address
    to: email, // list of receivers
    subject: "Please confirm your account", // Subject line
    text: "Hello world?", // plain text body
    html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a href=http://localhost:5000/api/${type}/confirm/${confirmationCode}> Click here</a>
        </div>`,
  })
}


module.exports = {
  sendMail
}
