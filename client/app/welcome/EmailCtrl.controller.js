angular
.module('app.home').controller("EmailCtrl", EmailCtrl)
var EmailCtrl = function ($scope, $rootScope, $uibModalInstance, emailForm, emailService, $window) {
    $scope.form = {}
    $scope.mail;
    $scope.topic;
    $scope.getData = function () {
        $scope.mail = mail;
        $scope.topic = data;
    }
    $scope.submitForm = function (email, topic, data) {
      
        if(data==undefined){
            $scope.cancel();
        }
        else{
            var text = {
                to : email,
                sub:" In response to the discussion: "+topic,
                content:data,
                from :$window.sessionStorage.getItem("user")+" mail at :" +$window.sessionStorage.getItem("email") 
            }
            
            emailService.sendMail(text).then(function(success){
              $rootScope.$emit("sentMail",true);
                            }, function(error){
                               
                            });
        }
        $uibModalInstance.close('closed');
    }
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}
