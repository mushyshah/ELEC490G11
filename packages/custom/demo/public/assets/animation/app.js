// create our module and inject ngAnimate into it
angular.module('animateApp',['ngAnimate']).controller('mainController',['$scope','$timeout', '$http',
  function($scope,$timeout,$http) {
  
  // set the default states for lions and cranes
  $scope.serverup = false;
  $scope.serverdn = false;

  $scope.d3up = false;
  $scope.d3dn = false;
  
  $scope.mongoup = false;
  $scope.mongodn = false;
  
  $scope.fluidup = false;
  $scope.fluiddn = false;

 

$scope.check = function() {

              console.log('IS IT COMPLETED?');
              
  $http.get('/api/demo/state').success(function (data) {
              console.log('YES');
              $scope.serverup = data.serverup;
              $scope.serverdn = data.serverdn;

              $scope.d3up = data.d3up;
              $scope.d3dn = data.d3dn;
              
              $scope.mongoup = data.mongoup;
              $scope.mongodn = data.mongodn;
              
              $scope.fluidup = data.fluidup;
              $scope.fluiddn = data.fluiddn;
            
            $timeout(function(){$scope.tick()}, 1000);
        });

}

 $scope.check();

$scope.tick = function() {

        if($scope.serverup==true)
            $scope.serverup=false;

        if($scope.serverdn==true)
            $scope.serverdn=false;

        if($scope.d3up==true)
            $scope.d3up=false;

        if($scope.d3dn==true)
            $scope.d3dn=false;

        if($scope.mongoup==true)
            $scope.mongoup=false;

        if($scope.mongodn==true)
            $scope.mongodn=false;

        if($scope.fluidup==true)
            $scope.fluidup=false;

        if($scope.fluiddn==true)
            $scope.fluiddn=false;

  };

// $scope.$watch('serverup',
//               function() {$scope.tick();}
//       );

// $scope.$watch('serverdn',
//               function() {$scope.tick();}
//       );

// $scope.$watch('d3up',
//               function() {$scope.tick();}
//       );

// $scope.$watch('d3dn',
//               function() {$scope.tick();}
//       );

// $scope.$watch('mongoup',
//               function() {$scope.tick();}
//       );

// $scope.$watch('mongodn',
//               function() {$scope.tick();}
//       );

// $scope.$watch('fluidup',
//               function() {$scope.tick();}
//       );

// $scope.$watch('fluiddn',
//               function() {$scope.tick();}
//       );



}]);