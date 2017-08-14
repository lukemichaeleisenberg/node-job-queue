var express = require('express');
var router = express.Router();
var handler = require('./handler');

router.get('/', function(req, res, next) { 
	queue.newJob(req.data.url);
	res.status(200).send("Success"); 
});

router.get('/job/:id', handler.getJob);

router.post('/job', handler.createJob);

module.exports = router;
