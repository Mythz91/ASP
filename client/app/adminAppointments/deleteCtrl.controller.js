angular
.module('app.home')
.controller('deleteCtrl', deleteCtrl)
function deleteCtrl($scope, $rootScope, $uibModalInstance, deleteForm, $window,changeAppointmentService,appService){
$scope.close = function(){
  $uibModalInstance.close('closed');
}
$scope.delete = function(){
  console.log($rootScope.select);
changeAppointmentService.delete($rootScope.select).then(function(success){
  appService.getApp().then(function (res) {
    console.log(res);

    $rootScope.$emit("changesEdit",res);


   }, function (err) {


   })

},function(error){

})
  $uibModalInstance.close('closed');
}
}
