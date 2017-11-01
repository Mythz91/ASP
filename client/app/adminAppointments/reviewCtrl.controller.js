angular
    .module('app.home')

    .controller('reviewCtrl', reviewCtrl);
var reviewCtrl = function ($scope, $rootScope, $uibModalInstance, $window, ReviewUploadService) {
    $scope.file = null;
    $scope.disp = false;
    $scope.getData = function () {
        $scope.userName = $rootScope.userDetails.user;
        $scope.age = $rootScope.userDetails.age;
        $scope.sext = $rootScope.userDetails.sex;
        $scope.date = $rootScope.userDetails.date;
        $scope.symptoms = $rootScope.userDetails.symptoms;

    }

    $scope.validateFile = function (review,file,data) {
       if(file == undefined|| file == null){
         
        data.review = review;
       ReviewUploadService.writeReview(data).then(function(success){
        $rootScope.review = true;
        },function(err){

       })
           $uibModalInstance.close('closed');
           return false;
       }
       else if (file.type != "application/pdf") {
            $scope.disp = true;

            return false;

        }
        return true;
    }
    $scope.close = function () {
        $scope.disp = false;
    }
    $scope.submitForm = function (review, file) {
        var data = {
            userName : $rootScope.userDetails.user,
           age : $rootScope.userDetails.age,
           sext : $rootScope.userDetails.sex,
           date : $rootScope.userDetails.date,
           symptoms : $rootScope.userDetails.symptoms,
           regNum : $rootScope.userDetails.reg
        } 
        if ($scope.validateFile(review,file,data)) {
            $scope.file = file;
          
            var objArr=[];
            objArr.push(data);
            file.extra = data;
            ReviewUploadService.upload(file).then(function(success){

            },function(error){

            })   
            $uibModalInstance.close('closed');

        };
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
}