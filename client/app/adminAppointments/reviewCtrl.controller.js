angular
.module('app.home')

.controller('ReviewCtrlStart', ReviewCtrlStart)
var ReviewCtrlStart = function ($scope, $rootScope, $uibModalInstance, $window,appService,ReviewFactory) {
var val;
$scope.disp = false;
$scope.getData = function () {
    
   val = ReviewFactory.getData()
    $scope.userName =val.user;
    $scope.age =val.age;
    $scope.sext =val.sex;
    $scope.date =val.date;
    $scope.symptoms =val.symptoms;
    

}

$scope.close = function () {
    $scope.disp = false;
}
$scope.submitForm = function (review) {

    var data = {
        userName : val.user,
       age : val.age,
       sext : val.sex,
       date : val.date,
       symptoms : val.symptoms,
       regNum : val.reg,
       review :review
    } 
    appService.writeReview(data).then(function(success){
       
        $rootScope.review = true;
      
     
        },function(err){

       })
        $uibModalInstance.close('closed');

    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}