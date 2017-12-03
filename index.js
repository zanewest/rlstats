//cd /home/marcus/node-js-getting-started/project2/
//heroku local
var express = require('express');
var app = express();
var url = require('url');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
    response.render('index')
});

app.get('/cool', function(request, response) {
    response.send(cool());
});

app.get('/mail', function(request, response) {
    calculateRate(request, response);
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});

function calculateRate(request, response) {
    var requestUrl = url.parse(request.url, true);

    var mailType = requestUrl.query.operation;
    var weight = Number(requestUrl.query.weight);
    var result = 0;

    if (mailType == "Stamped") {
        if (weight < 1) {
            result = 0.49;
        }
        else if (weight < 2) {
            result = 0.70;
        }
        else if (weight < 3) {
            result = 0.91;
        }
        else {
            result = 1.12;
        }
    } else if (mailType == "Metered") {
        if (weight < 1) {
            result = 0.46;
        }
        else if (weight < 2) {
            result = 0.67;
        }
        else if (weight < 3) {
            result = 0.88;
        }
        else {
            result = 1.09;
        }
    } else if (mailType == "Flats") {
        if (weight < 1) {
            result = 0.98;
        }
        else if (weight < 2) {
            result = 1.19;
        }
        else if (weight < 3) {
            result = 1.40;
        }
        else {
            result = 1.61;
        }
    } else if (mailType == "Parcel") {
        if (weight < 1) {
            result = 3.00;
        }
        else if (weight < 2) {
            result = 3.00;
        }
        else if (weight < 3) {
            result = 3.00;
        }
        else {
            result = 3.00;
        }
    } else if (mailType == "Snail") {
        result = "Well, if you are going by that, you will never get it there!";
    } else {

    }

    var params = {mailType: mailType, weight: weight, result: result}

    response.render('pages/result', params);
}
