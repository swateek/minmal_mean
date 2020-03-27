'use strict';

angular.module('swateekApp')
  .controller('DashboardCtrl',
  ['$scope', '$http', '$location', 'Auth',
  function ($scope, $http, $location, Auth) {
    // Session validity
    Auth.isValidSession();
  }
]);
