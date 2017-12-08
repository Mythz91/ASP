angular
.module('app.home')
.controller('DeleteAppCtrl', DeleteAppCtrl)
function DeleteAppCtrl($scope, $rootScope, $uibModalInstance, deleteForm, $window,changeAppointmentService,prevService){
$scope.close = function(){
  $uibModalInstance.close('closed');
}
$scope.delete = function(){

changeAppointmentService.delete($rootScope.select).then(function(success){
  prevService.getData().then(function (res) {


    $rootScope.$emit("change4",res);


   }, function (err) {


   })

},function(error){

})
  $uibModalInstance.close('closed');
}
}
