var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/hackdb');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Express' });
});

router.get('/add', function(req,res) {
    res.render('addProduct.ejs');
});

var productSchema = new mongoose.Schema({
  prdId: String,
  Name: { type: String },
  Price: Number
})

var Product = mongoose.model('Product', productSchema);

router.post('/new', function(req, res){
  new Product({
    prdId : req.body.ProductId,
    Name  : req.body.ProductName,
    Price   : req.body.ProductPrice
  }).save(function(err, prd){
    if(err) res.json(err);
    else    res.send("Product Successfully Added !");
  });
});


module.exports = router;
