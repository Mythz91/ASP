(function(){
  'use strict';

  angular.module('app', [
    'ngResource',
    'ui.router',
   'ngMessages',

     // 3rd Party Modules

     // Custom Modules
     'app.home'
  ])

  .config(config);

  function config($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider){
    $urlRouterProvider
      .otherwise('/');
    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('AuthInterceptor');
  }


})();