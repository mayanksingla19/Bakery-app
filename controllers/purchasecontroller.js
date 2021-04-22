var mongoose = require('mongoose');
var Category = mongoose.model('category');
var Product = mongoose.model('product');
var Customer = mongoose.model('customer');
var Order = mongoose.model('order');

module.exports = {
    
    all: function(req, res){
        console.log('Calling the get category fucntion');
        Category.find({},function(err,allcategories){
            if (err) res.send(err);
            //console.log(mybooks);
            res.render('purchase',{categories:allcategories});
        })
    },
    products: async function(req, res){
        console.log(req.params);
        catid = req.params.catid;
        const category = await Category.findById(catid).populate('products');
        res.render('viewproducts',{products:category.products});
    },
    place:async function(req,res){
        pid = req.params.pid;
        console.log(pid);
        const productData = await Product.findById(pid);
        console.log(productData);
        res.render('orderform',{product:productData});
    },
    process:async function(req,res){
        console.log(req.body);
        const { customername, productid, contactno,address, qty} = req.body;
        const productData = await Product.findById(productid);
        ordertotal = qty * productData.price;
        const orderData = await Order.create({
            product:productid,
            qty,
            ordertotal
        });
        await orderData.save();
        productData.orders.push(orderData);
        await productData.save();
        orders = orderData._id;
        const customerData = await Customer.create({
            customername,
            contactno,
            address,
            orders
        });
        await customerData.save();
        console.log("record is saved");
        res.render('success');
    },
    history:async function(req,res){
        const allcustomers = await Customer.find({}).populate('orders');
        for(var i = 0; i < allcustomers.length; i++){
            const productData = await Product.findById(allcustomers[i].orders.product);
            allcustomers[i].orders.product = productData;            
        }
        
        res.render("allorders",{customers:allcustomers});
    }
}