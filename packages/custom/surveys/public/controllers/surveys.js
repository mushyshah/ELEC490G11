'use strict';

/* jshint -W098 */
angular.module('mean.surveys').controller('SurveysController', ['$scope', 'Global', 'Surveys', 
	'$http', '$sce', '$timeout', '$location',
  function($scope, Global, Surveys, $http, $sce, $timeout, $location, $interval) {

//Indicating that at this point, controller is still initializing
var initializing = true;

//Indicating that at this point, survey is not completed
$scope.completed = 0;

$scope.init = function () {
    
    //Create a new survey response
     $http.get('/api/surveys/newResponse')
        .success(function(data) {

          //Saving responseID and URL to scope
          //This is called by HTML in an iFrame 
          //to render survey page
            $scope.fluidResponse = data.url;
            $scope.responseid = data._id;

            //Ticker for polling (initialize to random value)
            $scope.tick(data._id);

            //Survey not yet completed
            $scope.completed = 0;

            //Finished Initializing
            initializing=false;
            console.log(data.url);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

};

//Function to evaulate whether or not to redirect to 
//results page. If 'true' passed to function, redirect.
//HTML page passes $scope.completed to this function
//at every tick
$scope.evaluate = function(value){

    if(value==0)
      return false;
    else
    {
      $location.path('/d3/result/'+$scope.responseid);
      return true;
    }
}

//Function used to 'sanitize' survey URL and 
// mark it as 'safe'
 $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  }

//Tick function that continually polls server for data
$scope.tick = function(resid) {

        //Poll server
        $http.get('/api/surveys/isResponseComplete/'+resid).success(function (data) {

            //Retrieve 'completed' flag
            $scope.completed = data.completed;

            //If survey completed, quit
            if(data.completed==1)
              return;
            
            //If data.completed==0, poll again after a second
            $timeout(function(){$scope.tick(resid)}, 1000);
        });
  };

    $scope.global = Global;
    $scope.package = {
      name: 'surveys'
    };
  }
]);
