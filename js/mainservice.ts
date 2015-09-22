/// <reference path="app.ts" />


app.service('MainService', [function() {
	var serv = this;
	
	serv.rootRef = new Firebase('https://sam-skeen-dev-web.firebaseio.com/site/');
	serv.authRef = new Firebase(serv.rootRef + 'users');
	serv.galleryRef = new Firebase(serv.rootRef + 'gallery');
}]);