(function(){
  'use strict';

  angular
    .module('app.home')
    .config(config);

  function config($stateProvider) {

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/home/home.html',
        controller: 'HomeCtrl as vm'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'templates/redirect.html',
        
      })
      .state('getLogin',{
        url:'/getLogin',
        templateUrl:'app/login/login.html',
        controller : 'getLogin as vm'
      })
      .state('register',{
        url:'/register',
        templateUrl:'app/register/register.html',
        controller:'registerCtrl as vm'
      })
      .state('about', {
        url: '/about',
        templateUrl: 'templates/about.html'
       
      });
  }
})();