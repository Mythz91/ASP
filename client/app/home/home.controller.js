(function(){
  'use strict';

  angular
    .module('app.home')
   
    .controller('HeaderCtrl', HeaderCtrl);

    HeaderCtrl.$inject = ['$location'];

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
