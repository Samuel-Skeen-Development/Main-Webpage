/// <reference path="../bower_components/angular/angular.d.ts" />
/// <reference path="maincontroller.ts" />
/// <reference path="mainservice.ts" />

var app = angular.module('MainApp', ['ngRoute', 'firebase', 'ngMaterial', 'ngAnimate']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/home', {
			templateUrl: '../views/home.html',
			controller: 'HomeController',
			controllerAs: 'vm'
			
		})
		.when('/gallery', {
			templateUrl: '../views/gallery.html',
			controller: 'GalleryController',
			controllerAs: 'vm'
			
		})
		.otherwise({redirectTo: '/'});
	
	// $locationProvider.html5Mode({
	// 	enabled: true,
	// 	requireBase: true
	// });
}]);