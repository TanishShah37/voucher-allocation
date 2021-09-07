const mongoose = require("mongoose");


const voucherSchema = new mongoose.Schema({
    voucherCode:{
        type: String

    },
    amount:{
        type: Number

    },
    expiry:{
        type: Date

    }
});


module.exports = mongoose.model("vouchers", voucherSchema);
