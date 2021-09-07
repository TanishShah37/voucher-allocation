const express = require('express');
const router = express.Router();
const transactionModel = require('../models/transactions');
const voucherModel = require('../models/voucher')   ;
const csvtojson = require("csvtojson");
const voucher = require('../models/voucher');


router.get('/import-data', (req, res) => {
    csvtojson()
  .fromFile("transactions - Sheet1.csv")
  .then(csvData => {
    transactionModel.insertMany(csvData, (err, data) => {
      console.log(err);
        if (err) {
          res.status(400).json({
            message: "Something went wrong!",
          });
        } else {
            csvtojson()
            .fromFile("vouchers - Sheet1.csv")
            .then(csvData => {
              voucherModel.insertMany(csvData, (err, data) => {
                  if (err) {
                    res.status(400).json({
                      message: "Something went wrong!",
                    });
                  } else {
                    res.status(200).json({
                      message: "File Uploaded Successfully!",
                      result: data,
                    });
                  }
                });
          
          
          
          
                
          
          
          
            });

        }
      });




      



  });
 


});


router.get('/output', async(req,res)=>{
  let voucherData, transacData;
  let diffamount= []

 await voucherModel.find({}, {_id:0,voucherCode:1, amount:1 }).sort({amount:1}).exec((err, data)=>{
   voucherData= data;
 


 });

 await transactionModel.find({}, {_id:0,txnId:1, amount:1 },).exec((err, data)=>{
    transacData= data;
    let output= [];
    let result = {};
    let diff= [];
    for (var j = 0, len2 = voucherData.length; j < len2; j++) { 

    for (var i = 0, len1 = transacData.length; i < len1; i++) { 
     if(transacData[i].amount-voucherData[j].amount>0){
       let temp = transacData[i].amount-voucherData[j].amount;
       if(diff.indexOf(temp)==-1){
        diff.push(temp);

       }
     }
     


         

      }
  }
                        
                    
                  

                  })
              


                      
                           

                          
        
       
      
    
    
  
 
});




      
      


module.exports = router

