//cd /home/marcus/node-js-getting-started/project2/
//heroku local
var express = require('express');
var path = require('path');
var app = express();
var url = require('url');
var bodyParser = require('body-parser')
global.jQuery = require('jquery');
var $ = require('jquery');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }))

//initialize api
var rls = require('rls-api');
var client = new rls.Client({
    token: "F1SOEASNP5N4AWCND7PPV1UW9ZWFXRMB"
});

//Get 1v1 leaderboard
var leader = [];

function getLeader1v1(){
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
}

//Get 2v2 leaderboard
var leader2v2 = [];

function getLeader2v2(){
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
}

//get 3v3 leaderboard
var leader3v3 = [];

function getLeader3v3(){
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
function getLeader3v3ss(){
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

//Get playlist data
var duelPop = [];
var doublesPop = [];
var standardPop = [];
var ssPop = [];

function getPlaylists(){
    client.getPlaylistsData(function(status, data){
        var duelIndex = 0;
        var doubleIndex = 0;
        var standardIndex = 0;
        var ssIndex = 0;
        if(status === 200){
            for(var i = 0; i < data.length; i++){

                if(data[i].name == 'Ranked Duel'){
                    duelPop[duelIndex] = data[i].population.players;
                    duelIndex++;
                }
                else if(data[i].name == 'Ranked Doubles'){
                    doublesPop[doubleIndex] = data[i].population.players;
                    doubleIndex++
                }
                if(data[i].name == 'Ranked Standard'){
                    standardPop[standardIndex] = data[i].population.players;
                    standardIndex++
                }
                if(data[i].name == 'Ranked Solo Standard'){
                    ssPop[ssIndex] = data[i].population.players;
                    ssIndex++
                }

            }
        } else {
            console.log("-- getPlaylistsData failed: " + status);
        }
    });
}

getLeader1v1();
setTimeout(getLeader2v2, 1100);
setTimeout(getLeader3v3, 2100);
setTimeout(getLeader3v3ss, 3100);
setTimeout(getPlaylists, 4100);

app.get('/', function(request, response) {
    response.render('index', { leader: leader,
    leader2v2: leader2v2,
    leader3v3: leader3v3,
    leader3v3ss: leader3v3ss,
    duelPop: duelPop,
    doublesPop: doublesPop,
    standardPop: standardPop,
    ssPop: ssPop})
});

app.post('/profile', function(request, response) {
    var playerName;
    var playersGoals;
    var player;

    client.getPlayer(request.body.query, request.body.platformId, function(status, data){
        if(status === 200){
            var player = data;
        } else {
            console.log("-- getPlayer failed: " + status);
        }

        response.render('playerPage', {playerName: playerName,
                                        player: player});
    });

});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});

/* This is Reference Code
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
*/