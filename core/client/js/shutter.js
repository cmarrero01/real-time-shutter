/**
 * Main Class to init the entire game
 */
var Shutter = (function(){

	var _logged = false;
	/**
	 * Load and initialize the entire core client module.
	 */
	function init(result){

		if(result && result.code === 200){
			_logged = true;
		}

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
		return _logged;
	}

	/**
	 * Change the flag that determine if the user is login
	 * @param flag
	 * @returns {*}
	 */
	function setLogIn(flag){
		return _logged = flag;
	}

	return {
		init:init,
		isLogin:isLogIn,
		setLogIn:setLogIn
	}
})();