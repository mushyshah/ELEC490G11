'use strict';

angular.module('mean.surveys').config(['$stateProvider', '$viewPathProvider',
  function($stateProvider, $viewPathProvider) {
    $stateProvider.state('surveys example page', {
      url: '/newSurvey',
      templateUrl: 'surveys/views/index.html'
    });

    //$viewPathProvider.override('system/views/index.html', 'surveys/views/index.html');

  }
]);
