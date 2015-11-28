/**
 * Created by dinesh on 28/11/15.
 */
var express = require('express');
var router = express.Router();
var category = require('../module/category');

/* GET home page. */
router.get('/', function (req, res, next) {
    Q.all(category.getCategories()).then(function (data) {
        res.render('category', {title: 'Category', category: data[0]});
    }).done();
});


router.get('/add', function (req, res, next) {
    Q.all(category.getCategories()).then(function (data) {
        res.render('category_add', {title: 'Category', category: data[0]});
    }).done();
});

router.post('/add', function (req, res, next) {
    Q.all(category.addCategory(req)).then(function (udpateResult) {
        res.writeHead(302, {
            'Location': '/category'
        });
        res.end();
    }).done();
});

router.get('/remove/:category_id', function (req, res, next) {
    Q.all(category.removeCategory(req)).then(function (udpateResult) {
        res.writeHead(302, {
            'Location': '/category'
        });
        res.end();
    }).done();
});

module.exports = router;
