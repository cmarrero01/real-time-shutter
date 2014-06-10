//TODO: Remember clustering here
/**
 * Server for Coinding App
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
		password: 'shutter',
		httpOnly: false
	};

	var _express = require('express');
	var _cookie = require('cookie');
	var _cookieParser = require('cookie-parser');
	var _session = require('express-session');
	var _bodyParser = require('body-parser');
	var _methodOverride = require('method-override');
	var _MongoStore = require('connect-mongo')(_session);
	var _validate = require('mongoose-validate');
	var _bCrypt = require('bcrypt-nodejs');

	function init(){
		var secret = 'is late at night and I have insomnia';

		var app = _express();

		app.use(_bodyParser());
		app.use(_methodOverride());
		app.use(_cookieParser());


		var store = new _MongoStore(_options);

		app.use(_session({
			secret: secret,
			store: store,
			cookie: {
				maxAge: new Date(Date.now() + (1000*60*60*24*30*12)),
				httpOnly: false
			}
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

		io.use(function(socket, next) {

			var data = socket.request;
			if (!data.headers.cookie) {
				next(new Error('Not Authorized.'));
				return;
			}

			data.cookie = _cookie.parse(data.headers.cookie);
			var connectSid = data.cookie['connect.sid'];
			var sessionId = parseSid(connectSid,next);
			store.get(sessionId, function(err, session) {

				if (err || !session) {
					next(new Error('Not Authorized'));
					return;
				}

				data.session = session;
				next();
			});
		});

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
			validate:_validate,
			bCrypt:_bCrypt,
			store:store,
			cookie:_cookie,
			parseSid:parseSid
		};

		require('./core/server/server.js')(params);
	}

	/**
	 * Parse the connect.id of express to get the id of document
	 * @param cid
	 * @param cb
	 * @returns {*}
	 */
	function parseSid(cid,cb){

		if(!cid){
			cb(new Error('Not Authorized'));
			return;
		}

		var sessionid = cid.split('.');
		if(!sessionid[0]){
			cb(new Error('Not Authorized'));
			return;
		}

		sessionid = sessionid[0].split(':');
		if(!sessionid[1]){
			cb(new Error('Not Authorized'));
			return;
		}

		return sessionid[1];
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