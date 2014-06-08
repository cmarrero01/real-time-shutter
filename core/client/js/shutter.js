/**
 * Main Class to init the entire game
 */
var Shutter = (function(){

	var _logIn = false;
	/**
	 * Load and initialize the entire core client module.
	 */
	function init(){
		Shutter.Tpl.init(onTplLoad);
	}

	/**
	 * When finish of load tmplates, initialize de screens
	 */
	function onTplLoad(){
		Shutter.Screen.Land.init();
		Shutter.Screen.Dialogs.init();
	}

	/**
	 * Determine if the user is login
	 * @returns {boolean}
	 */
	function isLogIn(){
		return _logIn;
	}

	/**
	 * Change the flag that determine if the user is login
	 * @param flag
	 * @returns {*}
	 */
	function setLogIn(flag){
		return _logIn = flag;
	}

	return {
		init:init,
		isLogin:isLogIn,
		setLogIn:setLogIn
	}
})();