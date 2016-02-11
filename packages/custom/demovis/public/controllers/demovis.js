'use strict';

/* jshint -W098 */
angular.module('mean.demovis').controller('DemovisController', ['$scope', 'Global', 'Demovis', '$http', '$stateParams', 
  '$location', function($scope, Global, Demovis, $http, $stateParams, $location) {
    $scope.global = Global;
    $scope.package = {
      name: 'demovis'
    };


    var ctrl = this;
    init();

    // function init
    function init() {
    $scope.feedbackMessage = "";
    $scope.responseID = $stateParams.responseID;
    console.log("D3 CONTROLLER RESPONSE ID: " + $scope.responseID); 
    $scope.random = 5;

      console.log("\n\n\nWHASSUPNO\n\n\n");
      // initialize controller variables
      ctrl.examples = [
      //"response1",
      //"data_the_avengers",
		  "response_hardcoded"
      ];
      ctrl.exampleSelected = ctrl.examples[0];
      ctrl.getData = getData;
      ctrl.selectExample = selectExample;

      // initialize controller functions
      ctrl.selectExample(ctrl.exampleSelected);
      ctrl.config = {
        w: 300,
        h: 300,
        facet: false,
        levels: 4,
        levelScale: 0.85,
        labelScale: 0.9,
        facetPaddingScale: 2.1,
        showLevels: true,
        showLevelsLabels: true,
        showAxesLabels: true,
        showAxes: true,
        showLegend: true,
        showVertices: true,
        showPolygons: true
      };

      //$location.url('/d3/example/');
    }


    // function getData
    function getData($fileContent) {
      ctrl.csv = $fileContent;
    }

    $scope.submitFeedback = function() {
        var data = {
                      'feedbackMessage': $scope.feedbackMessage,
                      'responseID': $scope.responseID
                    };

        $('#feedbackBox').hide();
        $('#feedbackSubmitted').show();


        $http.post("/api/demo/postFeedback", data).success(function(data, status) {
            console.log("Feedback Posted");
        })
    }      

    // function selectExample
    function selectExample(item) {
      $http.get('/api/demo/findResponse/'+$scope.responseID).success(function(data) {
        console.log(data);
        updateReadings(data);
        ctrl.csv = data;

      });
      console.log("\n\n\nWHASSUPNO\n\n\n");
    }



/*********************************************************************************************/

    var powerGauge1 = gauge1('#power-gauge1', {
      size: 175,
      clipWidth: 175,
      clipHeight: 100,
      ringWidth: 35,
      maxValue: 4,
      transitionMs: 3000,
    });
    var powerGauge2 = gauge2('#power-gauge2', {
      size: 175,
      clipWidth: 175,
      clipHeight: 100,
      ringWidth: 35,
      maxValue: 4,
      transitionMs: 3000,
    });
    var powerGauge3 = gauge3('#power-gauge3', {
      size: 175,
      clipWidth: 175,
      clipHeight: 100,
      ringWidth: 35,
      maxValue: 4,
      transitionMs: 3000,
    });
    var powerGauge4 = gauge4('#power-gauge4', {
      size: 175,
      clipWidth: 175,
      clipHeight: 100,
      ringWidth: 35,
      maxValue: 4,
      transitionMs: 3000,
    });
    var powerGauge5 = gauge5('#power-gauge5', {
      size: 175,
      clipWidth: 175,
      clipHeight: 100,
      ringWidth: 35,
      maxValue: 4,
      transitionMs: 3000,
    });
    
    function updateReadings(c) {

      // $http.get('/api/surveys/gaugeData/56433548/').success(function(data) {
     //        console.log(data);

     if(c.feedbackComplete == 0)
        $('#feedbackBox').show();
    else if(c.feedbackComplete == 1)
        $('#alreadySubmitted').show();
          
      // // just pump in random data here...
      powerGauge1.update(c.SS); //<-------------------------------------gauge values
      powerGauge2.update(c.FD);
      powerGauge3.update(c.BS);
      powerGauge4.update(c.JB);
      powerGauge5.update(c.ZL);

      $scope.JB = Math.round(c.JB * 100) / 100;
      $scope.BS = Math.round(c.BS * 100) / 100;
      $scope.SS = Math.round(c.SS * 100) / 100;
      $scope.FD = Math.round(c.FD * 100) / 100;
      $scope.ZL = Math.round(c.ZL * 100) / 100;

      
           if($scope.SS == 5)
            $('#SS5').show();
      else if($scope.SS == 4)
            $('#SS4').show();
      else if($scope.SS == 3)
            $('#SS3').show();
      else if($scope.SS == 2)
            $('#SS2').show();
      else if($scope.SS == 1)
            $('#SS1').show();

           if($scope.FD == 5)
            $('#FD5').show();
      else if($scope.FD == 4)
            $('#FD4').show();
      else if($scope.FD == 3)
            $('#FD3').show();
      else if($scope.FD == 2)
            $('#FD2').show();
      else if($scope.FD == 1)
            $('#FD1').show();
           
           if($scope.BS == 5)
            $('#BS5').show();
      else if($scope.BS == 4)
            $('#BS4').show();
      else if($scope.BS == 3)
            $('#BS3').show();
      else if($scope.BS == 2)
            $('#BS2').show();
      else if($scope.BS == 1)
            $('#BS1').show();

          if($scope.JB == 5)
            $('#JB5').show();
      else if($scope.JB == 4)
            $('#JB4').show();
      else if($scope.JB == 3)
            $('#JB3').show();
      else if($scope.JB == 2)
            $('#JB2').show();
      else if($scope.JB == 1)
            $('#JB1').show();

          if($scope.ZL == 5)
            $('#ZL5').show();
      else if($scope.ZL == 4)
            $('#ZL4').show();
      else if($scope.ZL == 3)
            $('#ZL3').show();
      else if($scope.ZL == 2)
            $('#ZL2').show();
      else if($scope.ZL == 1)
            $('#ZL1').show();



    }
            
    powerGauge1.render();
    powerGauge2.render();
    powerGauge3.render();
    powerGauge4.render();
    powerGauge5.render();
    
    // update reading values
    //updateReadings(c);


/*********************************************************************************************/


  }
]);
