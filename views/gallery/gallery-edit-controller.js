app.controller('EditGalleryController', ['$location', '$firebaseArray', '$firebaseObject', 'MainService', 'Auth', 'authData', 'galleryItems', function($location, $firebaseArray, $firebaseObject, MainService, Auth, authData, galleryItems) {
	var vm = this;
	
	vm.authData = authData;
	vm.galleryItems = galleryItems;
	
	console.log(vm.authData);
	console.log(vm.galleryItems);
}]);