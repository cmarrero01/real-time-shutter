//TODO: Remember clustering here
/**
 * Server for Shutter real time game
 * Every start here
 * @module Server
 * @author Claudio Marrero
 * @copyright 2014 Claudio A. Marrero
 */

/**
 * Load module mongoose
 * @property mongoose
 * @type {*}
 */
var mongoose = require('mongoose');

var mongooseSettings = {
	host:'127.0.0.1',
	db: {  safe: true, strict: false, native_parser:true },
	user:'shutter',
	username: 'shutter',
	password: 'shutter',
	pass: 'shutter'
};

var Server = (function(){ 'use strict';

	var _options = {
		host:'127.0.0.1',
		db: 'shutter',
		username: 'shutter',
		password: 'shutter'
	};

	var _express = require('express');
	var _cookieParser = require('cookie-parser');
	var _session = require('express-session');
	var _bodyParser = require('body-parser');
	var _methodOverride = require('method-override');
	var _MongoStore = require('connect-mongo')(_session);
	var _validate = require('mongoose-validate');

	function init(){
		var secret = 'is late at night and I have insomia';

		var app = _express();

		app.use(_bodyParser());
		app.use(_methodOverride());
		app.use(_cookieParser());


		var store = new _MongoStore(_options);

		app.use(_session({
			secret: secret,
			store: store
		}));

		/**
		 * Client forlder
		 */
		app.use('/',_express.static('./core/client'));

		/**
		 * Initialization server
		 * @type {*}
		 */
		var server = require('http').Server(app);

		/**
		 * Initialization socket
		 * @type {*}
		 */
		var io = require('socket.io')(server);

		/**
		 * Listen port and public socket and express
		 */
		server.listen(process.env.PORT || 80);

		/**
		 * Income connection
		 */
		var params = {
			io:io,
			app:app
		};

		require('./core/server/server.js')(params);
	}

	return {
		init:init
	};

})();

/**
 * Connect to database
 */
mongoose.connect('mongodb://shutter:shutter@127.0.0.1:27017/shutter',mongooseSettings, function(err) {
	if(err)throw err;

	Server.init();
});
