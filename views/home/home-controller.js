app.controller('HomeController', ['$location', '$firebaseArray', '$firebaseObject', '$timeout', function($location, $firebaseArray, $firebaseObject, $timeout) {
	var vm = this;
	
	vm.testThis = function(data) {
		console.log(data);
	}
}]);