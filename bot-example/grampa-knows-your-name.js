var names = require('fs').readFileSync(require('path').resolve(__dirname,"./resources/old-names.txt"));
names = names.toString().split("\n");

function randomItemFrom( array ){
	return array[Math.floor(Math.random() * array.length)];
}

module.exports = ( bot, controller ) => {
	var lib = require("./lib")(bot,controller);

	controller.hears(['remember me','who am i'], 'direct_mention', ( bot, message ) => {
		console.log("grampa has noticed you asking about your name");
		console.log(message);

		lib.getUserStorage(message.user)
		.then( ( userData ) => {
			 
			var name = (userData && userData.name) ? userData.name : randomItemFrom(names);
			
			function enterConversation ( err, convo ) {
				convo.say("Oh, yes, I remember you...");
				guessName(null,convo);
				// convo.next();
			}
			
			function guessName ( response, convo ) {
				var guessing_names = [
					`You're ${name}, right?`,
					`You're that ${name} kid?`,
					`I'd say you look like a ${name}?`,
					`If I said your name is ${name}, would I be right?`
				];


				convo.ask(
					randomItemFrom(guessing_names),
					[
						{
							"pattern" : bot.utterances.yes,
							"callback" : correctName
						},
						{
							"pattern" : bot.utterances.no,
							"callback" : incorrectName
						},
						{
							"default" : true,
							"callback" : unknownResponse
						}
					]
				);
				convo.next();
			};

			function unknownResponse ( response, convo ) {
				var unknown_phrases = [
					"Eh, I'm not sure what that meant."
				];

				convo.say(randomItemFrom(unknown_phrases));
				guessName(response, convo);
				convo.next();
			} 

			function incorrectName ( response, convo ) {
				var retry_phrases = [
					"Fiddlesticks. Let me try again!",
					"Back in the war, we only knew each other by smell.",
					"Wait, no, that's the other one...",
					"I didn't think that sounded right. Oh no..."
				]

				convo.say(randomItemFrom(retry_phrases));
				name = randomItemFrom(names);
				guessName(response, convo);
				convo.next();
			}

			function correctName ( response, convo ){
				convo.say(`Ha! I knew it all along, ${name}.`);
				lib.setUserStorage(message.user, "name", name);
				convo.next();
			}

			bot.startConversation( message, enterConversation);
			
		});
	});
};