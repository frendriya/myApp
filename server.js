var express = require('express');
var path = require('path');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');

// Setup View Engines
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Serve files from your "bower_components" directory
app.use('/bower_components', express.static(path.join(__dirname + '/bower_components')));

// Serve files from your "public" directory
app.use('/public', express.static(path.join(__dirname + '/public')));
app.use(express.static(__dirname + '/views'));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/getSessionDetails', function(req, res) {
		console.log(req.query.username);
	var fileName = './data.json';
	var content = fs.readFileSync("data.json");
	var jsonContent = JSON.parse(content);
	var keysArray = Object.keys(jsonContent);
	var current = new Date();
	var todayDate = current.getDate();
	var Month = (current.getMonth()) + 1;
	var Year = current.getFullYear();
	var k = (todayDate + "-" + Month + "-" + Year);
	var m = k+'-'+req.query.username;
	var index = keysArray.indexOf(m);
	console.log(m+'  '+k);
	if(index == -1){
		console.log('no data found');
		return res.status(400).send({
	   	message: 'No Data Found',
	   	code:false
		});
	} else {
		console.log('Entry found.. Preparing JSON');
		return res.status(200).send({
	   	message: jsonContent[keysArray[index]],
	   	code:true
	});
	}
});

app.get('/getHistoricalDetails', function(req, res) {
		var responseData = getHistoricalData(req.query.username);
		if(responseData.HistoricalData.length == 0){
			console.log('no data found');
			return res.status(400).send({
			  	message: 'No Data Found',
			 	code:false
				});
		} else {
			console.log('Entry found.. Preparing JSON');
			return res.status(200).send({
			 	message: responseData,
			   	code:true
			});
		}
});


app.get('*', function(req, res) {
  res.sendFile('./views/index.html', {"root": __dirname});
})

app.post('/authenticate', function(req, res) {
	var result = validateCredentials(req.body.username,req.body.password);
	if(result == 1){
	return res.status(400).send({
	   message: 'User doesnt exist!!',
	   code:false
	});
	}
	else if(result == 2){
		return res.status(200).send({
	   message: 'Successfully logged in!',
	   code:true
	});
	}
	else{
	return res.status(400).send({
	   message: 'Wrong Password!',
	   code:false
	});
	}
});


app.post('/createUser', function(req, res) {
		if(req.body.username == null){
		return res.status(400).send({
	   message: 'Username, Password, Email are mandatory to create an user!',
	   code:false
	});
	}
	else if(validateUsernamecreateUser(req.body.username,req.body.password,req.body.email)){
		return res.status(200).send({
	   message: 'User Successfully Created.. Please log in to Continue..',
	   code:true
	});
	}else{
	return res.status(400).send({
	   message: 'User already exists!! Please choose another username!!',
	   code:false
	});
	}
});

app.post('/save', function(req, res) {
		if(req.body.timer == null){
		return res.status(400).send({
	   message: 'Username, Password, Email are mandatory to create an user!',
	   code:false
	});
	}
	else{
		save(req.body.username,req.body.timer,req.body.totalAttempts,req.body.totalCorrect,req.body.totalIncorrect);
	return res.status(200).send({
	   message: 'Your Session is saved!',
	   code:true
	});
	}
});


// Start our server and start to listen
app.listen(process.env.PORT || 3000, function() {
  console.log('listening');
});


function validateCredentials(username,password) {
var fileName = './user.json';
var content = fs.readFileSync("user.json");
var jsonContent = JSON.parse(content);
var keysArray = Object.keys(jsonContent);
var index = keysArray.indexOf(username);
	if(index == -1){
	return 1;
	}
	else{
	if(jsonContent[keysArray[index]][0].username == username && jsonContent[keysArray[index]][0].password == password){
		jsonContent[keysArray[index]][0].lastLoginTime = Math.round(new Date().getTime()/1000);
		fs.writeFile(fileName, JSON.stringify(jsonContent,null,2), function (err) {
		if (err) return console.log(err);
	 	 });
		return 2;
	} else { 
		return 3; 
	}

}
}

function validateUsernamecreateUser(username,password,email) {
var fileName = './user.json';
var content = fs.readFileSync("user.json");
var jsonContent = JSON.parse(content);
var keysArray = Object.keys(jsonContent);
var index = keysArray.indexOf(username);
	if(index == -1){
	jsonContent[username]  = [{
      "username": username,
      "password": password,
      "email": email,
      "lastLoginTime": ""
    }];
	fs.writeFile(fileName, JSON.stringify(jsonContent,null,2), function (err) {
		if (err) return console.log(err);
		 });
	return true;
	}
	else{
		return false;
	}
}

function save(username,timer,totalAttempts,totalCorrect,totalIncorrect) {
var fileName = './data.json';
var content = fs.readFileSync("data.json");
var jsonContent = JSON.parse(content);
var keysArray = Object.keys(jsonContent);
	//console.log(jsonContent[keysArray[1]][0].username);

var current = new Date();
var todayDate = current.getDate();
var Month = (current.getMonth()) + 1;
var Year = current.getFullYear();
var k = (todayDate + "-" + Month
+ "-" + Year);
var m = k+'-'+username;
var index = keysArray.indexOf(m);
if (index == -1){
	console.log(' Entry Not Found..So creating');
	jsonContent[m]  = [{
      "username": username,
      "CountdownTimer": timer,
      "totalAttempts": totalAttempts,
      "totalCorrect": totalCorrect,
      "totalIncorrect":totalIncorrect
    }];
	fs.writeFile(fileName, JSON.stringify(jsonContent,null,2), function (err) {
		if (err) return console.log(err);
		 });
	return true;
} else {
	console.log('Entry found.. So updating');
	jsonContent[keysArray[index]][0].CountdownTimer = timer;
	jsonContent[keysArray[index]][0].totalAttempts = totalAttempts;
	jsonContent[keysArray[index]][0].totalCorrect = totalCorrect;
	jsonContent[keysArray[index]][0].totalIncorrect = totalIncorrect;

		fs.writeFile(fileName, JSON.stringify(jsonContent,null,2), function (err) {
		if (err) return console.log(err);
	 	 });
		return true;
}
}

function getHistoricalData(queryUsername){
	// console.log(queryUsername);
	var fileName = './data.json';
	var content = fs.readFileSync("data.json");
	var jsonContent = JSON.parse(content);
	// console.log(jsonContent);
	var keysArray = Object.keys(jsonContent);
	// console.log(keysArray);
	var responseData = {};
	responseData.HistoricalData = new Array();
	for (var i = 0; i < keysArray.length; i++) {
		if(jsonContent[keysArray[i]][0].username == queryUsername){
			//console.log(keysArray[i].replace('-'+req.query.username,''));
	    var item = jsonContent[keysArray[i]][0];
	    if((item.totalCorrect - item.totalIncorrect) < 1){
			totalEarning = 0;
	    } else {
	    	totalEarning = (item.totalCorrect - item.totalIncorrect) *35/100;
	    }
	    responseData.HistoricalData.push({
	        "username" 		: item.username,
	        "date"			: keysArray[i].replace('-'+queryUsername,''),
	        "CountdownTimer": item.CountdownTimer,
	        "totalAttempts" : item.totalAttempts,
	        "totalCorrect"  : item.totalCorrect,
	        "totalIncorrect": item.totalIncorrect,
	        "totalEarning"  : totalEarning
	    });
	}
	}
	// console.log(responseData);
		return responseData;


}