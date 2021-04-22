var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    productid:{type:Number, unique: true},
    productname: {type: String},
    price:{type:Number},
    description:{type:String},
    imagepath:{type:String},
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'category'
    },
    orders:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'order'
        }
    ]
});

mongoose.model('product',productSchema)