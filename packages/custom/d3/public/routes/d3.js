'use strict';

//Main d3 angular route. Going to url: '/d3/result/:responseID'
// will render main d3 index
angular.module('mean.d3').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('d3 example page', {
      url: '/d3/result/:responseID',
      templateUrl: 'd3/views/index.html'
    });
  }

]);
