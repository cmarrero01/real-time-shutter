Shutter.Player = (function(){

	var _player = null;

	function init(){

	}

	function setPlayer(player){
		_player = player;
		return _player;
	}

	function getPlayer(){
		return _player;
	}

	return {
		player:getPlayer,
		setPlayer:setPlayer
	}
})();