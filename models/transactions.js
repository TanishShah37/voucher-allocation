const mongoose = require("mongoose");


const transactionsSchema = new mongoose.Schema({
    txnId:{
        type: Number

    },
    amount:{
        type: Number

    },
    createdDate:{
        type: Date

    }
});


module.exports = mongoose.model("transactions", transactionsSchema);
