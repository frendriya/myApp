var app =  angular.module('yourApp', ['ngRoute']);

app.config(function($routeProvider,$locationProvider) {
		$routeProvider
			// route for the home page
			.when('/', {
				templateUrl : 'login.html',
				controller  : 'loginController'
			})
			.when('/history', {
				templateUrl : 'history.html',
				controller  : 'historyController'
			})
			.when('/register', {
				templateUrl : 'registration.html',
				controller  : 'registerController'
			})
			.when('/main',{
				templateUrl : 'main.html',
				controller  : 'mainController'
			});

			$locationProvider.html5Mode(true).hashPrefix('!');
	});

