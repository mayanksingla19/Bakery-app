var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var port =process.env.PORT || 8080;

var app = express();
app.use(express.static('public'))
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');



require('./models/categorymodel');
require('./models/productmodel');
require('./models/ordermodel');
require('./models/customermodel');
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://mayank:bakery@cluster0.ofbdy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority ', { useUnifiedTopology: true, useNewUrlParser: true },function(){
    console.log('Connected to the database');
});


app.get('/',function(req,res){
    res.render("index");
});

var categorycontroller = require('./controllers/categorycontroller.js')
var categoryRouter = express.Router();
app.use('/categories',categoryRouter);
categoryRouter.get('/',categorycontroller.all);
categoryRouter.post('/add',categorycontroller.create);
categoryRouter.post('/edit',categorycontroller.edit);
categoryRouter.post('/delete',categorycontroller.delete);

var productcontroller = require('./controllers/productcontroller.js')
var productRouter = express.Router();
app.use('/products',productRouter);
productRouter.get('/',productcontroller.all);
productRouter.get('/addform',productcontroller.addform);
productRouter.post('/create',productcontroller.create);
productRouter.post('/delete',productcontroller.delete);

var purchasecontroller = require('./controllers/purchasecontroller.js')
var purchaseRouter = express.Router();
app.use('/purchase',purchaseRouter);
purchaseRouter.get('/',purchasecontroller.all);
purchaseRouter.get('/products/:catid',purchasecontroller.products);
purchaseRouter.get('/place/:pid',purchasecontroller.place);
purchaseRouter.post("/process",purchasecontroller.process);
purchaseRouter.get("/history",purchasecontroller.history);

app.listen(port);
