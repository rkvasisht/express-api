var express = require('express');
var path = require('path');
var fs = require('fs');
var bp = require('body-parser');
var ejsLayouts = require('express-ejs-layouts')
var app = express();

app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', 'ejs');
app.use(bp.urlencoded({extended: false}));
app.use(ejsLayouts);



app.get('/bballplayers', function(req, res) {
	var bballplayers = fs.readFileSync('./data.json');
	bballplayers = JSON.parse(bballplayers);
	res.json(bballplayers); 
});

app.get('/bballplayers/new', function(req, res){

})
app.listen(3000);
