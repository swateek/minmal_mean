'use strict';

angular.module('swateekApp')
.factory('Auth', ['$location', '$http', '$cookieStore', '$q', 'User',
function Auth($location, $http, $cookieStore, $q, User) {
  var currentUser = {};
  if($cookieStore.get('token')) {
    currentUser = User.get();
  }

  return {

    /**
    * Authenticate user and save token
    */
    login: function(params, callback) {
      var cb = callback || angular.noop;
      var deferred = $q.defer();

      $http.post('/auth/local', {
        email: params['email'],
        password: params['password']
      }).
      success(function(data) {
        $cookieStore.put('token', data.token);
        currentUser = User.get();
        deferred.resolve(data);
        return cb();
      }).
      error(function(err) {
        this.logout();
        deferred.reject(err);
        return cb(err);
      }.bind(this));

      return deferred.promise;
    },

    /**
    * Delete access token and user info
    */
    logout: function() {
      $cookieStore.remove('token');
      currentUser = {};
    },

    /**
    * Create a new user
    */
    createUser: function(user, callback) {
      var cb = callback || angular.noop;

      return User.save(user,
        function(data) {
          $cookieStore.put('token', data.token);
          currentUser = User.get();
          return cb(user);
        },
        function(err) {
          this.logout();
          return cb(err);
        }.bind(this)).$promise;
      },

      /**
      * Change password
      */
      changePassword: function(oldPassword, newPassword, callback) {
        var cb = callback || angular.noop;

        return User.changePassword({ id: currentUser._id }, {
          oldPassword: oldPassword,
          newPassword: newPassword
        }, function(user) {
          return cb(user);
        }, function(err) {
          return cb(err);
        }).$promise;
      },

      /**
      * Gets all available info on authenticated user
      */
      getCurrentUser: function() {
        return currentUser;
      },

      /**
      * Check if a user is logged in
      *
      * @return {Boolean}
      */
      isLoggedIn: function() {
        //return currentUser.hasOwnProperty('role');
        if($cookieStore.get('token') != undefined){
          return true;
        }else{
          return false;
        }
      },

      isValidSession: function(){
        if($cookieStore.get('token') != undefined){
          return true;
        }else{
          $location.url('/logout');
        }
      },

      /**
      * Waits for currentUser to resolve before checking if user is logged in
      */
      isLoggedInAsync: function(cb) {
        if(currentUser.hasOwnProperty('$promise')) {
          currentUser.$promise.then(function() {
            cb(true);
          }).catch(function() {
            cb(false);
          });
        } else if(currentUser.hasOwnProperty('role')) {
          cb(true);
        } else {
          cb(false);
        }
      },

      /**
      * Check if a user is an admin
      *
      * @return {Boolean}
      */
      isAdmin: function() {
        return currentUser.role === 'admin';
      },

      /**
      * Get auth token
      */
      getToken: function() {
        return $cookieStore.get('token');
      }
    };
  }]);
