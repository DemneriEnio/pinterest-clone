var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;

var app = new express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static('public'));

mongoose.connection.on('error', function(err){
	if(err) {
		console.log(err)
	}
});

mongoose.connection.once('open', function(){
		console.log('DB connect');

		var accountSchema = mongoose.Schema({
			name: String,
			password: String
		});
		
		var Account = mongoose.model('Account', accountSchema);
	
	 app.post('/signup', function(req, res){
	 
	 	var account = {
	 		name: req.body.name,
	 		password: req.body.password
	 	};
	 	
	 	Account.create(account, function(err, result){
	 		if(err) console.log(err);
	 		else console.log(result);
	 	});
	 	
	 });
	 
	 app.post('/login', function(req, res){
	 	Account.findOne({name: req.body.name, password: req.body.password}, function(err, result){ 
	 		if(err) console.log(err)
	 		else {
	 			console.log(result);
	 			res.redirect('/user_page.html');
	 		}
	 	});	
	});

});

mongoose.connect('mongodb://enio:enio@ds113608.mlab.com:13608/pinterest').then(function() {
	app.listen(process.env.PORT || 7000);
});