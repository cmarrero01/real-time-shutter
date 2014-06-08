/**
 * Main Class to init the entire game
 */
Shutter.Tpl = (function(){

	/**
	 * List of templates
	 * @type {*[]}
	 * @private
	 */
	var _tpl = [
		{
			id:'dialogs',
			tpl:'/tpl/dialogs.html',
			screens:['RegisterModal','LoginModal','GuestModal','DonateModal','WinModal','LooseModal']
		},
		{
			id:'game',
			tpl:'/tpl/game.html',
			screens:['GameCanvas']
		},
		{
			id:'land',
			tpl:'/tpl/land.html',
			screens:['TitleLand','BackGround']
		},
		{
			id:'menues',
			tpl:'/tpl/menues.html',
			screens:['MainMenuLogOut','MainMenuLogIn','PlayingMenu']
		},
		{
			id:'miscellaneous',
			tpl:'/tpl/miscellaneous.html',
			screens:['LoadingBlock']
		},
		{
			id:'player',
			tpl:'/tpl/player.html',
			screens:['PlayerProfile','PlayerResumeGame','AvatarsList']
		}
	];

	/**
	 * List of jquery objectos of each template
	 * @type {Array}
	 * @private
	 */
	var _templates = [];

	/**
	 * If true when templates is finish to load.
	 * @type {boolean}
	 * @private
	 */
	var _loaded = false;

	/**
	 * Function callback to execute sentences when templates are uploaded.
	 * @type {null}
	 * @private
	 */
	var _onLoadScreens = null;

	/**
	 * The init clas to load templates
	 */
	function init(cb){
		_onLoadScreens = cb;
		loadTpl(0,onLoad);
		return true;
	}

	/**
	 * Load templates with $.get and create the jquery objects.
	 * @param index
	 * @param callback
	 */
	function loadTpl(index,callback){

		if(index === _tpl.length){

			callback();
			return;
		}

		var tpl = _tpl[index];

		var onLoadTpl = function(result){
			if(!result){
				return;
			}
			_templates[tpl.id] = [];
			for(var s in tpl.screens){
				_templates[tpl.id][tpl.screens[s]] = $(result).filter('#'+tpl.screens[s]);
			}
			index++;
			loadTpl(index,callback);
		};
		$.get(tpl.tpl,onLoadTpl);
	}

	/**
	 * When finish of load templates
	 */
	function onLoad(){
		_loaded = true;
		_onLoadScreens();
	}

	/**
	 * Get the html of each templates
	 * @returns {*}
	 */
	function getTemplates(){
		if(!_loaded){
			return false;
		}
		return _templates;
	}

	/**
	 * Parse tamplate with parse
	 * @param screen
	 * @returns {*}
	 */
	function parse(screen){
		if(!_loaded){ return false; }
		return Mustache.parse(screen);
	}

	/**
	 * Render template with data
	 * @param screen
	 * @param data
	 * @returns {*}
	 */
	function render(screen,data){
		if(!_loaded){ return false; }
		return Mustache.render(screen, data);
	}

	/**
	 * Add screen to the html
	 * @param cointainer
	 * @param screen
	 */
	function draw(cointainer,screen){
		if(cointainer === null){
			$('body').append(screen);
		} else {
			cointainer.html(screen);
		}
	}

	return {
		init:init,
		tpl:getTemplates,
		parse:parse,
		draw:draw,
		render:render
	}
})();