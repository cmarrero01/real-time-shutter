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
			socket.on('player:register',function(args,cb){
				params.ctrl.player.register(args,socket,cb);
			});
			socket.on('player:login',function(args,cb){
				params.ctrl.player.login(args,socket,cb);
			});
			socket.on('player:guest',function(args,cb){
				params.ctrl.player.guest(args,socket,cb);
			});
		}

		return {
			on:on
		};
	})();

	return Events;
};