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

/**
 * Mongoose settings
 * @type {{host: string, db: {safe: boolean, strict: boolean, native_parser: boolean}, user: string, username: string, password: string, pass: string}}
 */
var mongooseSettings = {
	host:'127.0.0.1',
	db: {  safe: true, strict: false, native_parser:true },
	user:'shutter',
	username: 'shutter',
	password: 'shutter',
	pass: 'shutter'
};

var Server = (function(){ 'use strict';

	/**
	 * Connect session options
	 * @type {{host: string, db: string, username: string, password: string}}
	 * @private
	 */
	var _options = {
		host:'127.0.0.1',
		db: 'shutter',
		username: 'shutter',
		password: 'shutter'
	};

	/**
	 * Express framework
	 * @type {*}
	 * @private
	 */
	var _express = require('express');

	/**
	 * Cookie parse
	 * @type {exports}
	 * @private
	 */
	var _cookieParser = require('cookie-parser');

	/**
	 * Session
	 * @type {exports}
	 * @private
	 */
	var _session = require('express-session');

	/**
	 * Body Parse
	 * @type {exports}
	 * @private
	 */
	var _bodyParser = require('body-parser');

	/**
	 * Method Override
	 * @type {exports}
	 * @private
	 */
	var _methodOverride = require('method-override');

	/**
	 * Mongo Store middleware
	 * @type {*}
	 * @private
	 */
	var _MongoStore = require('connect-mongo')(_session);

	/**
	 * Validate things
	 * @type {exports}
	 * @private
	 */
	var _validate = require('mongoose-validate');

	/**
	 * Initialization of server
	 */
	function init(){
		/**
		 * Secret
		 * @type {string}
		 * @private
		 */
		var _secret = 'is late at night and I have insomnia';

		/**
		 *
		 * @type {*}
		 */
		var app = _express();

		app.use(_bodyParser());
		app.use(_methodOverride());
		app.use(_cookieParser());


		var store = new _MongoStore(_options);

		app.use(_session({
			secret: _secret,
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
			app:app,
			mongoose:mongoose,
			validate:_validate
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
