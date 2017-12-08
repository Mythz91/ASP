angular
.module('app.home')
.controller('deleteCtrl', deleteCtrl)
function deleteCtrl($scope, $rootScope, $uibModalInstance, deleteForm, $window,changeAppointmentService,appService){
$scope.close = function(){
  $uibModalInstance.close('closed');
}
$scope.delete = function(){

changeAppointmentService.delete($rootScope.select).then(function(success){
  appService.getApp().then(function (res) {


    $rootScope.$emit("changesEdit",res);


   }, function (err) {


   })

},function(error){

})
  $uibModalInstance.close('closed');
}
}
