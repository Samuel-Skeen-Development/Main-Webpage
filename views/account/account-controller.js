app.controller('AccountController', ['currentUser', '$location', 'Auth', function(currentUser, $location, Auth) {
	var vm = this;
	
	vm.tabNum = 1;
	
	vm.isSelected = function(tabNum) {
		if (tabNum === vm.tabNum) {
			return "selected-tab";
		}
	}
	
	vm.setTab = function(num) {
		vm.tabNum = num;
	}
}]);