angular
.module('app.home').controller("FormCtrl", FormCtrl)
var FormCtrl = function ($scope, $rootScope, $uibModalInstance, userForm, discussionStartService, DataService, $window) {
    
        $scope.form = {}
        $scope.submitForm = function (topic, discussion) {
    
            if (!topic || !discussion) {
    
                return 0;
            }
       
            var text = {
                userName: $window.sessionStorage.getItem("user"),
                email: $window.sessionStorage.getItem("email"),
                post: topic,
                detail: discussion
            }
            discussionStartService.startDiscussion(text).then(function (success) {
             
                DataService.getData().then(function (data) {
                  
    
                    $rootScope.$emit("change", data);
    
                }, function (err) {
    
                });
            }, function (err) {
    
            });
            $uibModalInstance.close('closed');
    
        };
    
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    };