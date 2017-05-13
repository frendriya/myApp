app.factory('loginService', ['$http','$window','$rootScope','$timeout', function ($http,$window,$rootScope,$timeout) {
var service = {};
service.Login = function (username, password, callback) {
$http.post('/authenticate', { username: username, password: password })
               .then(function (response) {
                   		callback(response);
               		},function(response) {
               	 		callback(response);
        			}
               		);	
};

service.SetCredentials = function (username, password) {
           userInfo = {
        userName: username,
        isAuthenticated: true
      };
      $window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
        };


service.GetCredentials = function (callback) {

  var result = sessionStorage.getItem("userInfo")
      if (result !== null){
        return  userInfo = {
        userName: JSON.parse(result).userName,
        isAuthenticated: true
      }} else {
        return userInfo = {
        isAuthenticated: false
      };
      }
      };

service.ClearCredentials = function () {
            $window.sessionStorage.removeItem("userInfo");
        };
  

service.Create = function (username, password, email, callback) {
$http.post('/createUser', { username: username, password: password, email:email })
               .then(function (response) {
                   		callback(response);
               		},function(response) {
               	 		callback(response);
        			}
               		);	
};

        return service;
}]);


