# node-job-queue #

## Dependencies ##

Redis
Node

## Setup ##

In the root directory, enter: 

npm install
redis-server
npm start

After that, you should be able to access the server at localhost:3000

## Endpoints ##

### POST /job ###

#### Request ####

```
	{
		"url": "https://www.google.com" (The url that you want to process via the job queue. Must include HTTP protocol [HTTP or HTTPS])
	}
```

#### Response ####

```
	{
	  "id": 7 (The ID of the newly created job)
	}
```

### GET /job/:id ###

#### Response ####

```
{
  "job": {
    "state": "complete" (current state of the job),
    "created_at": "1502738159778" (timestamp of job creation in miliseconds),
    "error": "(error message)" (the error message recieved while attempting to process the job [if applicable]),
    "failed-at": "1502738159779" (the timestamp that the job failed at in miliseconds)
  },
  "response": {
    "status": 200 (The status code recieved by your request),
    "response": "(html-body)" (The response body of the html page requested.)
   }
}
```