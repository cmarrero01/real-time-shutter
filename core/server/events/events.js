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
			socket.on('player:session',function(args,fn){
				params.ctrl.player.getSession(args,socket,fn);
			});
			socket.on('player:register',function(args,fn){
				params.ctrl.player.register(args,socket,fn);
			});
			socket.on('player:login',function(args,fn){
				params.ctrl.player.login(args,socket,fn);
			});
			socket.on('player:guest',function(args,fn){
				params.ctrl.player.guest(args,socket,fn);
			});
		}

		return {
			on:on
		};
	})();

	return Events;
};