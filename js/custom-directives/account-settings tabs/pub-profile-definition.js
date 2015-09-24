app.directive('pubProfileTab', [function() {
	return {
		restrict: 'E',
		
		templateUrl: 'js/custom-directives/account-settings tabs/pub-profile-tab.html',
		
		controller: ['Auth', 'MainService', '$firebaseArray', '$firebaseObject', function(Auth, MainService, $firebaseArray, $firebaseObject) {
			var vm = this,
				currentAuth = Auth.authObj.$getAuth(),
				users = $firebaseArray(MainService.usersRef);
			vm.currentUser;
			
			function getCurrentUser() {
				if (currentAuth) {
					for (var i = 0; i < users.length; i++) {
						if (currentAuth.uid === users[i].uid) {
							vm.currentUser = users[i];
							break;
						}
					}
				} else vm.currentUser = undefined;
			}
			
			users.$loaded().then(function() {
				getCurrentUser();
			})
		}],
		
		controllerAs: 'vm'
	}
}]);