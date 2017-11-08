angular
.module('app.home')
.controller('ReviewCtrl', ReviewCtrl)
function ReviewCtrl($scope, $rootScope, $uibModalInstance, review,  prevService, $window,dataFactory){
    $scope.review="";
    $scope.drug;
    $scope.show=false;
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
$scope.getReview = function(){
    prevService.getReview(dataFactory.getData()).then(function(success){
       
        if(success.review==""){
            $scope.review="There are no review updates";
        }else{
            $scope.show=true;
        console.log(success);
            $scope.review=success.review;
            $scope.drug=success.drugs;
        }
      
       

    }, function(err){
        
    })

}
}