const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
require("dotenv").config();


const createTransporter = async () => {
	const oauth2Client = new OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, "https://developers.google.com/oauthplayground");

	oauth2Client.setCredentials({
		refresh_token: process.env.REFRESH_TOKEN,
	});
// console.log("oauth2Client")
// console.log(oauth2Client)
	const accessToken = "ya29.A0ARrdaM_9pJVC16IVAeq3KWe4qhMrD_xSA8Yd_Cp_SxAkhd9LEbxjbZuzUoMEnqrpZfWGKC9Z0QoyIJH-PmKLmZxmhTo5HwgfhDahyth-sUajwgj_cZbI7QjjKsrW7qmkay7E5FrfrkHxX5ZCthgWiE6EFcTj"
	// const accessToken = await new Promise((resolve, reject) => {
	// 	oauth2Client.getAccessToken((err, token) => {
	// 		if (err) {
  //       console.log("err")
  //       // console.log(err)
	// 		  reject("Failed to create access token :(");
	// 		}
	// 		resolve(token);
	// 	});
	// });
// console.log("accessToken")
// console.log(accessToken)
	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			type: "OAuth2",
			user: process.env.EMAIL,
			accessToken,
			clientId: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			refreshToken: process.env.REFRESH_TOKEN,
		},
    tls: {
      rejectUnauthorized: false
    }
	});

	return transporter;
};

const sendEmail = async (emailOptions,err) => {
  try{
  let emailTransporter = await createTransporter();
  await emailTransporter.sendMail(emailOptions);
  console.log("ca a marché !! ")
}
catch {
  console.log("erreur from cotaclaefa",emailOptions)
}
};

sendEmail({
  subject: "Test",
  text: "I am sending an email from nodemailer!",
  to: "vachon.ludovic@gmail.com",
  from: process.env.EMAIL
});


// const sendEmail = async (email, subject, payload, template) => {
// 	try {
// 		console.log("allo");
// 		console.log(email);
// 		console.log(subject);
// 		//   let testAccount = await nodemailer.createTestAccount()
// 		// create reusable transporter object using the default SMTP transport
// 		const transporter = nodemailer.createTransport({
// 			service: "Gmail",
// 			//   port: 587,
// 			//   secure:false,
// 			auth: {
// 				user: "ludotest2204",
// 				pass: "Pistache+9", // naturally, replace both with your real credentials or an application-specific password
// 			},
// 		});


// 		const source = fs.readFileSync(path.join(__dirname, template), "utf8");
// 		const compiledTemplate = handlebars.compile(source);
// 		const options = () => {
// 			return {
// 				from: "Guy Haley",
// 				to: email,
// 				subject: subject,
// 				html: compiledTemplate(payload),
// 			};
// 		};
// 		console.log(options);
// 		// Send email
// 		transporter.sendMail(options(), (error, info) => {
// 			if (error) {
// 				console.log("error");
// 				console.log(error);
// 				return error;
// 			} else {
// 				console.log("ca marche");
// 				console.log(info);
// 				//   return res.send("toto")
// 				return res.status(200).json({
// 					success: true,
// 				});
// 			}
// 		});
// 	} catch (error) {
// 		console.log("error2");
// 		console.log(error);
// 		return error;
// 	}
// };

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
