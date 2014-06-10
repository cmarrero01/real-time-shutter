module.exports = function(params){

	var Session = (function(){

		function handshake(socket){
			return (!socket || !socket.handshake || !socket.handshake.headers || !socket.handshake.headers.cookie);
		}

		return {
			handshake:handshake
		}
	})();

	return Session;
};
