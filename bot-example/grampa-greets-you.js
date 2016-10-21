var moment = require("moment");
module.exports = ( bot, controller ) => {

	var lib = require("./lib")(bot,controller);


	/**
	 * Abe simpson is back on Slack!
	 * 
	 * @returns
	 */
	return function botGreeting () {
		return Promise.all([
				lib.getChannels(),
				lib.timeSinceLastStart()
			])
			.then( ( [ channels, time_since_last_start ] ) => {
				
				var message = time_since_last_start ?
					`:scream: I live again! Last time I was here was ${moment(time_since_last_start).fromNow()}!` :
					"Oh hello!";

				bot.say({
					"text" : message,
					"channel" : channels.find( ( channel ) => (channel.name === "general") ).id
				});

				lib.setTeamStorage("last_startup", Number(new Date()));
			});
	}

}