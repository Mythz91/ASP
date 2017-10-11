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
       
      })
      .state('welcome',{
        url:'/welcome',
        templateUrl : 'app/welcome/welcome.html',
        controller:'welcomeCtrl as vm'
      })
      .state('appointment',{
        url:'/appointment',
        templateUrl:'app/appointment/appointment.html',
        controller:'appointmentCtrl as appoint'
      })
      .state("previous",{
        url:"/previous",
        templateUrl:'app/previousAppointments/previous.html',
        controller:'previousController as data'
      })
      .state('update',{
        url:'/update',
        templateUrl:'app/update/update.html',
        controller:'updateCtrl as vm'
      })

  }
})();