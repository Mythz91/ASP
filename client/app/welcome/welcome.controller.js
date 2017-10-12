
  (function(){angular
  .module('app.home').controller("welcomeCtrl", welcomeCtrl) 

    function welcomeCtrl($uibModal ) {
        var vm = this;
        vm.userName = data;
        vm.pass=pass;
        vm.err="";
        vm.showForm = function () {
            vm.err="";
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
               vm.err="You can either check discussions or start one!";
            });
        };
            }
  })();

var FormCtrl = function ($scope, $uibModalInstance, userForm) {
 
    $scope.form = {}
    $scope.submitForm = function (topic,discussion) {
        console.log(topic,discussion);
      
          $uibModalInstance.close('closed');
       
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
};