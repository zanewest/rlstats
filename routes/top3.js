var express = require('express');
var router = express.Router();

var rls = require('rls-api');

var client = new rls.Client({
    token: "F1SOEASNP5N4AWCND7PPV1UW9ZWFXRMB"
});

var leader = [];
client.getRankedLeaderboard(rls.rankedPlaylists.DUEL, function(status, data){
    if(status === 200){
        console.log("-- Ranked Leaderboard:");
        console.log("   Leaderboard count: " + data.length);
        console.log("   Duel Number #1 Player: " + data[0].displayName);
        //test
        for(var i = 0; i < data.length; i++){
            leader[i] = data[i].displayName;
        }

    } else {
        console.log("-- getRankedLeaderboard failed: " + status);
    }
});

/* GET top3 page. */
router.get('/', function(req, res, next) {
    res.render('top3', { title: 'Rocket League Top 3',
        leader: leader
    });
});

/* GET users listing.
router.get('/', function(req, res, next) {
    res.send(leader1);
});*/

module.exports = router;
