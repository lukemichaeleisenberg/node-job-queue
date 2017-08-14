var assert = require('assert');
var mocha = require('mocha');

var kue = require('kue');
var jobQueue = kue.createQueue();

var handler = require('./handler');

before(function() {
  jobQueue.testMode.enter();
});
 
afterEach(function() {
  jobQueue.testMode.clear();
});
 
after(function() {
  jobQueue.testMode.exit()
});

/***************** getJobTest *****************/
describe('#getJob()', function() {
	it('should respond with a .', function() {
	  assert.equal('Required field.', Validator.validateName('', true).errorMsg);
	});
});


/***************** createJobTest *****************/
