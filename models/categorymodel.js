var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
    categoryid:{type:Number, unique: true},
    categoryname: {type: String},
    products : [
        {type:mongoose.Schema.Types.ObjectId,ref:'product'}
    ]
});

mongoose.model('category',categorySchema)