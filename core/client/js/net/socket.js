Shutter.Socket = (function(){

	function emit(verb,data){
		socket.emit(verv,data);
	}

	function on(verb,cb){
		socket.removeListener(verb, cb);
		socket.on(verb,cb);
	}

	return {
		emit:emit,
		on:on
	}
})();