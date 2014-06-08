Shutter.Screen.Land = (function(){

	/**
	 * List of templates
	 * @type {Array}
	 * @private
	 */
	var _templates = [];

	/**
	 * List of landing templates
	 * @type {Array}
	 * @private
	 */
	var _landTpl = [];

	/**
	 * List of menues templates
	 * @type {Array}
	 * @private
	 */
	var _menues = [];

	/**
	 * Initialization of landing page
	 */
	function init(){
		_templates = Shutter.Tpl.tpl();
		_landTpl = _templates['land'];
		_menues = _templates['menues'];
		show();
	}

	/**
	 * Show elements of landing
	 */
	function show(){

		Shutter.Tpl.draw(null,_landTpl.BackGround);
		Shutter.Tpl.draw(null,_landTpl.TitleLand);

		if(!Shutter.isLogin()){
			Shutter.Tpl.draw(null,_menues.MainMenuLogOut);
		}else{
			Shutter.Tpl.draw(null,_menues.MainMenuLogIn);
		}
	}


	return {
		init:init
	};
})();