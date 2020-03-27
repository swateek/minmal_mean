'use strict';

angular.module('swateekApp')
.config(function ($stateProvider) {
  $stateProvider
  .state('/', {
    url: '/',
    controller: 'LoginCtrl',
    templateUrl: 'modules/app/login/login.html'
    //template: '<p>Beh!</p>'
  })
  .state('dashboard', {
    url: '/dashboard',
    //controller: 'DashboardCtrl',
    //templateUrl: 'modules/app/dashboard/dashboard.html',
    views: {
      '@':{
        templateUrl: 'modules/components/templates/template_1.html',
      },
      'content@dashboard':{
        templateUrl: 'modules/app/dashboard/dashboard.html',
        controller: 'DashboardCtrl'
      }
    },
    data: {
      displayName: 'Dashboard'
    }
  })
});