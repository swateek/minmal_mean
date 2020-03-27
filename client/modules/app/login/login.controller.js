'use strict';

angular.module('swateekApp')
  .controller('LoginCtrl',
  ['$scope', '$http', '$location', 'Auth', '$state',
  function ($scope, $http, $location, Auth, $state) {
    $scope.login = function(form){
      //console.dir(form, {depth: null});
      // console.log($scope.user_email);
      // console.log($scope.user_password);

      Auth.login({
        email: $scope.user_email,
        password: $scope.user_password
      }).then(function(){
        $state.go('dashboard');
      }).catch(function(err) {
        $scope.errors.other = err.message;
      });
    }
  }
]);
