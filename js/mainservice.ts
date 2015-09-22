/// <reference path="app.ts" />


app.service('MainService', [function() {
	var serv = this;
	
	serv.rootUrl = 'https://sam-skeen-dev-web.firebaseio.com/site'
	
	serv.rootRef = new Firebase(serv.rootUrl);
	serv.authRef = new Firebase(serv.rootUrl + '/users');
	serv.galleryRef = new Firebase(serv.rootUrl + '/gallery');
	serv.usersRef = serv.authRef;
}]);