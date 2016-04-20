'use strict';

//Main surveys route. /newSurvey creates new survey on index.html
angular.module('mean.surveys').config(['$stateProvider', '$viewPathProvider',
  function($stateProvider, $viewPathProvider) {
    $stateProvider.state('surveys example page', {
      url: '/newSurvey',
      templateUrl: 'surveys/views/index.html'
    });

  }
]);
