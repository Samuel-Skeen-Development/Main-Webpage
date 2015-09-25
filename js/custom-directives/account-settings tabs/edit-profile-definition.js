app.directive('editProfileTab', [function() {
	return {
		restrict: 'E',
		
		templateUrl: 'js/custom-directives/account-settings tabs/edit-profile-tab.html',
		
		controller: ['Auth', 'MainService', '$firebaseArray', '$firebaseObject', function(Auth, MainService, $firebaseArray, $firebaseObject) {
			var vm = this,
				currentAuth = Auth.authObj.$getAuth(),
				users = $firebaseArray(MainService.usersRef);
			vm.currentUser;
			vm.tempUser = {};
			vm.tempEmail = '';
			
			vm.standardBio = "This user currently doesn't have a life.  Otherwise, their bio would show up here.";
			
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
				
				for (var key in vm.currentUser) {
					console.log(typeof vm.currentUser[key], key)
					
					if (typeof vm.currentUser[key] === 'string') {
						vm.tempUser[key] = vm.currentUser[key].slice();
					}
				}
				console.log(vm.tempUser);
			});
			
			vm.editModeOn = {
				email: false,
				bio: false,
				facebookUrl: false,
				twitterUrl: false,
				linkedinUrl: false
			};
			
			vm.editItem = function(elem) {
				//function that when called will set the editModeOn value for the particular item
				switch(elem) {
					case 'email': vm.editModeOn.email = true;  vm.tempEmail += vm.tempUser.email; break;
					case 'bio': vm.editModeOn.bio = true; break;
					case 'facebookUrl': vm.editModeOn.facebookUrl = true; break;
					case 'twitterUrl': vm.editModeOn.twitterUrl = true; break;
					case 'linkedinUrl': vm.editModeOn.linkedinUrl = true; break;
				}
			};
			
			vm.cancelEdit = function(elem) {
				if (elem === 'email') {
					vm.editModeOn.email = false;
					
					vm.tempUser.email = vm.currentUser.email.slice();
				}
			};
			
			vm.updateEmail = function() {
				
				// POSSIBLE:  confirm the user wants to do this
				// call the $updateemail service in angularfire
				// update it in the users array as well
				
			};
			
		}],
		
		controllerAs: 'vm'
	}
}]);