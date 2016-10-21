const WEBHOOK_URL= require("./secrets").incoming_webhook_url;
var request = require('request-promise');
var os = require('os');

request({
	"url" : WEBHOOK_URL,
	"method" : "POST",
	"json" : true,
	"body" : {
		"channel" : "#general",

		// SIMPLE STRUCTURE
		// "text" : `:rocket: Here I come! My OS is ${os.platform()} and I've been awake for ${os.uptime()} seconds! :sleeping:`,

		// ATTACHMENT STRUCTURE
		"pretext" : `:rocket: Here I come!`,
		"color" : "success",
		"fallback" : "This is shown when message attachments fail, like on mobile",
		"fields" : [
			{
				"title" : ":desktop_computer: My OS is",
				"value" : os.platform(),
				"short" : true
			},
			{
				"title" : ":sleeping: I've been awake for",
				"value" : os.uptime(),
				"short" : true
			}
		]

	}
})
.then( ( result ) => console.log("Done! ",result))
.catch( ( err ) => console.error("Error: ",err))