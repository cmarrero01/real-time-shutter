Shutter.Config = (function(){
	/**
	 * Port for listen the entire project
	 * @type {number}
	 * @private
	 */
	var _port = 80;

	/**
	 * IP to call things of the server
	 * @type {string}
	 * @private
	 */
	var _ip = '127.0.0.1';

	/**
	 * URL origin
	 * @type {string}
	 * @private
	 */
	var _url = 'shutter.local';

	/**
	 * Salt to encrypt things
	 * @type {string}
	 * @private
	 */
	var _salt = 'fd5ae061a0b2dd7e05bb47a0ffb04dbf1a7fa243ba465c4df290cff49d0e9f31';

	/**
	 * List of Endpoints
	 * @type {{register: {url: string, method: string}, login: {url: string, method: string}, guest: {url: string, method: string}}}
	 * @private
	 */
	var _endpoints = {
		register:{
			url:'/register',
			method:'post'
		},
		login:{
			url:'/login',
			method:'post'
		},
		guest:{
			url:'/guest',
			method:'post'
		}
	};

	return {
		endpoints:_endpoints,
		ip:_ip,
		url:_url,
		salt:_salt
	};
})();