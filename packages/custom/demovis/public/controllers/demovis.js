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
        w: 320,
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

      
      if($scope.SS>3 && $scope.SS<=4)
            $('#OSS4').show();
      else if($scope.SS>2 && $scope.SS<=3)
            $('#OSS3').show();
      else if($scope.SS>1 && $scope.SS<=2)
            $('#OSS2').show();
      else if($scope.SS>=0 && $scope.SS<=1)
            $('#OSS1').show();

      if($scope.FD>3 && $scope.FD<=4)
            $('#OMSS4').show();
      else if($scope.FD>2 && $scope.FD<=3)
            $('#OMSS3').show();
      else if($scope.FD>1 && $scope.FD<=2)
            $('#OMSS2').show();
      else if($scope.FD>=0 && $scope.FD<=1)
            $('#OMSS1').show();

      if($scope.BS>3 && $scope.BS<=4)
            $('#LBSS4').show();
      else if($scope.BS>2 && $scope.BS<=3)
            $('#LBSS3').show();
      else if($scope.BS>1 && $scope.BS<=2)
            $('#LBSS2').show();
      else if($scope.BS>=0 && $scope.BS<=1)
            $('#LBSS1').show();

      if($scope.JB>3 && $scope.JB<=4)
            $('#SESS4').show();
      else if($scope.JB>2 && $scope.JB<=3)
            $('#SESS3').show();
      else if($scope.JB>1 && $scope.JB<=2)
            $('#SESS2').show();
      else if($scope.JB>=0 && $scope.JB<=1)
            $('#SESS1').show();

      if($scope.ZL>3 && $scope.ZL<=4)
            $('#TRSS4').show();
      else if($scope.ZL>2 && $scope.ZL<=3)
            $('#TRSS3').show();
      else if($scope.ZL>1 && $scope.ZL<=2)
            $('#TRSS2').show();
      else if($scope.ZL>=0 && $scope.ZL<=1)
            $('#TRSS1').show();

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
