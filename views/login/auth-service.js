app.service('Auth', ['$firebaseAuth', 'MainService', function($firebaseAuth, MainService) {
	var serv = this;
	
	serv.authObj = $firebaseAuth(MainService.authRef);
	
	// serv.authObj.$onAuth(function(authData) {
		
	// });
	
	serv.authData;
	
	serv.isLoggedIn = false;
}]);