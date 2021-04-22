var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product'
    },
    qty:{type:Number},
    ordertotal:{type:Number},
    orderdate:{type:Date,default:Date.now}    
});

mongoose.model('order',orderSchema)