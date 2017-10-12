var details;
  (function(){angular
  .module('app.home').controller("welcomeCtrl", welcomeCtrl) 

    function welcomeCtrl($uibModal, DataService ) {
        var vm = this;
        vm.userName = data;
        vm.pass=pass;
        vm.err="";
        vm.discussions = details;
        vm.getData = function(){
            DataService.discussions();
        }
        vm.showForm = function () {
            vm.err="";
            var modalInstance = $uibModal.open({
                templateUrl: 'templates/discussion-form.html',
                controller: FormCtrl,
               resolve: {
                    userForm: function () {
                        return vm.userForm;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                vm.selected = selectedItem;
            }, function () {
               vm.err="You can either check discussions or start one!";
            });
        };
            }
  })();

var FormCtrl = function ($scope, $uibModalInstance, userForm,discussionStartService,DataService) {
 
    $scope.form = {}
    $scope.submitForm = function (topic,discussion) {
        if(!topic || !discussion){
            DataService.discussions();
            return 0;
        }
        console.log(topic,discussion);
        var text ={
            userName :data,
            post : topic,
            detail : discussion
        }
        discussionStartService.startDiscussion(text).then(function(success){
            console.log(success);
            DataService.discussions();
        },function(err){

        });
          $uibModalInstance.close('closed');
       
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
};

angular.module("app.home")
    .service("discussionStartService",function($http,$q){
        this.startDiscussion = function(text){
            var defer = $q.defer();
            $http({
                method : 'POST',
                data : text,
                headers :{
                    'Content-Type': 'application/json'
                },
                url: 'http://localhost:9000/api/v1/discussion/'
            }).success(function(res){
                defer.resolve(res);
            }).error(function(err){
                defer.reject(err);
            })
            return defer.promise;
        }
    });

    angular.module("app.home")
        .service("DataService",function($http,$q){
            var service = this;
            service.discussions = function(){
                service.getData().then(function(success){
                console.log(success);
                details=success;
                
            },function(err){

            });
        },
        service.getData = function(){
                var defer = $q.defer();
                $http({
                    method : 'GET',
                    url: 'http://localhost:9000/api/v1/discussion/getData'
                }).success(function(res){
                    defer.resolve(res);
                }).error(function(err){
                    defer.reject(err);
                })
                return defer.promise;
            }

        })