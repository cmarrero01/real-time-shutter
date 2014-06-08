//TODO: Remember clustering here
/**
 * Server for Shutter real time game
 * Every start here
 * @module Server
 * @author Claudio Marrero
 * @copyright 2014 Claudio A. Marrero
 */

'use strict';
/**
 * Express
 * @type {*}
 */
var express = require('express');
var app = express();

/**
 * Client forlder
 */
app.use('/',express.static('./core/client'));

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
