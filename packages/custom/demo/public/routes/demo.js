'use strict';

angular.module('mean.surveys').config(['$stateProvider', '$viewPathProvider',
  function($stateProvider, $viewPathProvider) {
    $stateProvider.state('surveys example page', {
      url: '/demo',
      templateUrl: 'demo/views/index.html'
    });

    //$viewPathProvider.override('system/views/index.html', 'surveys/views/index.html');

  }
]);