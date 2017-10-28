angular
.module('app.home').controller("FormCtrl", FormCtrl)
var FormCtrl = function ($scope, $rootScope, $uibModalInstance, userForm, discussionStartService, DataService, $window) {
    
        $scope.form = {}
        $scope.submitForm = function (topic, discussion) {
    
            if (!topic || !discussion) {
    
                return 0;
            }
            console.log(topic, discussion);
            var text = {
                userName: $window.localStorage.getItem("user"),
                email: $window.localStorage.getItem("email"),
                post: topic,
                detail: discussion
            }
            discussionStartService.startDiscussion(text).then(function (success) {
                console.log(success);
                DataService.getData().then(function (data) {
                    console.log(data);
    
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