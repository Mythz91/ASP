(function(){
  'use strict';

  angular
    .module('app.home')
    .controller('HomeCtrl', HomeCtrl)
    .controller('HeaderCtrl', HeaderCtrl);;

    HomeCtrl.$inject = ['$http'];
    HeaderCtrl.$inject = ['$location'];

    function HomeCtrl($http){

      var self = this;
      self.service = null;

      init();

      function init(){
        $http.get('/api/v1/home').success(function(data){
          self.service = data
        })
      }

    }

    function HeaderCtrl($location){
      var vm = this;
      vm.getClass = getClass;

      function getClass(path){
        if ($location.path().substr(0, path.length) === path) {
            return 'active';
          } else {
            return '';
          }
      }
    }

})();
