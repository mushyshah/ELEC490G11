'use strict';

/* jshint -W098 */
angular.module('mean.d3').controller('D3Controller', ['$scope', 'Global', 'D3','$http', '$stateParams', 
  '$location', function($scope, Global, D3, $http, $stateParams, $location) {
    $scope.global = Global;
    $scope.package = {
      name: 'd3'
    };

    var ctrl = this;
    init();

    // function init
    function init() {
    $scope.feedbackMessage = "";
    $scope.responseID = $stateParams.responseID;
    //$location.url('/d3/example/');
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


        $http.post("/api/surveys/postFeedback", data).success(function(data, status) {
            console.log("Feedback Posted");
        })
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

     if(c.feedbackComplete == 0)
        $('#feedbackBox').show();
    else if(c.feedbackComplete == 1)
        $('#alreadySubmitted').show();
          
      // // just pump in random data here...
      powerGauge1.update(c.OSS); //<-------------------------------------gauge values
      powerGauge2.update(c.OMSS);
      powerGauge3.update(c.LBSS);
      powerGauge4.update(c.SESS);
      powerGauge5.update(c.TRSS);

      $scope.OSS = Math.round(c.OSS * 100) / 100;
      $scope.OMSS = Math.round(c.OMSS * 100) / 100;
      $scope.LBSS = Math.round(c.LBSS * 100) / 100;
      $scope.SESS = Math.round(c.SESS * 100) / 100;
      $scope.TRSS = Math.round(c.TRSS * 100) / 100;

      
      if($scope.OSS>3 && $scope.OSS<=4)
            $('#OSS4').show();
      else if($scope.OSS>2 && $scope.OSS<=3)
            $('#OSS3').show();
      else if($scope.OSS>1 && $scope.OSS<=2)
            $('#OSS2').show();
      else if($scope.OSS>=0 && $scope.OSS<=1)
            $('#OSS1').show();

      if($scope.OMSS>3 && $scope.OMSS<=4)
            $('#OMSS4').show();
      else if($scope.OMSS>2 && $scope.OMSS<=3)
            $('#OMSS3').show();
      else if($scope.OMSS>1 && $scope.OMSS<=2)
            $('#OMSS2').show();
      else if($scope.OMSS>=0 && $scope.OMSS<=1)
            $('#OMSS1').show();

      if($scope.LBSS>3 && $scope.LBSS<=4)
            $('#LBSS4').show();
      else if($scope.LBSS>2 && $scope.LBSS<=3)
            $('#LBSS3').show();
      else if($scope.LBSS>1 && $scope.LBSS<=2)
            $('#LBSS2').show();
      else if($scope.LBSS>=0 && $scope.LBSS<=1)
            $('#LBSS1').show();

      if($scope.SESS>3 && $scope.SESS<=4)
            $('#SESS4').show();
      else if($scope.SESS>2 && $scope.SESS<=3)
            $('#SESS3').show();
      else if($scope.SESS>1 && $scope.SESS<=2)
            $('#SESS2').show();
      else if($scope.SESS>=0 && $scope.SESS<=1)
            $('#SESS1').show();

      if($scope.TRSS>3 && $scope.TRSS<=4)
            $('#TRSS4').show();
      else if($scope.TRSS>2 && $scope.TRSS<=3)
            $('#TRSS3').show();
      else if($scope.TRSS>1 && $scope.TRSS<=2)
            $('#TRSS2').show();
      else if($scope.TRSS>=0 && $scope.TRSS<=1)
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
