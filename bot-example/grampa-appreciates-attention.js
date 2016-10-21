/**
 * Grampa loves it when people talk to him
 */
module.exports = ( bot, controller ) => {
	var lib = require("./lib");

	var possibleReactions = [
		"heart",
		"heart_eyes",
		"heartbeat",
		"heartpulse",
		"hearts",
		"blue_heart",
		"green_heart",
		"purple_heart",
		"sparkling_heart"
	];


	function getRandomReaction () {
		var randomIndex = Math.floor(Math.random() * possibleReactions.length);
		return possibleReactions[randomIndex];
	}

	controller.on(['mention'], ( bot, message ) => {
		console.log("grampa saw someone reference him");
		bot.api.reactions.add({
			"channel" : message.channel,
			"timestamp" : message.ts,
			"name" : getRandomReaction()
		});
	});
};