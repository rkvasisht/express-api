var express = require('express');
var path = require('path');
var fs = require('fs');
var bp = require('body-parser');
var ejsLayouts = require('express-ejs-layouts')
var app = express();

app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', 'ejs');
app.use(bp.urlencoded({extended: true}));
app.use(ejsLayouts);


//GET /bballplayers - returns  all bball players
app.get('/bballplayers', function(req, res) {
	var bballplayers = fs.readFileSync('./data.json');
	bballplayers = JSON.parse(bballplayers);
	res.json(bballplayers); 
});
// POST /bballplayers - adds a new bballplyaer 
app.post('/bballplayers', function(req, res){
	console.log(req.body)
	var bballplayers = fs.readFileSync('./data.json');
	bballplayers = JSON.parse(bballplayers);
	bballplayers.push( {name: req.body.name, position: req.body.position});
	fs.writeFileSync('./data.json', JSON.stringify(bballplayers));
	res.json(bballplayers);
});

app.get('/bballplayers/:id', function(req, res){
	
  var bballplayers = fs.readFileSync('./data.json');
  bballplayers = JSON.parse(bballplayers);
  var bballplayersIndex = req.params.id;
  res.json(bballplayers[bballplayersIndex]);
});
//TODO: GET /bballplayers/:id get one bballplayer
app.put('/bballplayers/:id', function(req, res){
	var bballplayers = fs.readFileSync('./data.json');
	bballplayers = JSON.parse(bballplayers);
	var bballplayersIndex = req.params.id;
	bballplayers[bballplayersIndex] = {name: req.body.name, position: req.body.position};
	fs.writeFileSync('./data.json', JSON.stringify(bballplayers))
	res.json(bballplayers[bballplayersIndex]);
})
//TODO: PUT/bballplayers/:id updates on bballplayer
//TODO: DELETE /bballplayers/:id -deletes one lightsaber
app.delete('/bballplayers/:id', function(req, res){
			var bballplayers = fs.readFileSync('./data.json');
			bballplayers = JSON.parse(bballplayers);
			var bballplayersIndex = req.params.id;
			bballplayers.splice(bballplayersIndex, 1);
			fs.writeFileSync('./data.json', JSON.stringify(bballplayers))
			res.json(bballplayers);

});





app.listen(3000);
