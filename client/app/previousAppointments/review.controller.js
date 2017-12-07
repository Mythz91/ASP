angular
.module('app.home')
.controller('ReviewCtrl', ReviewCtrl)
function ReviewCtrl($scope, $rootScope, $uibModalInstance, review,  prevService, $window,dataFactory){
    $scope.review="";

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

            $scope.review=success.review;

        }



    }, function(err){

    })

}
}
