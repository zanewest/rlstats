//cd /home/marcus/node-js-getting-started/project2/
//heroku local
var express = require('express');
var path = require('path');
var app = express();
var url = require('url');
global.jQuery = require('jquery');
//require('bootstrap');
var $ = require('jquery');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');



app.use(express.static(path.join(__dirname, 'public')));


//leaderboard page

var rls = require('rls-api');

var client = new rls.Client({
    token: "F1SOEASNP5N4AWCND7PPV1UW9ZWFXRMB"
});



//Get 1v1 leaderboard
var leader = [];

client.getRankedLeaderboard(rls.rankedPlaylists.DUEL, function(status, data){
    if(status === 200){
        //test
        for(var i = 0; i < data.length; i++){
            leader[i] = data[i].displayName;
        }
    } else {
        console.log("-- getRankedLeaderboard failed: " + status);
    }
});

//Get 2v2 leaderboard
var leader2v2 = [];
client.getRankedLeaderboard(rls.rankedPlaylists.DOUBLES, function(status, data){
    if(status === 200){
        //test
        for(var i = 0; i < data.length; i++){
            leader2v2[i] = data[i].displayName;
        }
    } else {
        console.log("-- getRankedLeaderboard failed: " + status);
    }
});


//get 3v3 leaderboard
var leader3v3 = [];
function getleader3v3(){
    client.getRankedLeaderboard(rls.rankedPlaylists.STANDARD, function(status, data){
        if(status === 200){
            //test
            for(var i = 0; i < data.length; i++){
                leader3v3[i] = data[i].displayName;
            }
        } else {
            console.log("-- getRankedLeaderboard failed: " + status);
        }
});
}

//get 3v3 solo standard leaderboard
var leader3v3ss = [];
function getleader3v3ss(){
    client.getRankedLeaderboard(rls.rankedPlaylists.SOLO_STANDARD, function(status, data){
        if(status === 200){
            //test
            for(var i = 0; i < data.length; i++){
                leader3v3ss[i] = data[i].displayName;
            }
        } else {
            console.log("-- getRankedLeaderboard failed: " + status);
        }
    });
}


setTimeout(getleader3v3, 1100);
getleader3v3ss();

app.get('/', function(request, response) {
    response.render('index', { leader: leader,
    leader2v2: leader2v2,
    leader3v3: leader3v3,
    leader3v3ss: leader3v3ss})
});

app.get('/getTop3', function(request, response) {
    response.render('top3', { title: 'Rocket League Top 3',
    leader: leader})
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
