Shutter.Screen.Menues = (function(){

	var _templates = [];
	var _menues = [];

	function init(){
		_templates = Shutter.Tpl.tpl();
		_menues = _templates['menues'];
		draw();
	}

	function draw(){
		Shutter.Tpl.draw(null,_menues.MainMenuLogOut);
		Shutter.Tpl.draw(null,_menues.MainMenuLogIn);
		events();
	}

	function show(menu){
		_menues[menu].show();
	}

	function hide(menu){
		_menues[menu].hide();
	}

	function remove(menu){
		_menues[menu].remove();
	}

	function events(){
		$(document).delegate('#PlayCpuBtn','click');
	}

	return {
		init:init,
		show:show,
		hide:hide,
		remove:remove
	};
})();