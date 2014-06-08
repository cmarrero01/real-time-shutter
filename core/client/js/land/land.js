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


	/**
	 * Register
	 * @param e
	 */
	function signUp(e){

		var $this = $(this);
		var data = $this.serializeJSON({parseAll: true});

		Shutter.Socket.emit('player:register',data);
		Shutter.Socket.on('player:register',onSignUp);
		
		return false;
	}

	/**
	 * Callback when user try to sign up
	 * @param result
	 */
	function onSignUp(result){
		console.log(result);
	}

	/**
	 * Login
	 * @param e
	 */
	function signIn(e){
		var $this = $(this);
		var data = $this.serialize();
		$.post(_endpoints.login.url,data,onSignIn);
	}

	/**
	 * Callback when user try to sigIn
	 * @param result
	 */
	function onSignIn(result){

	}

	/**
	 * Guests
	 * @param e
	 */
	function guest(e){
		var $this = $(this);
		var data = $this.serialize();
		$.post(_endpoints.guest.url,data,onGuest);
	}

	/**
	 * Callback when user try to access what guest
	 * @param result
	 */
	function onGuest(result){

	}

	return {
		signUp:signUp,
		signIn:signIn,
		guest:guest
	};
})();