/**
 * Player Model
 * @module Coinding.model.player
 * @author Claudio Marrero
 * @copyright 2014 Battle Game
 */
'use strict';
module.exports = function(params){

	var Schema   = params.mongoose.Schema;
	var Player;
	try {
		if (params.mongoose.model('player')){
			Player = params.mongoose.model('player');
		}
	} catch(e) {
		if (e.name === 'MissingSchemaError') {
			var playerSchema = new Schema({
				alias:{type: String, required: true, unique: true},
				email:{ type: String, required: true, unique:true, validate: [params.validate.email, 'invalid email address'] },
				password:{type: String, required:true},
				fbPassword:{type: String},
				fbObject:{},
				registerDate:{type: Date, default: new Date()},
				loginDate:{type: Date, default: new Date()}
			});
			Player = params.mongoose.model('player', playerSchema, 'player');
		}
	}

	return Player;
};