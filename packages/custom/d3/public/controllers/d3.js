'use strict';

/* jshint -W098 */
angular.module('mean.d3').controller('D3Controller', ['$scope', 'Global', 'D3','$http', '$stateParams',
  function($scope, Global, D3, $http, $stateParams) {
    $scope.global = Global;
    $scope.package = {
      name: 'd3'
    };

     var ctrl = this;
    init();


    

    // function init
    function init() {
    $scope.responseID = $stateParams.responseID;
    console.log("D3 CONTROLLER RESPONSE ID: " + $scope.surveyID); 
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
        w: 250,
        h: 250,
        facet: false,
        levels: 5,
        levelScale: 0.85,
        labelScale: 0.9,
        facetPaddingScale: 2.1,
        showLevels: true,
        showLevelsLabels: false,
        showAxesLabels: true,
        showAxes: true,
        showLegend: true,
        showVertices: true,
        showPolygons: true
      };
    }

    // function getData
    function getData($fileContent) {
      ctrl.csv = $fileContent;
    }

    // function selectExample
    function selectExample(item) {
      $http.get('/api/surveys/findResponse/'+$scope.responseID).success(function(data) {
        console.log(data);
        updateReadings(data);
        ctrl.csv = data;
      });
      console.log("\n\n\nWHASSUPNO\n\n\n");
    }



/*********************************************************************************************/

    var powerGauge1 = gauge1('#power-gauge1', {
      size: 150,
      clipWidth: 225,
      clipHeight: 100,
      ringWidth: 30,
      maxValue: 4,
      transitionMs: 3000,
    });
    var powerGauge2 = gauge2('#power-gauge2', {
      size: 150,
      clipWidth: 225,
      clipHeight: 100,
      ringWidth: 30,
      maxValue: 4,
      transitionMs: 3000,
    });
    var powerGauge3 = gauge3('#power-gauge3', {
      size: 150,
      clipWidth: 225,
      clipHeight: 100,
      ringWidth: 30,
      maxValue: 4,
      transitionMs: 3000,
    });
    var powerGauge4 = gauge4('#power-gauge4', {
      size: 150,
      clipWidth: 225,
      clipHeight: 100,
      ringWidth: 30,
      maxValue: 4,
      transitionMs: 3000,
    });
    var powerGauge5 = gauge5('#power-gauge5', {
      size: 150,
      clipWidth: 225,
      clipHeight: 100,
      ringWidth: 30,
      maxValue: 4,
      transitionMs: 3000,
    });
    
    function updateReadings(c) {

      // $http.get('/api/surveys/gaugeData/56433548/').success(function(data) {
     //        console.log(data);
          
      // // just pump in random data here...
      powerGauge1.update(c.OSS); //<-------------------------------------gauge values
      powerGauge2.update(c.OMSS);
      powerGauge3.update(c.LBSS);
      powerGauge4.update(c.SESS);
      powerGauge5.update(c.TRSS);

      // powerGauge1.update(c); //<-------------------------------------gauge values
      // powerGauge2.update(c);
      // powerGauge3.update(c);
      // powerGauge4.update(c);
      // powerGauge5.update(c);
      // });
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
