// create our module and inject ngAnimate into it
angular.module('animateApp',['ngAnimate']).controller('mainController',['$scope','$timeout',function($scope,$timeout) {
  
  // set the default states for lions and cranes
  $scope.serverup = false;
  $scope.serverdn = false;

  $scope.d3up = false;
  $scope.d3dn = false;
  
  $scope.mongoup = false;
  $scope.mongodn = false;
  
  $scope.fluidup = false;
  $scope.fluiddn = false;


$scope.tick = function() {

        if($scope.serverup==true)
            $timeout(function(){$scope.serverup=false;}, 1000);

        if($scope.serverdn==true)
            $timeout(function(){$scope.serverdn=false;}, 1000);

        if($scope.d3up==true)
            $timeout(function(){$scope.d3up=false;}, 1000);

        if($scope.d3dn==true)
            $timeout(function(){$scope.d3dn=false;}, 1000);

        if($scope.mongoup==true)
            $timeout(function(){$scope.mongoup=false;}, 1000);

        if($scope.mongodn==true)
            $timeout(function(){$scope.mongodn=false;}, 1000);

        if($scope.fluidup==true)
            $timeout(function(){$scope.fluidup=false;}, 1000);

        if($scope.fluiddn==true)
            $timeout(function(){$scope.fluiddn=false;}, 1000);

  };

$scope.$watch('serverup',
              function() {$scope.tick();}
      );

$scope.$watch('serverdn',
              function() {$scope.tick();}
      );

$scope.$watch('d3up',
              function() {$scope.tick();}
      );

$scope.$watch('d3dn',
              function() {$scope.tick();}
      );

$scope.$watch('mongoup',
              function() {$scope.tick();}
      );

$scope.$watch('mongodn',
              function() {$scope.tick();}
      );

$scope.$watch('fluidup',
              function() {$scope.tick();}
      );

$scope.$watch('fluiddn',
              function() {$scope.tick();}
      );



}]);