const nodemailer = require("nodemailer")
const sendEmail = async(option) =>{
    var transporter = nodemailer.createTransport({
        service : "gmail",
        auth :{
            user : process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    });

    const mailOption ={
        from: "Dibbya Poudel <dbyapoudel22@gmail.com> ",
        to: option.email,
        subject: option.subject,
        text: option.message,

    }

    await transporter.sendMail(mailOption)
};

module.exports =sendEmail;
