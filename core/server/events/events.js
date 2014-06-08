/**
 * Events main class
 * @param params
 * @returns {}
 */
module.exports = function(params){

	/**
	 * Event obj
	 */
	var Events = (function(){

		/**
		 * Listen all verbs incoming of client side
		 */
		function on(){
			params.socket.on('player:register',params.ctrl.player.register);
			params.socket.on('player:login',params.ctrl.player.login);
			params.socket.on('player:guest',params.ctrl.player.guest);
		}

		return {
			on:on
		};
	})();

	return Events;
};