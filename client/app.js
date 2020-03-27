var app = angular.module('swateekApp', ['ui.router', 'ngCookies', 'ngResource']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider){
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
});

app.factory('authInterceptor', ['$rootScope', '$q', '$cookieStore', '$location', 
    function ($rootScope, $q, $cookieStore, $location) {
        return {
            "request": function(config){
                config.headers = config.headers || {};
                if ($cookieStore.get('token')) {
                    config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
                }
                return config;
            },

            "responseError": function(response) {
                if(response.status === 401){
                  $location.path('/login');
                  $cookieStore.remove('token'); // remove any stale tokens
                  return $q.reject(response);
                }else{
                  return $q.reject(response);
                }
            }
        }
    }
]);

app.run(
    function($rootScope, $location, $http, $cookies, $state, $q, $timeout){
        console.log("App Run!");
    }
);