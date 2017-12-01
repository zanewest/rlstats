var express = require('express');
var router = express.Router();

var rls = require('rls-api');

/* GET player lookup page. */
router.get('/', function (req, res, next) {
    res.render('playerLookup', {title: 'Player Lookup'});
});

module.exports = router;

