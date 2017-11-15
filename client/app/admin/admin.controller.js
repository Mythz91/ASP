(function(){

 angular
    .module('app.home')
   
    .controller('adminCtrl', adminCtrl);
    function adminCtrl($location,$window) {
        if(!$window.sessionStorage.getItem("auth-token")){
            $location.path("/");
        }
    }
})();
