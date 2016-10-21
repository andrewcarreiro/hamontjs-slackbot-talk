var fs = require('fs'),
	_ = require('lodash'),
	Path = require('path'),
	Botkit = require("botkit"),
	BOT_TOKEN = require("../secrets").bot_token;

// Where the GOOD docs are - https://github.com/howdyai/botkit/blob/master/readme-slack.md

if( !BOT_TOKEN ){
	console.error("Error: Bot needs token to run")
	process.exit(1);
}

// Instantiate the controller
var controller = Botkit.slackbot({
	stats_optout: true,
	// debug : true,
	json_file_store: Path.resolve(__dirname, "./data")
});

// Spawn the bot
var bot = controller.spawn({
    token: BOT_TOKEN,
	retry : Infinity
});

// bring in our library file now that bot and controller are known
var lib = require("./lib")(bot,controller);
require("./grampa-knows-your-name")(bot, controller);
require("./grampa-appreciates-attention")(bot, controller);
require("./grampa-loves-sharing-photos")(bot, controller);


bot.startRTM( () => {
	require("./grampa-greets-you")(bot,controller)()
	.catch( (err) => console.error("Could not connect to RTM",err) ); 
});

controller.on('rtm_close', () => console.error("Slack RTM closed") );