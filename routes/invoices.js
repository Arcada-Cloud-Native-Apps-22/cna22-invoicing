const express = require('express')
const router = express.Router()
const invoice = require('../models/invoice')
const nodemailer = require("nodemailer");
var easyinvoice = require('easyinvoice');
var fs = require('fs');

//data for pdf
var data = {
   
    "images": {
        // The logo on top of your invoice
        "logo": ""
    },
    // Your own data
    "sender": {
        "company": "Sample Corp",
        "address": "Sample Street 123",
        "zip": "1234 AB",
        "city": "Sampletown",
        "country": "Samplecountry"
        
    },
    // Your recipient
    "client": {
        "company": "Client Corp",
        "address": "Clientstreet 456",
        "zip": "4567 CD",
        "city": "Clientcity",
        "country": "Clientcountry"
        
    },
    "information": {
        // Invoice number
        "number": "2021.0001",
        // Invoice data
        "date": "12-12-2021",
        // Invoice due date
        "due-date": "31-12-2021"
    },
    
    "products": [
        {
            "quantity": 2,
            "description": "Product 1",
            "tax-rate": 6,
            "price": 33.87
        },
        {
            "quantity": 4.1,
            "description": "Product 2",
            "tax-rate": 6,
            "price": 12.34
        },
        {
            "quantity": 4.5678,
            "description": "Product 3",
            "tax-rate": 21,
            "price": 6324.453456
        }
    ],
    // The message you would like to display on the bottom of your invoice
    "bottom-notice": "Due date 15 days",
    // Settings to customize your invoice
    "settings": {
        "currency": "EUR"
    }
    
};



easyinvoice.createInvoice(data, function (result) {
  
    fs.writeFileSync("invoice.pdf", result.pdf, 'base64');
});


// Email
async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Beer Masters" <beermaster@example.com>', // sender address
      to: "customer@example.com", // list of receivers
      subject: "Invoice", 
      text: "Hello! We have received your order and here is your invoice as an attachment . Drink responsibly :j", // plain text body
      
      attachments: [{
      filename: 'invoice.pdf',
      path: 'invoice.pdf',
      contentType: 'application/pdf'
    }]
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
  
  main().catch(console.error);




router.post('/', async (req, res) => {
    
   
    });

    

