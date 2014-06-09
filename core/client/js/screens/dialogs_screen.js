Shutter.Screen.Dialogs = (function(){

	/**
	 * All Templates
	 * @type {Array}
	 * @private
	 */
	var _templates = [];

	/**
	 * Dialogs templates
	 * @type {Array}
	 * @private
	 */
	var _dialogsTpl = [];

	/**
	 * Initialization of dialogs screen
	 */
	function init(){

		_templates = Shutter.Tpl.tpl();
		_dialogsTpl = _templates['dialogs'];

		show();
		events();
	}

	/**
	 * Add dialogs to body
	 */
	function show(){
		Shutter.Tpl.draw(null,_dialogsTpl.RegisterModal);
		Shutter.Tpl.draw(null,_dialogsTpl.LoginModal);
		Shutter.Tpl.draw(null,_dialogsTpl.DonateModal);
		Shutter.Tpl.draw(null,_dialogsTpl.GuestModal);
	}

	/**
	 * Hide Dialogs
	 * @param dialogId
	 */
	function hide(dialogId){
		$('#'+dialogId).modal('hide');
	}

	/**
	 * Init listen events to each dialog form.
	 */
	function events(){
		$(document).delegate('#registerForm','submit',Shutter.Land.signUp);
		$(document).delegate('#loginForm','submit',Shutter.Land.signIn);
		$(document).delegate('#guestForm','submit',Shutter.Land.guest);
	}

	return {
		init:init,
		hide:hide
	};
})();