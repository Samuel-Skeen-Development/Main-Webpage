/// <reference path="app.ts" />
/// <reference path="mainservice.ts" />
var app = angular.module('MainApp');

app.controller('MainController', ['$location', '$firebaseObject', '$firebaseArray', function ($location, $firebaseObject, $firebaseArray) {
    var vm = this;
    
    vm.test = 'test';
    
    vm.testThis = function (data) {
        console.log(data);
    };
}]);
