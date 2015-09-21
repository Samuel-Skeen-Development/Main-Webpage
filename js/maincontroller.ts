/// <reference path="app.ts" />
/// <reference path="mainservice.ts" />

app.controller('MainController', ['$location', '$firebaseObject', '$firebaseArray', function($location, $firebaseObject, $firebaseArray) {
	var vm = this;
	
	vm.test = 'test';
	
	vm.testThis = function(data) {
		console.log(data);
	}
}]);