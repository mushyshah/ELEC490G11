'use strict';

angular.module('mean.demo').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('demo example page', {
      url: '/demo',
      templateUrl: 'demo/views/index2.html'
    });
  }
]);
