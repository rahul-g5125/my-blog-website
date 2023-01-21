const express = require('express');
const ejs = require('ejs');
require("dotenv").config();
const PORT = process.env.PORT || 3030;
const nodeMailer = require('nodemailer');
const path = require("path");
const bodyParser = require('body-parser');

app = express()
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');
app.get("/", function(req, res){
    res.render("index");
});

async function mainMail(name, email, subject, message) {
    const transporter = await nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.PASSWORD,
      },
    });
    const mailOption = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: subject,
      html: `You got a message from
      Email : `+ email +`
      Name: `+ name +`
      Message: ` + message,
    };
    try {
      await transporter.sendMail(mailOption);
      return Promise.resolve("Message Sent Successfully!");
    } catch (error) {
      return Promise.reject(error);
    }
}

app.post("/", async (req, res, next) => {
    const youremail = req.body.youremail;
    const yourname = req.body.yourfname + " " + req.body.yourlname;
    const yoursubject = "My Personal Website - Contact";
    const yourmessage = req.body.yourmessage;
    console.log(youremail + yourname + yoursubject + yourmessage);
    
    try {
      if (req.body.yourfname != "Crytosweva" && req.body.yourfname != "sweva" ) {
        await mainMail(yourname, youremail, yoursubject, yourmessage);
      }
      else {
        res.send("Fuck YOU!!!!");
      }
      res.send("Message Successfully Sent!");
    } catch (error) {
        console.log(error);
      res.send("Message Could not be Sent");
    }
});

app.listen(PORT, function(){
    console.log("Server has started on port " + PORT);
});
