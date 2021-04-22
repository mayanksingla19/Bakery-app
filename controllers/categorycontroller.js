var mongoose = require('mongoose');
var Category = mongoose.model('category');

module.exports = {
    
    all: function(req, res){
        console.log('Calling the get category fucntion');
        Category.find({},function(err,allcategories){
            if (err) res.send(err);
            //console.log(mybooks);
            res.render('categories',{categories:allcategories});
        })
    },
    create:function(req,res){
        console.log("I am inside the the create method");
        var categoryData = req.body;
        Category.create(categoryData,function(err, result){
            if (err) {res.render("Error inserting data into database")}
            res.redirect('/categories');

        })
    },
    edit:function(req,res){
        Category.updateOne({categoryid:req.body.categoryid}, 
            {categoryname:req.body.categoryname}, function (err, docs) {
            if (err){
                console.log(err)
            }
            else{
                console.log("Document updated");
                res.redirect('/categories')
            }
        });
        
    },
    delete:function(req,res){
        Category.deleteOne({ categoryid: req.body.categoryid }).then(function(){
            console.log("Data deleted"); // Success
            res.redirect('/categories')
        }).catch(function(error){
            console.log(error); // Failure
        });
    }
}