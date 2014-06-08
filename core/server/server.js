module.exports = function(params){

	params.models = {
		player:require('./models/player.js')(params),
		matches:require('./models/matches.js')(params),
		servers:require('./models/servers.js')(params),
		stage:require('./models/stage.js')(params)
	};

	params.libs = {

	};

	params.ctrl = {
		match:require('./controllers/match.js')(params),
		player:require('./controllers/player.js')(params),
		stage:require('./controllers/player.js')(params)
	};

	params.events = require('./events/events.js')(params);

	params.io.on('connection', function (socket) {
		params.socket = socket;
		params.events.on(params);
	});



};