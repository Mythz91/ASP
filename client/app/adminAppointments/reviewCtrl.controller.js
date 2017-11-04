angular
.module('app.home')

.controller('ReviewCtrlStart', ReviewCtrlStart)
var ReviewCtrlStart = function ($scope, $rootScope, $uibModalInstance, $window,appService,ReviewFactory) {
var data;
$scope.disp = false;
$scope.getData = function () {
    
   data = ReviewFactory.getData()
    $scope.userName =data.user;
    $scope.age =data.age;
    $scope.sext =data.sex;
    $scope.date =data.date;
    $scope.symptoms =data.symptoms;
    

}

$scope.close = function () {
    $scope.disp = false;
}
$scope.submitForm = function (review) {
    var data = {
        userName : data.user,
       age : data.age,
       sext : data.sex,
       date : data.date,
       symptoms : data.symptoms,
       regNum : data.reg,
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