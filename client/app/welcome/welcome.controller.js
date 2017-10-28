var data, mail;

(function () {
    angular
        .module('app.home').controller("welcomeCtrl", welcomeCtrl)

    function welcomeCtrl($uibModal, DataService, $rootScope, $location, $window, $scope) {
        if (!$window.localStorage.getItem("auth-token")) {
            $location.path("/");
        }
        var vm = this;
        vm.userName = $window.localStorage.getItem("user");
        vm.pass = pass;
        vm.err = false;
        vm.discussion;
        vm.bool = false;
       $rootScope.$on("sentMail",function(event,data){
        vm.bool=data;
       
       })
       vm.closeAlert = function(){
          
           vm.bool=false;
       }
       vm.closeOne = function(){
        vm.err = false;
       }
        vm.reply = function (userName, topic) {
            $window.localStorage.setItem("to", userName);
            $window.localStorage.setItem("topic", topic);
            $location.path("/reply");

        }

        vm.getData = function () {
            DataService.getData().then(function (success) {

                vm.discussion = success;

            }, function (err) {

            });

        }

        $rootScope.$on('change', function (event, data) {
            vm.discussion = data;
        });

        vm.showForm = function () {
            vm.err = false;
            var modalInstance = $uibModal.open({
                templateUrl: 'templates/discussion-form.html',
                controller: FormCtrl,
                resolve: {
                    userForm: function () {
                        return vm.userForm;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                vm.selected = selectedItem;
            }, function () {
                vm.err = true;
            });
        };

        vm.email = function (userName, topic, email) {
            data = topic;
            mail = email;

            console.log(userName, topic, email);

            var modal = $uibModal.open({
                templateUrl: 'templates/email-form.html',
                controller: EmailCtrl,
                resolve: {

                    emailForm: function () {
                        return vm.emailForm;
                    }
                }

            })
        }
    }
})();




