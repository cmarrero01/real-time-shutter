/**
 * Land class to show the landing page
 */
Shutter.Land = (function(){

	/**
	 * Endpoints
	 * @type {Shutter.Config.endpoints|*}
	 * @private
	 */
	var _endpoints = Shutter.Config.endpoints;

	var _dialogId = null;

	/**
	 * Register
	 * @param e
	 */
	function signUp(e){
		var $this = $(this);
		var data = $this.serializeJSON({parseAll: true});

		Shutter.Socket.emit('player:register',data, onSignIn);
		_dialogId = 'RegisterModal';

		return false;
	}

	/**
	 * Login
	 * @param e
	 */
	function signIn(e){
		var $this = $(this);
		var data = $this.serializeJSON({parseAll: true});
		Shutter.Socket.emit('player:login',data,onSignIn);
		_dialogId = 'LoginModal';

		return false;
	}

	/**
	 * Callback when user try to sigIn
	 * @param result
	 */
	function onSignIn(result){
		console.log(result);
		if(!result || result.code !== 200){
			return false;
		}

		Shutter.setLogIn(true);
		Shutter.Player.setPlayer(result.player);
		Shutter.Screen.Dialogs.hide(_dialogId);
		Shutter.Screen.Menues.show('MainMenuLogIn');
		Shutter.Screen.Menues.hide('MainMenuLogOut');

		return true;
	}

	/**
	 * Guests
	 * @param e
	 */
	function guest(e){
		var $this = $(this);
		var data = $this.serializeJSON({parseAll: true});
		Shutter.Socket.emit('player:guest',data,onGuest);
		_dialogId = 'GuestModal';
		return false;
	}

	/**
	 * Callback when user try to access what guest
	 * @param result
	 */
	function onGuest(result){
		if(!result || result.code !== 200){
			return false;
		}

		Shutter.setLogIn(true);
		Shutter.Player.setPlayer(result.player);
		Shutter.Dialogs.hide(_dialogId);

		return true;
	}

	return {
		signUp:signUp,
		signIn:signIn,
		guest:guest
	};
})();