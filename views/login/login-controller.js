app.controller('LoginController', ['Auth', '$location', function(Auth, $location) {
	var vm = this;
	
	// console.log(Auth.authData)
	
	vm.validateForm = function() {
		if (vm.email && vm.password) {
				
			Auth.authObj.$authWithPassword({
				email: vm.email,
				password: vm.password
			})
				.then(function(authData) {
					Auth.authData = authData;
					console.log("Success", Auth.authData);
					
					$location.path('#/home');
				}, function(error) {
					console.error(error);
				});
		} else {
			console.log('Please fill out the form entirely before you can continue.');
		}
	}
	
}]);