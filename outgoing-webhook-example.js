var express = require('express');
var app = express();

app.post('/outgoing-webhook', function (req, res) {
	res.send({
		"text" : "BILL!\nBILL!\nBILL!\nBILL!\nBILL!"
	});
});

app.listen(80, function () {
	console.log('Example app listening on port 80!');
});