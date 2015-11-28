var express = require('express');
var router = express.Router();
var category = require('../module/category');

/* GET home page. */
router.get('/', function (req, res, next) {
    /*res.render('index', {title: 'Home'});*/
    res.writeHead(302, {
        'Location': '/category'
    });
    res.end();
});

module.exports = router;