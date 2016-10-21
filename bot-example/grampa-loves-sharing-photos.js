var names = require('fs').readFileSync(require('path').resolve(__dirname,"./resources/old-names.txt"));
names = names.toString().split("\n");

var getRandomFrinkiac = require("./frinkiac-get-random");

function randomItemFrom( array ){
	return array[Math.floor(Math.random() * array.length)];
}

module.exports = ( bot, controller ) => {
	var lib = require("./lib")(bot,controller);

	controller.hears([/(photos?)/i,/(album?)/i], ['direct_mention'], ( bot, message ) => {
		console.log("grampa has noticed you asking about his photos");

		var photo_album_phrases = [
			"Here's a great one",
			"Oh, I remember this like it was yesterday",
			"Ha ha! We had some great times",
			"I always had my camera with me, just in case something like this happened",
			"We really found ourselves in a pickle that day!",
			"This one is interesting",
			"Have you seen this one?",
			"Oh, this one is great",
			"Wow, can you imagine that this happened?",
			"Haha well this one has a story behind it",
			"Not our proudest moment",
			"Let's not dwell on this one"
		];


		getRandomFrinkiac()
		.then( ( frinkiac ) => {
			bot.say({
				"text" : randomItemFrom(photo_album_phrases) + frinkiac.subtitles.map( (s) => `\n>_${s}_` ),
				"channel" : message.channel,
				"attachments" : [
					{
						"text" : `A memory from ${ frinkiac.date }`,
						"fallback" : "A really beautiful and touching memento would appear here.",
						"image_url" : frinkiac.image
					}
				] 
			});
		});
	});
};