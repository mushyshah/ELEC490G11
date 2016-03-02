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
      // initialize controller variables
      ctrl.getData = getData;
      ctrl.selectExample = selectExample;

      // initialize controller functions
      ctrl.selectExample();
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


        $http.post("/api/surveys/postFeedback", data).success(function(data, status) {
            console.log("Feedback Posted");
        })
    }      

    // function selectExample
    function selectExample() {
      $http.get('/api/surveys/findResponse/'+$scope.responseID).success(function(data) {

      binData(data,function(dataOut){
        console.log(dataOut);
        updateReadings(dataOut);
        ctrl.csv = dataOut;
      });

      });
    }

/*********************************************************************************************/

    function binData(d,result){

      var out = d;

      if(d.OSS>3 && d.OSS<=4)
            out.OSS = 4;
      else if(d.OSS>2 && d.OSS<=3)
            out.OSS = 3;
      else if(d.OSS>1 && d.OSS<=2)
            out.OSS = 2;
      else if(d.OSS>=0 && d.OSS<=1)
            out.OSS = 1;

      if(d.OMSS>3 && d.OMSS<=4)
            out.OMSS = 4;
      else if(d.OMSS>2 && d.OMSS<=3)
            out.OMSS = 3;
      else if(d.OMSS>1 && d.OMSS<=2)
            out.OMSS = 2;
      else if(d.OMSS>=0 && d.OMSS<=1)
            out.OMSS = 1;

      if(d.LBSS>3 && d.LBSS<=4)
            out.LBSS = 4;
      else if(d.LBSS>2 && d.LBSS<=3)
            out.LBSS = 3;
      else if(d.LBSS>1 && d.LBSS<=2)
            out.LBSS = 2;
      else if(d.LBSS>=0 && d.LBSS<=1)
            out.LBSS = 1;

      if(d.SESS>3 && d.SESS<=4)
            out.SESS = 4;
      else if(d.SESS>2 && d.SESS<=3)
            out.SESS = 3;
      else if(d.SESS>1 && d.SESS<=2)
            out.SESS = 2;
      else if(d.SESS>=0 && d.SESS<=1)
            out.SESS = 1;

      if(d.TRSS>3 && d.TRSS<=4)
           out.TRSS = 4;
      else if(d.TRSS>2 && d.TRSS<=3)
           out.TRSS = 3;
      else if(d.TRSS>1 && d.TRSS<=2)
           out.TRSS = 2;
      else if(d.TRSS>=0 && d.TRSS<=1)
           out.TRSS = 1;

         result(out);

    }

/*********************************************************************************************/

    var powerGauge1 = gauge1('#power-gauge1', {
      size: 175,
      clipWidth: 175,
      clipHeight: 100,
      ringWidth: 35,
      maxValue: 3,
      transitionMs: 3000,
    });
    var powerGauge2 = gauge2('#power-gauge2', {
      size: 175,
      clipWidth: 175,
      clipHeight: 100,
      ringWidth: 35,
      maxValue: 3,
      transitionMs: 3000,
    });
    var powerGauge3 = gauge3('#power-gauge3', {
      size: 175,
      clipWidth: 175,
      clipHeight: 100,
      ringWidth: 35,
      maxValue: 3,
      transitionMs: 3000,
    });
    var powerGauge4 = gauge4('#power-gauge4', {
      size: 175,
      clipWidth: 175,
      clipHeight: 100,
      ringWidth: 35,
      maxValue: 3,
      transitionMs: 3000,
    });
    var powerGauge5 = gauge5('#power-gauge5', {
      size: 175,
      clipWidth: 175,
      clipHeight: 100,
      ringWidth: 35,
      maxValue: 3,
      transitionMs: 3000,
    });
    
    function updateReadings(c) {

     if(c.feedbackComplete == 0)
        $('#feedbackBox').show();
    else if(c.feedbackComplete == 1)
        $('#alreadySubmitted').show();

      $scope.OSS = Math.round(c.OSS * 100) / 100;
      $scope.OMSS = Math.round(c.OMSS * 100) / 100;
      $scope.LBSS = Math.round(c.LBSS * 100) / 100;
      $scope.SESS = Math.round(c.SESS * 100) / 100;
      $scope.TRSS = Math.round(c.TRSS * 100) / 100;
      
      if($scope.OSS>3 && $scope.OSS<=4)
            {$('#OSS4').show(); $scope.OSS = 3;}
      else if($scope.OSS>2 && $scope.OSS<=3)
            {$('#OSS3').show(); $scope.OSS = 2;}
      else if($scope.OSS>1 && $scope.OSS<=2)
            {$('#OSS2').show(); $scope.OSS = 1;}
      else if($scope.OSS>=0 && $scope.OSS<=1)
            {$('#OSS1').show(); $scope.OSS = 0;}

      if($scope.OMSS>3 && $scope.OMSS<=4)
            {$('#OMSS4').show(); $scope.OMSS = 3;}
      else if($scope.OMSS>2 && $scope.OMSS<=3)
            {$('#OMSS3').show(); $scope.OMSS = 2;}
      else if($scope.OMSS>1 && $scope.OMSS<=2)
            {$('#OMSS2').show(); $scope.OMSS = 1;}
      else if($scope.OMSS>=0 && $scope.OMSS<=1)
            {$('#OMSS1').show(); $scope.OMSS = 0;}

      if($scope.LBSS>3 && $scope.LBSS<=4)
            {$('#LBSS4').show(); $scope.LBSS = 3;}
      else if($scope.LBSS>2 && $scope.LBSS<=3)
            {$('#LBSS3').show(); $scope.LBSS = 2;}
      else if($scope.LBSS>1 && $scope.LBSS<=2)
            {$('#LBSS2').show(); $scope.LBSS = 1;}
      else if($scope.LBSS>=0 && $scope.LBSS<=1)
            {$('#LBSS1').show(); $scope.LBSS = 0;}

      if($scope.SESS>3 && $scope.SESS<=4)
            {$('#SESS4').show(); $scope.SESS = 3;}
      else if($scope.SESS>2 && $scope.SESS<=3)
            {$('#SESS3').show(); $scope.SESS = 2;}
      else if($scope.SESS>1 && $scope.SESS<=2)
            {$('#SESS2').show(); $scope.SESS = 1;}
      else if($scope.SESS>=0 && $scope.SESS<=1)
            {$('#SESS1').show(); $scope.SESS = 0;}

      if($scope.TRSS>3 && $scope.TRSS<=4)
            {$('#TRSS4').show(); $scope.TRSS = 3;}
      else if($scope.TRSS>2 && $scope.TRSS<=3)
            {$('#TRSS3').show(); $scope.TRSS = 2;}
      else if($scope.TRSS>1 && $scope.TRSS<=2)
            {$('#TRSS2').show(); $scope.TRSS = 1;}
      else if($scope.TRSS>=0 && $scope.TRSS<=1)
            {$('#TRSS1').show(); $scope.TRSS = 0;}


      // // just pump in random data here...
      powerGauge1.update($scope.OSS); //<-------------------------------------gauge values
      powerGauge2.update($scope.OMSS);
      powerGauge3.update($scope.LBSS);
      powerGauge4.update($scope.SESS);
      powerGauge5.update($scope.TRSS);


    }
            
    powerGauge1.render();
    powerGauge2.render();
    powerGauge3.render();
    powerGauge4.render();
    powerGauge5.render();

/*********************************************************************************************/

  }

]);
