(function(){

 angular
    .module('app.home')
   
    .controller('adminCtrl', adminCtrl);
    function adminCtrl($location,$window) {
        if(!$window.localStorage.getItem("auth-token")){
            $location.path("/");
        }
    }
})();
