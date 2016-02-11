'use strict';

/* jshint -W098 */
angular.module('mean.demo').controller('DemoController', ['$scope', 'Global', 'Demo',
  '$http', '$sce', '$timeout', '$location', 
  function($scope, Global, Demo, $http, $sce, $timeout, $location, $interval) {
   

var initializing = true;
$scope.completed = 0;

$scope.init = function () {
    

     $http.get('/api/demo/newResponse')
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

    if(value==0)
      return false;
    else
    {
      $location.path('/d3/example/'+$scope.responseid);
      return true;
    }
}
 
 $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  }

$scope.tick = function(resid) {
        $http.get('/api/demo/isResponseComplete/'+resid).success(function (data) {
            console.log('IS IT COMPLETED? %d',data.completed);
            $scope.completed = data.completed;

            if(data.completed==1)
              return;
            
            $timeout(function(){$scope.tick(resid)}, 1000);
        });
  };

$scope.$watch('completed',
              function() {console.log('RESPONSE COMPLETED');}
      );


    $scope.global = Global;
    $scope.package = {
      name: 'demo'
    };
  }
]);
