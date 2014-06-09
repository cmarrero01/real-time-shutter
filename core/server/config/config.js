/**
 * Server of Coinding config file.
 * Configurations files
 * @module Coinding
 * @author Claudio Marrero
 * @copyright 2014 Battle Game
 */

'use strict';
var Config = (function(){
	/**
	 * Connection of mongo options
	 * @property options
	 * @type {{db: {safe: boolean, strict: boolean, native_parser: boolean}, server: {poolSize: number}, replset: {rs_name: string, strategy: string}, user: string, password: string}}
	 */


	/**
	 * Keep alive property for options of mongoose
	 * @type {{keepAlive: number}}
	 */
	options.server.socketOptions = options.replset.socketOptions = { keepAlive: 1 };

	/**
	 * Configuration for replica sets for mongoose
	 * @property servers
	 * @type {{a: {host: string, user: string, pass: string, db: string, port: number}, b: {host: string, user: string, pass: string, db: string, port: number}, c: {host: string, user: string, pass: string, db: string, port: number}}}
	 */
	var servers = {
		a:{
			host:'127.0.0.1',
			user:'shutter',
			username: 'shutter',
			password: 'shutter',
			pass: 'shutter',
			db:'shutter',
			port:27017
		},
		b:{
			host:'127.0.0.1',
			user:'shutter',
			username: 'shutter',
			password: 'shutter',
			pass: 'shutter',
			db:'shutter',
			port:27017
		},
		c:{
			host:'127.0.0.1',
			user:'shutter',
			username: 'shutter',
			password: 'shutter',
			pass: 'shutter',
			db:'shutter',
			port:27017
		}
	};

	/**
	 * String connect for server a
	 * @type {string}
	 */
	servers.a.connect = 'mongodb://'+servers.a.user+':'+servers.a.pass+'@'+servers.a.host+':'+servers.a.port+'/'+servers.a.db;
	/**
	 * String connect for server b
	 * @type {string}
	 */
	servers.b.connect = 'mongodb://'+servers.b.user+':'+servers.b.pass+'@'+servers.b.host+':'+servers.b.port;
	/**
	 * String connect for server c
	 * @type {string}
	 */
	servers.c.connect = 'mongodb://'+servers.c.user+':'+servers.c.pass+'@'+servers.c.host+':'+servers.c.port;
	/**
	 * String connect for all servers
	 * @type {string}
	 */
	servers.connectString = servers.a.connect+','+servers.b.connect+','+servers.c.connect;

	/**
	 * Replica set hard options
	 * @type {{autoReconnect: boolean, poolSize: number, socparamsketOptions: {timeout: number, noDelay: boolean, keepAlive: number, encoding: string}}}
	 */
	var replicaSetStoreOptions = { // all optional
		"autoReconnect" : true,
		"poolSize" : 200,
		"socparamsketOptions" : {
			"timeout" : 0,
			"noDelay" : true,
			"keepAlive" : 1,
			"encoding" : "utf8"
		}
	};

	/**
	 * Replica set, more options
	 * @type {{safe: boolean, collection: string, db: {safe: boolean, name: string, servers: *[], replicaSetOptions: string}, user: string, password: string}}
	 */
	var replicaSet = {
		safe:true,
		"collection" : "sessions",
		"db": {
			"safe":true,
			"name" : "shutter",
			"servers" : [
				{
					"host" : servers.a.host,
					"port" : 27017,
					"options" : replicaSetStoreOptions
				},
				{
					"host" : servers.b.host,
					"port" : 27017,
					"options" : replicaSetStoreOptions
				},
				{
					"host" : servers.c.host,
					"port" : 27017,
					"options" : replicaSetStoreOptions
				}
			],
			"replicaSetOptions" : "coinding"
		},
		user:'shutter',
		username: 'shutter',
		password: 'shutter',
		pass: 'shutter'
	};

	/**
	 * Share config with the rest of the world
	 * @type {{db: {db: {safe: boolean, strict: boolean, native_parser: boolean}, server: {poolSize: number}, replset: {rs_name: string, strategy: string}, user: string, password: string}, servers: {a: {host: string, user: string, pass: string, db: string, port: number}, b: {host: string, user: string, pass: string, db: string, port: number}, c: {host: string, user: string, pass: string, db: string, port: number}}, replicaSet: {safe: boolean, collection: string, db: {safe: boolean, name: string, servers: *[], replicaSetOptions: string}, user: string, password: string}, port: number}}
	 */
	return {
		db:options,
		servers:servers,
		replicaSet:replicaSet,
		port:80,
		salt:'fd5ae061a0b2dd7e05bb47a0ffb04dbf1a7fa243ba465c4df290cff49d0e9f31'
	};
})();


/**
 * Export config
 * @type {{db: {db: {safe: boolean, strict: boolean, native_parser: boolean}, server: {poolSize: number}, replset: {rs_name: string, strategy: string}, user: string, password: string}, servers: {a: {host: string, user: string, pass: string, db: string, port: number}, b: {host: string, user: string, pass: string, db: string, port: number}, c: {host: string, user: string, pass: string, db: string, port: number}}, replicaSet: {safe: boolean, collection: string, db: {safe: boolean, name: string, servers: *[], replicaSetOptions: string}, user: string, password: string}, port: number}}
 */
module.exports = Config;