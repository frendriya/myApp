app.controller('historyController', ['$window','$scope','$http','$location','userService','loginService','$rootScope','$timeout',
 function($window,$scope,$http,$location,userService,loginService,$rootScope,$timeout) {

if (loginService.GetCredentials().isAuthenticated){
  $scope.username = userInfo.userName;
} else {
  $location.path('/');
}

  $scope.search   = '';     // set the default search/filter term
getHistory();


function getHistory() {
                userService.getHistoricalDetails($scope.username,function(response){
                 if(response.data.code) {
                  //$scope.message = "Got Something";
                  $scope.records = response.data.message.HistoricalData; 
                  } else {
                   // $scope.message = "nothing";
                    console.log(response.data.message);
                
                  }
        });
}

$scope.logOut = function () {
loginService.ClearCredentials();
$location.path('/');
}  

	}]);