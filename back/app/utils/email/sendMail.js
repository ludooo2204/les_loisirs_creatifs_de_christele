const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

const sendEmail = async (email, subject, payload, template) => {
  try {
      console.log("allo")
      console.log(email)
      console.log(subject)
    //   let testAccount = await nodemailer.createTestAccount()
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
    //   port: 587,
    //   secure:false,
      auth: {
        user: 'ludotest2204',
        pass: 'Pistache+9' // naturally, replace both with your real credentials or an application-specific password
        // user: 'leseasl33pajmq76@ethereal.email',
        // pass: 'QWmYjCCfj1uaeVQBwV' // naturally, replace both with your real credentials or an application-specific password
      },
    });
//     let info = await transporter.sendMail({
//         from: '"Guy Haley"<foo@ex.com>',
//             to: email,
//             subject: subject,
//             text:"coucou ludo",
//             html:"<b>coucou ludo</b>",
//             // html: compiledTemplate(payload),
//     })
//     console.log("info")
//     console.log(info.messageId)
// console.log(nodemailer.getTestMessageUrl(info))
// console.log(transporter)

    const source = fs.readFileSync(path.join(__dirname, template), "utf8");
    const compiledTemplate = handlebars.compile(source);
    const options = () => {
      return {
        from: "Guy Haley",
        to: email,
        subject: subject,
        html: compiledTemplate(payload),
      };
    };
    console.log(options)
    // Send email
    transporter.sendMail(options(), (error, info) => {
      if (error) {
          console.log("error")
          console.log(error)
          return error;
        } else {
          console.log("ca marche")
          console.log(info)
        //   return res.send("toto")
        return res.status(200).json({
          success: true,
        });
      }
    });
  } catch (error) {
      console.log("error2")
      console.log(error)
    return error;
  }
};

/*
Example:
sendEmail(
  "youremail@gmail.com,
  "Email subject",
  { name: "Eze" },
  "./templates/layouts/main.handlebars"
);
*/

module.exports = sendEmail;