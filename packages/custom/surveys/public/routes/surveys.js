'use strict';

angular.module('mean.surveys').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('surveys example page', {
      url: '/newSurvey',
      templateUrl: 'surveys/views/index.html'
    });
  }
]);
