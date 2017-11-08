angular.module("app.home")
.controller("reqCtrl",reqCtrl)
function reqCtrl(reqService){
    var vm = this;
    vm.getData = function(){
        reqService.getDrugs()
    }

}