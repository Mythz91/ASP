angular
.module('app.home')

.controller('introCtrl', introCtrl);
function introCtrl($location,$window) {
    if(!$window.sessionStorage.getItem("auth-token")){
        $location.path("/");
    }
    var vm = this;
    vm.name=$window.sessionStorage("user");
}
