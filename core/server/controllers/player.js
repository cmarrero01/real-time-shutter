/**
 * Main Class for player functionalities
 * @param params
 * @returns {}
 */
module.exports = function(params){

	/**
	 * Player object
	 */
	var Player = (function(){

		/**
		 * Register
		 * @param args
		 * @param socket
		 */
		function register(args,socket){
			socket.emit('player:register',args);
		}

		/**
		 * Login
		 * @param args
		 * @param socket
		 */
		function login(args,socket){
			socket.emit('player:login',args);
		}

		/**
		 * Guest
		 * @param args
		 * @param socket
		 */
		function guest(args,socket){
			socket.emit('player:guest',args);
		}

		return {
			register:register,
			login:login,
			guest:guest
		};
	})();

	return Player;
};