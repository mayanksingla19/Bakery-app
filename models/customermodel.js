var mongoose = require('mongoose');

var customerSchema = new mongoose.Schema({
    customername: {type: String},    
    address:{type:String},
    contactno:{type:String},
    orders:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'order'
    }
});

mongoose.model('customer',customerSchema)