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
    $scope.symptoms =val.symp;
    

}

$scope.close = function () {
    $scope.disp = false;
}
$scope.submitForm = function (review,drugs) {

var drug=[];
if(!drugs){
    drug.push("no drugs prescribed");
}

else if(drugs.includes(" ")){
    drug=drugs.split(" ");
}
else if(drugs){
    drug.push(drugs);
}

    var data = {
        userName : val.user,
       age : val.age,
       sext : val.sex,
       date : val.date,
       symptoms : val.symp,
       regNum : val.reg,
       review :review,
       drugs:drug
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