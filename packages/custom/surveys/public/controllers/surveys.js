'use strict';

/* jshint -W098 */
angular.module('mean.surveys').controller('SurveysController', ['$scope', 'Global', 'Surveys', 
	'$http', '$sce', '$timeout', '$location',
  function($scope, Global, Surveys, $http, $sce, $timeout, $location, $interval) {

var initializing = true;
$scope.completed = 0;

$scope.init = function () {
    
     $http.get('/api/surveys/newResponse')
        .success(function(data) {
            $scope.fluidResponse = data.url;
            $scope.responseid = data._id;
            $scope.tick(data._id);
            //$scope.responseComplete(data._id);
            $scope.completed = 0;
            //$interval($scope.tick(data._id),1000, 100);
            initializing=false;
            console.log(data.url);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

};

$scope.evaluate = function(value){

    console.log('EVALUATED'+value);

    if(value==0){
      $location = '/d3/example';
      return false;}
    else{
      $location = '/d3/example';
      return true;
        }
}
   /*
$scope.responseComplete = function (resid){
    $http.get('/api/isResponseComplete/'+resid)
        .success(function(data) {
            $scope.completed = 1;
            console.log("Response Completed");
        })
        .error(function(data) {
            console.log('Error: ' + data);
        })
        return;
}

*/
 $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  }

$scope.tick = function(resid) {
        $http.get('/api/surveys/isResponseComplete/'+resid).success(function (data) {
            console.log('IS IT COMPLETED? %d',data.completed);
            $scope.completed = data.completed;

            if(data.completed==1){
              $location = '/d3/example';
              return;
            }
            $timeout(function(){$scope.tick(resid)}, 1000);
        });
  };

$scope.$watch('completed',
              function() {console.log('RESPONSE COMPLETED');}
      );

/*
$scope.$watch(function(scope) { 

      if (!initializing) {
        console.log('\n\nRESPONSE ID1 %d', $scope.responseid);

        $http.get('/api/isResponseComplete/'+$scope.responseid)
        .success(function(data) {
            console.log('IS IT COMPLETED? %d',data);
            $scope.completed = data;
            return $scope.completed;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
         
      }

      return 0;
      },
              function() {console.log('RESPONSE COMPLETED');}
      );

*/
/*
    $scope.$watch(function () {
      for (var i = 0; i < $scope.sites.length; i+=1) {
        if ($scope.sites[i].active) {
          return $scope.sites[i];
        }
      }
    }, function (currentSlide, previousSlide) {
      if (currentSlide !== previousSlide) {
        console.log('currentSlide:', currentSlide);
      }
    });
*/

    $scope.global = Global;
    $scope.package = {
      name: 'surveys'
    };
  }
]);
