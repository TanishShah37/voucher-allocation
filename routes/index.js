const voucherroutes = require('./voucher');
module.exports = app => {
    app.use(`${process.env.APIVERSION}/voucher`, voucherroutes);
   
};