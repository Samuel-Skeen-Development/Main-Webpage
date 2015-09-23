/// <reference path="app.ts" />
/// <reference path="mainservice.ts" />
app.controller('MainController', ['$location', '$firebaseObject', '$firebaseArray', 'Auth', 'MainService', function ($location, $firebaseObject, $firebaseArray, Auth, MainService) {
        // ---------------------------------    DECLARE PRIVATE VARIABLES
        var vm = this, users = $firebaseArray(MainService.usersRef), currentUser;
        // ----------------------------------    DECLARE PUBLIC VARIABLES
        vm.test = 'test';
        vm.isMainOpen = false;
        // vm.isLoggedIn = false;
        vm.authData = Auth.authObj.$getAuth();
        // ----------------    INITIALIZING THE CURRENTUSER VAR ON STARTUP
        function initializeCurrentUser(data) {
            if (vm.authData) {
                for (var i = 0; i < users.length; i++) {
                    if (users[i].uid === vm.authData.uid) {
                        currentUser = users[i];
                        // console.log(currentUser);
                        break;
                    }
                }
            }
        }
        users.$loaded().then(function () {
            initializeCurrentUser(vm.authData);
        });
        // ------------------------------------    AUTHENTICATION LISTENER
        Auth.authObj.$onAuth(function (authData) {
            vm.authData = authData;
            // console.log(Auth.isLoggedIn);
            if (vm.authData) {
                initializeCurrentUser(vm.authData);
            }
            else {
                currentUser = undefined;
            }
        });
        // ----------------------------------    PUBLIC METHOD DECLARATIONS
        vm.testThis = function (data) {
            console.log(data);
        };
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
        // Testing for privileges
        vm.getAdmin = function () {
            // console.log(currentUser);
            if (currentUser) {
                return currentUser.isAdmin;
            }
            else
                return false;
        };
        vm.getLoggedIn = function () {
            return currentUser ? true : false;
        };
    }]);
