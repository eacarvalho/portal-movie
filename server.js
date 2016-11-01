var express = require('express');
var app = express();

var fs = require('fs');
var apiUrl = process.env.API_URL;
var configFileContent = 'angular.module(\'config\', []).constant(\'ENV\', {movieApi: \'http://localhost:8080/api\'});'

if (apiUrl !== undefined) {
    configFileContent = 'angular.module(\'config\', []).constant(\'ENV\', {movieApi: \'' + apiUrl + '\'});'
}

fs.writeFile('./app/config.js', configFileContent, function (err) {
    if (err) return console.log(err);
});

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8000;

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/app'));

// set the home page route
app.get('/', function(req, res) {

    // make sure index is in the right directory. In this case /app/index.html
    res.render('index');
});

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
    console.log('Config global (config.js): ' + configFileContent);
});
