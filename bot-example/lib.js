module.exports = ( bot, controller ) => {

	/** a list of known slack channels we can connect to */
	var known_channels = [];
	/**
	 * gets channels for the connected slack instance
	 * 
	 * @returns {Promise}
	 */
	function getChannels () {
		if(known_channels.length > 0){ return Promise.resolve(known_channels); }
		
		return new Promise( ( resolve, reject ) => {
			bot.api.channels.list({}, ( err, response ) => {
				if( err ){ return reject(err); }
				known_channels = response.channels;
				console.log("got known_channels");
				resolve(known_channels);
			});
		});
	}


	


	var known_team_info = undefined;
	
	function getTeamInfo () {
		if(known_team_info){ return Promise.resolve(known_team_info); }
		
		return new Promise( ( resolve, reject ) => {
			bot.api.team.info({}, ( err, response ) => {
				if( err ){ return reject(err); }
				known_team_info = response.team;
				console.log("got known_team_info");
				resolve(known_team_info);
			});
		});
	}

	function getTeamId () {
		return getTeamInfo().then( ( team ) => team.id );
	}


	function getTeamStorage () {
		return getTeamId()
		.then( ( id ) => genericBotkitDataGetter("teams",id) );
	}

	function setTeamStorage ( key, value ) {
		return getTeamId()
		.then( ( id ) => genericBotkitDataSetter("teams",id,key,value) );
	}


	function getUserStorage ( userid ) {
		return genericBotkitDataGetter("users",userid);
	}

	function setUserStorage ( userid, key, value ) {
		return genericBotkitDataSetter("users",userid,key,value);
	}


	/**
	 * Get data from botkit data store
	 * 
	 * @param { "users" | "teams" | "channels" } scope
	 * @param {any} id the unique id in the scope (for example, team ID)
	 * @returns
	 */
	function genericBotkitDataGetter( scope, id ) {
		return new Promise( ( resolve, reject ) => {
			controller.storage[scope].get(
				id, 
				(err, data) => resolve(data)
			);
		});
	}

	
	
	/**
	 * Get data from botkit data store
	 * 
	 * @param { "users" | "teams" | "channels" } scope
	 * @param {any} id the unique id in the scope (for example, team ID)
	 * @param {any} key data key to save
	 * @param {any} value data value to save
	 * @returns
	 */
	function genericBotkitDataSetter( scope, id, key, value ){
		return new Promise( ( resolve, reject ) => {
			controller.storage[scope].save(
				{
					"id" : id,
					[key] : value
				},
				(err) => {
					if( err ){ throw err; }
					resolve();
				}
			);
		});
	}


	function timeSinceLastStart () {
		return getTeamStorage()
		.then( ( data ) => data ? data.last_startup : undefined);
	}




	return {
		getChannels : getChannels,
		setTeamStorage : setTeamStorage,
		getTeamStorage : getTeamStorage,
		getUserStorage : getUserStorage,
		setUserStorage : setUserStorage,
		timeSinceLastStart : timeSinceLastStart
	}
}