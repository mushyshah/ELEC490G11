'use strict';

angular.module('mean.d3').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('d3 example page', {
      url: '/d3/example/:responseID',
      templateUrl: 'd3/views/pagelayout2.html'
    });
  }

]);
