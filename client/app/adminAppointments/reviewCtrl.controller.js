angular
.module('app.home')

.controller('reviewCtrl', reviewCtrl);
var reviewCtrl = function ($scope, $rootScope, $uibModalInstance, $window, ReviewUploadService) {

$scope.disp = false;
$scope.getData = function () {
    console.log("here")
    $scope.userName = $rootScope.userDetails.user;
    $scope.age = $rootScope.userDetails.age;
    $scope.sext = $rootScope.userDetails.age;
    $scope.date = $rootScope.userDetails.date;
    $scope.symptoms = $rootScope.userDetails.symptoms;
    console.log($rootScope.userDetails.user,$rootScope.userDetails.age,$rootScope.userDetails.age)

}

$scope.close = function () {
    $scope.disp = false;
}
$scope.submitForm = function (review) {
    var data = {
        userName : $rootScope.userDetails.user,
       age : $rootScope.userDetails.age,
       sext : $rootScope.userDetails.sex,
       date : $rootScope.userDetails.date,
       symptoms : $rootScope.userDetails.symptoms,
       regNum : $rootScope.userDetails.reg,
       review :review
    } 
    ReviewUploadService.writeReview(data).then(function(success){
        $rootScope.review = true;
        },function(err){

       })
        $uibModalInstance.close('closed');

    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}
