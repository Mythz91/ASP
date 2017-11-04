(function(){
  'use strict';

  angular.module('app', [
    'ngResource',
    'ui.router',
   'ngMessages',
   'ui.bootstrap',
   'uiGmapgoogle-maps',
 
   'ngMessages',
   'ngAnimate',
   'file-model',
     // 3rd Party Modules

     // Custom Modules
     'app.home'
  ])
  
  .config(config);

  function config($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider,uiGmapGoogleMapApiProvider){
    $urlRouterProvider
      .otherwise('/');
    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('AuthInterceptor');
    uiGmapGoogleMapApiProvider.configure({
      china: true
  });
  }


})();