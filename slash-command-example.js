var express = require('express');
var request = require('request');
var app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}));

app.post('/slash-command', function (req, res) {
	res.send({
		"response_type" : "ephemeral", // say something secret to whoever asked
		"text" : "yeah man, I'll do that in a second..."
	});
	setTimeout( () => {
		request({
			"url" : req.body.response_url,
			"method" : "POST",
			"json" : true,
			"body" : {
				"text" : `Ok, although @${req.body.user_name} asked me to '${req.body.text}', I kinda got a thing going on so I won't be doing that.`,
				"response_type" : "in_channel"
			}
		})
	},1000);
});

app.listen(80, function () {
	console.log('Example app listening on port 80!');
});



// req.body structure:
// token: secret token for verifying requests
// team_id: your team's id
// team_domain: your team's domain
// channel_id: the channel it was sent from
// channel_name: the channel name
// user_id: the user who requested it
// user_name: the user's name
// command: '/slash',
// text: the text of the request
// response_url: url to respond to if not responding immediately