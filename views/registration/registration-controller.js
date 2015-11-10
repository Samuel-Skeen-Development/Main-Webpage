app.controller('RegistrationController', ['MainService', 'Auth', '$location', '$firebaseArray', '$timeout', function(MainService, Auth, $location, $firebaseArray, $timeout) {
	var vm = this;
	
	// console.log(Audio.authData);
	
	vm.authData = Auth.authData;
	
	if (vm.authData) {
		$location.path('#/home');
	}
	
	vm.username;
	vm.email;
	vm.password;
	vm.confirmPassord;
	vm.userFirstName;
	vm.userLastName;
	vm.securityQuestionOne;
	vm.securityAnswerOne;
	vm.securityQuestionTwo;
	vm.securityAnswerTwo;
	vm.securityQuestionThree;
	vm.securityAnswerThree;
	
	vm.isAdmin = false;
	vm.isModerator = false;
	
	vm.step = 1;
	
	vm.users = $firebaseArray(MainService.usersRef);
	console.log(vm.users);
	
	vm.newUser = {};
	
	vm.submitNewUser = function() {
		if ((vm.password === vm.confirmPassword) && vm.password && vm.email) {
			console.log('Valid data was entered')
			
			vm.newUser.email = vm.email;
			vm.newUser.password = vm.password;
			
			Auth.authObj.$createUser(vm.newUser)
				.then(function(authData) {
					Auth.authData = authData;
					
					console.log('Authentication successful!');
					
					Auth.authObj.$authWithPassword(vm.newUser)
						.then(function (authData) {
							console.log('Successfully logged user in', authData.uid);
						}, function(e) {
							console.log('Authentication unsuccessful', e);
						});
					
					vm.step = 2;
				}, function(e) {
					console.log("Fail", e);
				});
			
		} else if (vm.password !== vm.confirmPassword) {
			console.log('The password needs to be the same as the confirmed password.');
		} else if (vm.email === '' || vm.password === '' || vm.confirmPassword) {
			console.log('You haven\'t filled the entire form out.  Review what hasn\'t been filled in and add that data.');
		}
	};
	
	vm.addNewUserData = function() {
		if (vm.step === 2) {
			if (vm.username && vm.userFirstName && vm.userLastName) {
				
				delete vm.newUser.password;
				
				for (var key in Auth.authData) {
					vm.newUser[key] = Auth.authData[key];
				}
				
				vm.newUser.username = vm.username;
				vm.newUser.firstName = vm.userFirstName;
				vm.newUser.lastName = vm.userLastName;
				vm.newUser.isAdmin = vm.isAdmin;
				vm.newUser.isModerator = vm.isModerator;
				
				vm.step = 3;
				
				// console.log('Hullo?');
				// console.log(vm.step);
			} else {
				console.log('You haven\'t filled the entire form out.  Do so before you can continue.');
			}
			
		} else if (vm.step === 3) {
			
			if (!vm.optOut_Questions) {
				vm.newUser.securityOne = {
					question: vm.securityQuestionOne,
					answer: vm.securityAnswerOne
				};
				
				if (vm.securityQuestionTwo) {
					vm.newUser.securityTwo = {
						question: vm.securityQuestionTwo,
						answer: vm.securityAnswerTwo
					};
				}
				
				if (vm.securityQuestionThree) {
					vm.newUser.securityThre = {
						question: vm.securityQuestionThree,
						answer: vm.securityAnswerThree
					};
				}
				
				vm.users.$add(vm.newUser);
				
				$location.path('#/home');
			} else {
				vm.users.$add(vm.newUser);
			}
			
		} else {
			alert('You haven\'t completed a previous step.  Reload the page to start the registration over.  If further problems are encountered in this process, contact the administrator on the Contact Me page.');
		}
	}
}]);