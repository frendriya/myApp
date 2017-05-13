app.factory('userService', ['$http','$rootScope','$timeout', function ($http,$rootScope,$timeout) {
var service = {};
service.save = function (username,timer,totalAttempts,totalCorrect,totalIncorrect, callback) {
$http.post('/save', { username: username, timer: timer, totalAttempts:totalAttempts ,totalCorrect:totalCorrect,totalIncorrect
:totalIncorrect})
               .then(function (response) {
                   		callback(response);
               		},function(response) {
               	 		callback(response);
        			}
               		);	
};

service.getSessionDetails = function (username,callback) {
	var url = '/getSessionDetails?username=' + username ;
$http.get(url,{username:username})
               .then(function (response) {
                   		callback(response);
               		},function(response) {
               	 		callback(response);
        			}
               		);	
};


service.getHistoricalDetails = function (username,callback) {
	var url = '/getHistoricalDetails?username=' + username ;
$http.get(url,{username:username})
               .then(function (response) {
                   		callback(response);
               		},function(response) {
               	 		callback(response);
        			}
               		);	
};


        return service;
}]);


