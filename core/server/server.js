/**
 * Server for Shutter Game
 * @param params
 */
module.exports = function(params){

	/**
	 * Schemas of mongodb
	 * @type {{player: *, matches: *, servers: *, stage: *}}
	 */
	params.models = {
		player:require('./models/player.js')(params),
		matches:require('./models/matches.js')(params),
		servers:require('./models/servers.js')(params),
		stage:require('./models/stage.js')(params)
	};

	/**
	 * Libraries
	 * @type {{}}
	 */
	params.lib = {
		bCrypt:require('bcrypt-nodejs')
	};

	/**
	 * Controllers for each module
	 * @type {{match: *, player: *, stage: *}}
	 */
	params.ctrl = {
		match:require('./controllers/match.js')(params),
		player:require('./controllers/player.js')(params),
		stage:require('./controllers/player.js')(params)
	};

	/**
	 * Socket listens
	 * @type {*}
	 */
	params.events = require('./events/events.js')(params);

	/**
	 * Income connections
	 */
	params.io.on('connection', function (socket) {
		params.events.on(socket);
	});
};