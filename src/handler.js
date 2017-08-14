var axios = require('axios');
var kue = require('kue');
var jobQueue = kue.createQueue();

var handler = {};

/**
 * Handler for /job/:id. Creates a job and returns the id.
 */
handler.getJob = function (req, res) {
  kue.Job.get(req.params.id, 'webCallJob', function(err, job) {
		if (err) {
			res.status(500).send({"error":"Job with the specified ID does not exist."});
		}
		if (!err) {
			var jobStatus = {
				"state":job._state,
				"created_at":job.created_at,
				"error":job._error,
				"failed_at":job.failed_at
			};
			res.status(200).send({"job": jobStatus, "response":job.result});
		}	
	});
}

/**
 * Handler for /job. Returns the status of the job, as well as the response if the job is completed.
 */
handler.createJob = function(req, res) {
	var job = jobQueue.create('webCallJob', { url:req.body.url, response:''} )
	.removeOnComplete(false);

	job.save((err) => {
		if (err) {
			console.log(err)
			res.status(500).send({"error":"An internal server error occurred."});
		}
		if (!err) {
			res.status(200).send({"id":job.id});
		}
	});
}

/**
 * Process listener that processes the queue as jobs come in.
 */
module.exports = handler, jobQueue.process('webCallJob', function (job, done) {
	axios.get(job.data.url)
	.then( function(response) {
		console.log('Job', job.id, 'is done');
		console.log(response);
		done(null, { 
			"status":response.status, 
			"response":response.data
			});
	}).catch( function(error) {
		done("The url you provided did not recieve a response. Please verify the url, and be sure that you are specifying http protocol (http:// or https://)"); 
	});
});
