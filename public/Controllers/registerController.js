app.controller('registerController', ['$scope','$http','$location','loginService','$rootScope',
 function($scope,$http,$location,loginService,$rootScope) {         
 $rootScope.message = null;
 $scope.message = 'Please fill all the details below!';  
 $scope.username ='';
 $scope.password = '';
 $scope.email = '';

$scope.Create = function () {
	 $scope.message = 'Hello World1';
if($scope.username == ""){
	$scope.message = "Please fill username!!";
} else if($scope.password == ""){
	$scope.message  = "Please fill password!!";
} else if($scope.email == ""){
	$scope.message  = "Please fill email address!!";
}else 
{
loginService.Create($scope.username, $scope.password,$scope.email, function(response) {
                if(response.data.code) {
                	$rootScope.message = response.data.message;
                    //loginService.SetCredentials($scope.username, $scope.password);
                    $location.path('/');
                	} else {
                	$scope.message = response.data.message;
                	}
				})
}
}
    }]);