(function () {
    angular
        .module('app.home')
        .controller('MessageCtrl', MessageCtrl)

    function MessageCtrl(MessageService, MessageDeleteService, $location, $window) {

        if (!$window.sessionStorage.getItem("auth-token")) {
            $location.path("/");
        }
        var vm = this;
        vm.disp=true;
        vm.show=false;
        vm.data;
        vm.empty="";
        vm.getData = function () {
            MessageService.getData().then(function (success) {
               
                vm.data = success;
            }, function (err) {

            })
        }
        vm.delete = function (topic, discussion, time) {
            vm.data=null;
            MessageDeleteService.delete(topic, discussion, time).then(function (success) {
               
              if(success=="1"){
                vm.disp=false;
                vm.show=true;
                vm.empty="No discussions available";
              }

              vm.getData();

            }, function (err) {

            })
        }

    }
})();

