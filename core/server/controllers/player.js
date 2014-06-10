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
		 * Register
		 * @param args
		 * @param socket
		 */
		function register(args,socket,cb){

			var alias = args.params.aliasRgInput;
			var email = args.params.emailRgInput;
			var password = args.params.passwordRgInput;

			var result = {
				code:300
			};

			if(!alias || !email || !password){
				cb(result);
				return false;
			}

			var cryptPass =  params.lib.bCrypt.hashSync(password);

			var newPlayer = new params.models.player({
				alias:alias,
				email:email,
				password:cryptPass
			});

			var newPlayerCb = function(err,doc){

				if(err || !doc){
					cb(result);
					return false;
				}

				result.code = 200;
				result.player = doc;

				socket.player = doc;

				cb(result);
				return true;
			};

			newPlayer.save(newPlayerCb);

			return true;
		}

		/**
		 * Login
		 * @param args
		 * @param socket
		 */
		function login(args,socket,cb){

			var email = args.params.emailLgInput;
			var password = args.params.passwordLgInput;

			var result = {
				code:300
			};

			if(!email || !password){
				cb(result);
				return false;
			}

			var loginCb = function(err,doc){
				if(err || !doc){
					cb(result);
					return false;
				}

				var equal = params.lib.bCrypt.compareSync(password,doc.password);
				if(!equal){
					cb(result);
					return false;
				}

				result.code = 200;
				result.player = doc;

				socket.player = doc;

				cb(result);
				return true;
			};

			params.models.player.findOne({email:email},loginCb);

			return true;
		}

		/**
		 * Guest
		 * @param args
		 * @param socket
		 */
		function guest(args,socket,cb){
			socket.emit('player:guest',args);
		}

		return {
			register:register,
			login:login,
			guest:guest
		};
	})();

	return Player;
};