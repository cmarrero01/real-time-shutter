Shutter.Config = (function(){

	var _ip = '127.0.0.1';
	var _url = 'shutter.local';
	var _salt = '$#&/&)(/(&%$/%$&%$#$#""$/(&/)(/%&(/&$';

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