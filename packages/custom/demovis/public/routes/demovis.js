'use strict';

angular.module('mean.demovis').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('demovis example page', {
      url: '/demovis/:responseID',
      templateUrl: 'demovis/views/newLayout.html'
    });
  }
]);
