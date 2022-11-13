const express = require('express')
const router = express.Router()
const invoice = require('../models/invoice')


var easyinvoice = require('easyinvoice');
var fs = require('fs');
var data = {};

easyinvoice.createInvoice(data, function (result) {
  
    fs.writeFileSync("invoice.pdf", result.pdf, 'base64');
});

router.post('/', async (req, res) => {
    
   
    });

    

