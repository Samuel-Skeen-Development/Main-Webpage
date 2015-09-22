app.controller('RegistrationController', ['MainService', 'Auth', '$location', function(MainService, Auth, $location) {
	var vm = this;
	
	vm.username;
	vm.email;
	vm.password;
	vm.confirmPassord;
	vm.userFirstName;
	vm.userLastName;
	vm.securityQuestion1;
	vm.securityQuestion2;
	vm.securityQuestion3;
	
	vm.validateForm = function() {
		
	};
}]);