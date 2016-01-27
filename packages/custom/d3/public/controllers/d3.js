'use strict';

/* jshint -W098 */
angular.module('mean.d3').controller('D3Controller', ['$scope', 'Global', 'D3','$http',
  function($scope, Global, D3, $http) {
    $scope.global = Global;
    $scope.package = {
      name: 'd3'
    };

     var ctrl = this;
    init();


    // function init
    function init() {

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
      $http.get('/api/d3/helpp/'+item).success(function(data) {
        console.log("\n\n\nWHASSUPUO OLA\n\n\n");
        ctrl.csv = data;
      });
      console.log("\n\n\nWHASSUPNO\n\n\n");
    }
  }
]);
