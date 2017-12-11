(function(){
  'use strict';

  angular
    .module('app.home')
    .config(config);

  function config($stateProvider, dateProvider) {
    var time =(dateProvider.$get().showDate());
    if(time>0 && time <12){
      dateProvider.setGreet("Good Morning!");
    }else if(time>=12 && time < 17){
      dateProvider.setGreet("Good After-Noon!");
    }else{
      dateProvider.setGreet("Good Evening!");
    }

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/home/home.html',

      })
      .state('login', {
        url: '/login',
        templateUrl: 'templates/redirect.html',

      })
      .state('msgs',{
        url:'/msgs',
        templateUrl:'app/msgs/msg.html',
        controller:'MessageCtrl as vm'

      })
      .state('getLogin',{
        url:'/getLogin',
        templateUrl:'app/login/login.html',
        controller : 'getLogin as vm'
      })
      .state('admin',{
        url:'/admin',
        templateUrl:'app/admin/admin.html',
        controller:'adminCtrl as vm'
      })

      .state('app',{
        url:'/app',
        templateUrl:'app/adminAppointments/appointmentsHistory.html',
        controller:'appCtrl as vm'
      })
      .state('review',{
        url:'/review',
        templateUrl:'app/adminReview/review.html',
        controller:'reviewCtrl as vm'
      })
      .state('register',{
        url:'/register',
        templateUrl:'app/register/register.html',
        controller:'registerCtrl as vm'
      })
      .state('about', {
        url: '/about',
        templateUrl: 'app/about/about.html',
        controller:'aboutCtrl'

      })

      .state('welcome',{
        url:'/welcome',
        templateUrl : 'app/welcome/welcome.html',
        controller:'welcomeCtrl as vm'
      })

      .state("reply",{
        url:'/reply',
        templateUrl:'app/reply/reply.html',
        controller:'replyCtrl as vm'
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

      .state('doctor',{
        url:'/doctor',
        templateUrl : 'app/doc/doctor.html',
        controller:'docCtrl as vm'

      })
      .state('intro',{
        url:'/intro',
        templateUrl : 'app/doc/intro.html',
        controller:'intro as vm'

      })

  }
})();
