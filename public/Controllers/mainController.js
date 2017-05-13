app.controller('mainController', ['$window','$scope','$http','$location','userService','loginService','$rootScope','$timeout',
 function($window,$scope,$http,$location,userService,loginService,$rootScope,$timeout) {         

window.onbeforeunload = function() {
sessionSave();
return "message to display in dialog box";
}

$scope.$on("$destroy", function(){
        console.log('Destroyed1');
         window.onbeforeunload = null;
});

init();

function init(){
if (loginService.GetCredentials().isAuthenticated){
  $scope.username = userInfo.userName;
} else {
  $location.path('/');
}

  $scope.message = 'Welcome Harish';
  var countDownTime;
  $scope.active = false;
  $scope.resultColor = 'yellow';
  getSessionDetails();
  generateNumber();
}

function generateNumber() {
//var random = Math.floor(Math.random() * 90000) + 10000;
var random = Math.random().toString(36).substr(2, 6).toUpperCase();
$scope.newData = random; 
}

$scope.showTable = function (boolean) {
  $scope.showResultTable = boolean;
}

$scope.start = function () {
  $scope.show = true;
  $scope.showStartButton = false;
  $scope.startTimer();
}

$scope.startTimer = function() {
    $scope.showPauseButton = true;
    $scope.showResumeButton = false;
    $scope.active = true;
    $scope.message = 'Resumed';
    $scope.show = true;
    $scope.showResultTable = false;
    $scope.countdown();
};

$scope.pause = function() {
    $scope.showResumeButton = true;
    $scope.showPauseButton = false;
    $scope.active = false;
    $scope.message = 'Paused';
    $scope.show = false;
    $scope.showResultTable = true;
    $timeout.cancel(countdownStop);
};

$scope.stop = function () {
    $timeout.cancel(countdownStop);
}

$scope.countdown = function () {
    countdownStop = $timeout(function () {
          if ($scope.active && countDownTime >= 1000) {
                countDownTime = countDownTime - 1000;
                var hours = Math.floor((countDownTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((countDownTime % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((countDownTime % (1000 * 60)) / 1000);
                $scope.timer= hours + "h "    + minutes + "m " + seconds + "s ";
                $scope.countdown();
            }
        else {
            if (countDownTime <= 0) {
            $scope.stop();
            $scope.message = 'Expired';
            $scope.timer="Expired";
            $scope.showPauseButton = false;
            $scope.showResumeButton = false;
            $scope.show = false;
            $scope.showResultTable = true;
            sessionSave();
             }        }
    }, 1000);
};

$scope.Verify_number = function() {
                if($scope.userInput == '' || $scope.userInput == null){
                    //$scope.message = 'This is a required field..!'
                    return;
                }else if($scope.userInput == $scope.newData){
                    $scope.lastResult = "Correct!";
                    $scope.resultColor = 'lightblue';
                    $scope.totalCorrect = $scope.totalCorrect + 1;
                    console.log("Correct: "+$scope.totalCorrect);
                } else{
                    $scope.lastResult = "Incorrect!";
                    $scope.resultColor = 'red';
                    $scope.totalIncorrect = $scope.totalIncorrect + 1;
                    console.log("Incorrect: "+ $scope.totalIncorrect);
                }
                $scope.totalAttempts = $scope.totalAttempts + 1;
                console.log("Attempts: "+$scope.totalAttempts);
                // updateResultTable();
                generateNumber();
                $scope.userInput = "";
                // saveData();
               }  

$scope.logOut = function () {
sessionSave();
$location.path('/');
loginService.ClearCredentials();
}       


$scope.navHistory = function () {
if($scope.active){
$timeout.cancel(countdownStop);
}
sessionSave();
$location.path('/history');
//loginService.ClearCredentials();
}     




function getSessionDetails() {
                userService.getSessionDetails($scope.username,function(response){
                 if(response.data.code) {
                  $scope.message = response.data.message;
                  $scope.totalCorrect = $scope.message[0].totalCorrect;
                  $scope.totalIncorrect = $scope.message[0].totalIncorrect;
                  $scope.totalAttempts = $scope.message[0].totalAttempts;
                  countDownTime = $scope.message[0].CountdownTimer;
                  $scope.showStartButton = false;
                  $scope.showResumeButton = true;
                  $scope.showPauseButton = false;
                  //$scope.active = false;
                  $scope.message = 'Paused';
                  $scope.show = false;
                  $scope.showResultTable = true;
                  $scope.timer= Math.floor((countDownTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) + "h "    + 
                  Math.floor((countDownTime % (1000 * 60 * 60)) / (1000 * 60)) + "m " +
                  Math.floor((countDownTime % (1000 * 60)) / 1000) + "s ";
                  } else {
                  $scope.totalCorrect = 0;
                  $scope.totalIncorrect = 0;
                  $scope.totalAttempts = 0;
                  countDownTime = 5400000;
                  $scope.showStartButton = true;
                  $scope.timer = '1h 30m 00s';
                  }
        });
}


function sessionSave(){
    userService.save($scope.username,countDownTime,$scope.totalAttempts,$scope.totalCorrect,$scope.totalIncorrect, function(response){
                 if(response.data.code) {
                  $scope.message = response.data.message;
                    //loginService.SetCredentials($scope.username, $scope.password);
                    //$location.path('/main');
                  } else {
                  $scope.message = response.data.message;
                  }
        });
}




    }]);