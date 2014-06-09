Shutter.Socket = (function(){

	/**
	 * Emit sockets
	 * @param verb
	 * @param data
	 * @param cb
	 */
	function emit(verb,data,cb){
		socket.emit(verb,{params:data},cb);
	}

	/**
	 * Listen sockets
	 * @param verb
	 * @param cb
	 */
	function on(verb,cb){
		socket.removeListener(verb, cb);
		socket.on(verb,cb);
	}

	return {
		emit:emit,
		on:on
	}
})();