/// <reference path="app.ts" />
/// <reference path="mainservice.ts" />
app.controller('MainController', ['$location', '$firebaseObject', '$firebaseArray', 'Auth', function ($location, $firebaseObject, $firebaseArray, Auth) {
        var vm = this;
        vm.test = 'test';
        vm.isMainOpen = false;
        // vm.isLoggedIn = false;
        vm.authData = Auth.authObj.$getAuth();
        // ------------------------------------    AUTHENTICATION LISTENER
        Auth.authObj.$onAuth(function (authData) {
            vm.authData = authData;
            // console.log(Auth.isLoggedIn);
            if (vm.authData) {
                Auth.isLoggedIn = true;
            }
            else {
                Auth.isLoggedIn = false;
            }
        });
        // ----------------------------------  METHOD DECLARATIONS
        vm.openMainMenu = function () {
            vm.isMainOpen = true;
        };
        vm.closeMainMenu = function () {
            vm.isMainOpen = false;
        };
        vm.logout = function () {
            vm.isMainOpen = false;
            Auth.authObj.$unauth();
        };
        vm.testThis = function (data) {
            console.log(data);
        };
        vm.getAdmin = function () {
            if (vm.authData) {
                vm.authData.uid;
            }
        };
        vm.getLoggedIn = function () {
            return Auth.isLoggedIn;
        };
    }]);
