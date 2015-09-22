app.controller('EditGalleryController', ['$location', '$firebaseArray', '$firebaseObject', 'MainService', 'Auth', function($location, $firebaseArray, $firebaseObject, MainService, Auth) {
	var vm = this;
	
	vm.authData = Auth.authData;
	
	console.log(vm.authData);
}]);