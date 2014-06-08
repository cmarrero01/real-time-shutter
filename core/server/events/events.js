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
		function on(socket){
			socket.on('player:register',function(args){
				params.ctrl.player.register(args,socket);
			});
			socket.on('player:login',function(args){
				params.ctrl.player.login(args,socket);
			});
			socket.on('player:guest',function(args){
				params.ctrl.player.guest(args,socket);
			});
		}

		return {
			on:on
		};
	})();

	return Events;
};