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
	 * Initialization of landing page
	 */
	function init(){
		_templates = Shutter.Tpl.tpl();
		_landTpl = _templates['land'];
		Shutter.Screen.Menues.init();
		show();
	}

	/**
	 * Show elements of landing
	 */
	function show(){
		Shutter.Tpl.draw(null,_landTpl.BackGround);
		Shutter.Tpl.draw(null,_landTpl.TitleLand);

		if(!Shutter.isLogin()){
			Shutter.Screen.Menues.show('MainMenuLogOut');
		}else{
			Shutter.Screen.Menues.show('MainMenuLogIn');
		}
	}

	return {
		init:init
	};
})();