/// <reference path="../bower_components/angular/angular.d.ts" />
/// <reference path="../bower_components/angularfire/dist/angularfire.d.ts" />
/// <reference path="../bower_components/firebase/firebase.d.ts" />
/// <reference path="../bower_components/angular-route/angular-route.d.ts" />
/// <reference path="maincontroller.ts" />
/// <reference path="mainservice.ts" />
var app = angular.module('MainApp', ['ngRoute', 'firebase', 'ngMaterial', 'ngAnimate', 'perfectParallax']);
app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/home', {
            templateUrl: '../views/home/home.html',
            controller: 'HomeController',
            controllerAs: 'vm',
            resolve: {}
        })
            .when('/about-me', {
            templateUrl: '../views/about-me/about-me.html',
            controller: 'AboutMeController',
            controllerAs: 'vm'
        })
            .when('/gallery', {
            templateUrl: '../views/gallery/gallery.html',
            controller: 'GalleryController',
            controllerAs: 'vm',
            resolve: {}
        })
            .when('/gallery/edit', {
            templateUrl: '../views/gallery/gallery-edit.html',
            controller: 'EditGalleryController',
            controllerAs: 'vm',
            resolve: {
                'currentAuth': ['Auth', function (Auth) {
                        return Auth.authObj.$waitForAuth();
                    }],
                'authData': ['Auth', function (Auth) {
                        return Auth.authObj.$getAuth();
                    }],
                'galleryItems': ['MainService', '$firebaseArray', function (MainService, $firebaseArray) {
                        return $firebaseArray(MainService.galleryRef).$loaded().then(function (data) {
                            return data;
                        });
                    }]
            }
        })
            .when('/contact-me', {
            templateUrl: '../views/contact-me/contact-me.html',
            controller: 'ContactMeController',
            controllerAs: 'vm'
        })
            .when('/account', {
            templateUrl: '../views/account/account.html',
            controller: 'AccountController',
            controllerAs: 'vm',
            resolve: {
                'currentAuth': ['Auth', function (Auth) {
                        return Auth.authObj.$waitForAuth();
                    }],
                'currentUser': ['Auth', '$firebaseArray', 'MainService', function (Auth, $firebaseArray, MainService) {
                        var users = $firebaseArray(MainService.usersRef), currentAuth = Auth.authObj.$getAuth(), result;
                        users.$loaded()
                            .then(function () {
                            if (currentAuth) {
                                for (var i = 0; i < users.length; i++) {
                                    if (currentAuth.uid === users[i].uid) {
                                        result = users[i];
                                    }
                                }
                            }
                            else
                                result = undefined;
                        });
                        return result;
                    }]
            }
        })
            .when('/admin', {
            templateUrl: '../views/admin/admin.html',
            controller: 'AdministratorController',
            controllerAs: 'vm',
            resolve: {
                'currentAuth': ['Auth', function (Auth) {
                        return Auth.authObj.$waitForAuth();
                    }],
                'currentUser': ['Auth', '$firebaseArray', 'MainService', function (Auth, $firebaseArray, MainService) {
                        var users = $firebaseArray(MainService.usersRef), currentAuth = Auth.authObj.$getAuth(), result;
                        users.$loaded()
                            .then(function () {
                            for (var i = 0; i < users.length; i++) {
                                if (currentAuth.uid === users[i].uid) {
                                    result = users[i];
                                }
                            }
                        });
                        return result;
                    }]
            }
        })
            .when('/login', {
            templateUrl: '../views/login/login.html',
            controller: 'LoginController',
            controllerAs: 'vm',
            resolve: {
                'getAuthInfo': ['Auth', '$location', function (Auth, $location) {
                        Auth.authData = Auth.authObj.$getAuth();
                        if (Auth.authData) {
                            $location.path('#/home');
                        }
                    }]
            }
        })
            .when('/registration', {
            templateUrl: '../views/registration/registration.html',
            controller: 'RegistrationController',
            controllerAs: 'vm',
            resolve: {
                'getAuthInfo': ['Auth', '$location', function (Auth, $location) {
                        Auth.authData = Auth.authObj.$getAuth();
                        if (Auth.authData) {
                            $location.path('#/home');
                        }
                    }]
            }
        })
            .otherwise({ redirectTo: '/home' });
        // $locationProvider.html5Mode({
        // 	enabled: true,
        // 	requireBase: true
        // });
    }]);
app.run(['$rootScope', '$location', function ($rootScope, $location) {
        $rootScope.$on('$routeChangeError', function (event, next, previous, error) {
            if (error === 'AUTH_REQUIRED') {
                $location.path('/home');
            }
        });
    }]);
