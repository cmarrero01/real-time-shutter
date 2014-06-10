/**
 * Main Class for player functionalities
 * @param params
 * @returns {}
 */
module.exports = function(params){

	/**
	 * Player object
	 */
	var Player = (function(){

		/**
		 * Register on shutter game
		 * @param args
		 * @param socket
		 * @param fn
		 * @returns {boolean}
		 */
		function register(args,socket,fn){

			var alias = args.params.aliasRgInput;
			var email = args.params.emailRgInput;
			var password = args.params.passwordRgInput;

			var result = {
				code:300
			};

			if(!alias || !email || !password){
				fn(result);
				return false;
			}

			var cryptPass =  params.bCrypt.hashSync(password);

			var newPlayer = new params.models.player({
				alias:alias,
				email:email,
				password:cryptPass
			});

			var newPlayerCb = function(err,doc){

				if(err || !doc){
					fn(result);
					return false;
				}
				socket.player = doc;
				updateSession(socket,doc,fn);
				return true;
			};

			newPlayer.save(newPlayerCb);

			return true;
		}

		/**
		 * Login access
		 * @param args
		 * @param socket
		 * @param fn
		 * @returns {boolean}
		 */
		function login(args,socket,fn){

			var email = args.params.emailLgInput;
			var password = args.params.passwordLgInput;

			var result = {
				code:300
			};

			if(!email || !password){
				fn(result);
				return false;
			}

			var loginCb = function(err,doc){
				if(err || !doc){
					fn(result);
					return false;
				}

				var equal = params.bCrypt.compareSync(password,doc.password);
				if(!equal){
					fn(result);
					return false;
				}
				socket.player = doc;

				updateSession(socket,doc,fn);
				return true;
			};

			params.models.player.findOne({email:email},loginCb);

			return true;
		}

		/**
		 * Guest access
		 * @param args
		 * @param socket
		 * @param fn
		 */
		function guest(args,socket,fn){
			socket.emit('player:guest',args);
		}

		/**
		 * Get Admin Session
		 * @param args
		 * @param socket
		 * @param fn
		 */
		function getSession(args,socket,fn){

			var result = {
				code:300
			};

			if(params.lib.session.handshake(socket)){
				fn(result);
				return;
			}

			var cookie = params.cookie.parse(socket.handshake.headers.cookie);
			var connectSid = cookie['connect.sid'];
			var sessionId = params.parseSid(connectSid,fn);

			var sesGetCb = function(err,session){

				if(err || !session){
					fn(result);
					return;
				}

				if(!session.player){
					fn(result);
					return;
				}

				result.code = 200;
				result.player = session.player;
				console.log(result);
				fn(result);
			};

			params.store.get(sessionId, sesGetCb);
		}

		/**
		 * Update session of socket and express
		 * @param socket
		 * @param args
		 * @param fn
		 */
		function updateSession(socket,args,fn){

			var result = {
				code:300
			};

			var _session = null;

			if(params.lib.session.handshake(socket)){
				fn(result);
				return;
			}

			var cookie = params.cookie.parse(socket.handshake.headers.cookie);
			var connectSid = cookie['connect.sid'];
			var sessionId = params.parseSid(connectSid,fn);

			var sesSetCb = function(err){
				if(err || !_session){
					fn(result);
					return;
				}
				result.code = 200;
				result.player = args;
				fn(result);
			};

			var sesGetCb = function(err,session){
				if(err || !session){
					fn(result);
					return;
				}
				_session = session;
				_session.player = args;
				params.store.set(sessionId,_session,sesSetCb);
			};

			params.store.get(sessionId, sesGetCb);
		}

		return {
			register:register,
			login:login,
			guest:guest,
			getSession:getSession
		};
	})();

	return Player;
};