app.controller('loginController', ['$scope','$http','$location','loginService','$rootScope',
 function($scope,$http,$location,loginService,$rootScope) {         
 if($scope.message == null){
 $scope.message = 'Welcome!';
 }  
 $scope.username ='';
 $scope.password = '';

$scope.Login = function () {
	 $scope.message = 'Hello World1';
if($scope.username == ""){
	$scope.message = "Please fill username!!";
} else if($scope.password == ""){
	$scope.message  = "Please fill password!!";
}else 
{
loginService.Login($scope.username, $scope.password, function(response) {
                if(response.data.code) {
                	$scope.message = response.data.message;
                    loginService.SetCredentials($scope.username, $scope.password);
                    $location.path('/main');
                	} else {
                	$scope.message = response.data.message;
                	}
				})
}
}
    }]);