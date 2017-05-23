var express = require('express');
var router = express.Router();
var http = require('http');
var app = express();

/* GET home page. */
router.get('/testdemo', function(req, res, next) {
  res.render('index', { title: 'Expressaaaa' });
//	res.send("{'aaa':'bbb'}");
});

module.exports = router;

