var express = require('express');
var router = express.Router();

var rls = require('rls-api');

var client = new rls.Client({
    token: "F1SOEASNP5N4AWCND7PPV1UW9ZWFXRMB"
});

var leader = [];
client.getStatLeaderboard(rls.statType.GOALS, function(status, data){
    if(status === 200){
        console.log("-- Stat Goals Leaderboard:");
        console.log("   Leaderboard count: " + data.length);
        console.log("   Goals #1 Player: " + data[0].displayName);
        //test
        for(var i = 0; i < data.length; i++){
            leader[i] = data[i].displayName;
        }

    } else {
        console.log("-- getStatLeaderboard failed: " + status);
    }
});


/* GET stats page. */
router.get('/', function(req, res, next) {
    res.render('stats', { title: 'Rocket League Top 3 by Stats',
        leader: leader
    });
});

/* GET users listing.
router.get('/', function(req, res, next) {
    res.send(leader1);
});*/

module.exports = router;
