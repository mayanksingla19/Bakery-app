var mongoose = require('mongoose');
var Category = mongoose.model('category');
var Product = mongoose.model('product');

module.exports = {
    
    all: function(req, res){
        console.log('Calling the get category fucntion');
        Product.find({},function(err,allproducts){
            if (err) res.send(err);
            //console.log(mybooks);
            res.render('products',{products:allproducts});
        })
    },
    addform: function(req,res){
        Category.find({},function(err,allcategories){
            if (err) res.send(err);
            //console.log(mybooks);
            res.render('addproduct',{categories:allcategories});
        })
    },
    create: async function(req,res){
        console.log("I am inside the the create method");
        var productData = req.body;
        id = productData.category;
        const { productid,productname,price,description,category,imagepath} = req.body;
        const product = await Product.create({
            productid, 
            productname,
            price,
            description,
            category,
            imagepath
        });
        await product.save();
        const categoryData = await Category.findById(id);
        categoryData.products.push(product);
        await categoryData.save();
        res.redirect("/products");
    },
    delete: async function(req,res){
        console.log("I am inside the the delete method");
        pid = req.body.productid;
        const productData = await Product.findById(pid);
        const categoryData = await Category.findById(productData.category);
        categoryData.products.pull(productData);
        await categoryData.save();
        Product.deleteOne({ _id: pid }).then(function(){
            console.log("Data deleted"); // Success
            res.redirect("/products");    
        }).catch(function(error){
            console.log(error); // Failure
        });
        
    }
}