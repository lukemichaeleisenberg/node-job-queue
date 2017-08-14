# node-job-queue

##Dependencies

Redis
Node

##Setup

In the root directory, enter: 

npm install
redis-server
npm start

After that, you should be able to access the server at localhost:3000

##Endpoints

###POST /job

####Request

`
	{
		"url": "https://www.google.com" (The url that you want to process via the job queue. Must include HTTP protocol [HTTP or HTTPS])
	}
`

####Response

`
	{
	  "id": 7 (The ID of the newly created job)
	}
`

###GET /job/:id

####Response

`
	{
		"url": "https://www.google.com" 
	}
`