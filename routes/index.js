var express = require('express');
var router = express.Router();

var SUCCESS = 200,
	ERROR = 500;

function printIndex(req, res) {

	res.render('index', {
		title: 'Your Title',
		stylesheets: ['/stylesheets/style.css'],
		javascripts: [
			'/javascripts/searchHome.js',
			'/javascripts/searchHome-header.js',
			'/javascripts/searchHome-content.js',
			'/javascripts/searchHome-content-infant.js',
			'/javascripts/searchHome-content-car.js'
		]
	});
}

/* GET home page. */
router.get('/', function (req, res) {

	printIndex(req, res);
});

router.get('/infant', function (req, res) {

	printIndex(req, res);
});

router.get('/infant/ranges', function (req, res) {

	res.jsonp({
		code: SUCCESS,
		message: 'ok',
		result: {
			ranges: [
				{label:'신생아',value:0},
				{label:'1개월',value:1},
				{label:'2개월',value:2},
				{label:'3개월',value:3},
				{label:'4개월',value:4},
				{label:'5개월',value:5},
				{label:'6개월',value:6},
				{label:'7~12개월',value:7},
				{label:'13~24개월',value:8}
			]
		}
	})

});

router.get('/infant/data/:range', function (req, res) {

	res.jsonp({
		code: SUCCESS,
		message: 'ok',
		result: {
			range: req.params.range,
			search: req.query.search
		}
	})

});

router.get('/car', function (req, res) {

	printIndex(req, res);
});

/* GET templates. */
router.get('/templates/:id', function (req, res) {
	res.render('templates/' + req.params.id);
});

module.exports = router;