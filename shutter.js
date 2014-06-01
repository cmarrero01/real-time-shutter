/**
 * Load module http
 * @property http
 * @type {*}
 */
var http = require('http');

/**
 * load module express
 * @property express
 * @type {*}
 */
var express = require('express');

/**
 * Instance of express create server
 * @property app
 * @type {*}
 */
var app = express();

/**
 * Folder for client game
 */
app.use('/',express.static('./core/client'));

/**
 * Secure server
 * @type {Function|*|Server}
 */
var server = http.createServer(app);

/**
 * Listen the port that the game is launched.
 */
server.listen(process.env.PORT || 80);