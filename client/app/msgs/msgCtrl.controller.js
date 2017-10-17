(function () {
    angular
        .module('app.home')
        .controller('MessageCtrl', MessageCtrl)
        function MessageCtrl(MessageService,MessageDeleteService,$location,$window){
           
          
            if(!$window.localStorage.getItem("auth-token")){
                $location.path("/");
            }
            var vm = this;
            vm.data;
            vm.getData=function(){
                MessageService.getData().then(function(success){
                    console.log('Here')
                    console.log(success);
                   vm.data = success;
                }, function(err){

                })
            }
            vm.delete=function(topic,discussion,time){
               
                MessageDeleteService.delete(topic,discussion,time).then(function(success){
                    console.log(success);
                    console.log('Here')
                    MessageService.getData().then(function(success){
                        console.log('Here')
                        console.log(success);
                       vm.data = success;
                    }, function(err){
    
                    })
                  
                }, function(err){

                })
            }

        }
    })();
    angular.module('app.home')
        .service('MessageDeleteService',function($http,$q,$window){
            this.delete = function(topic,discussion,time){
                var defer = $q.defer();

                var defer = $q.defer();
                $http({
                    url:'http://localhost:9000/api/v1/discussion/delete',
                    data:{
                        user : $window.localStorage.getItem("user"),
                        topic:topic,
                        discussion:discussion,
                        time:time
                    },
                    method:'POST',
                    headers:{
                        'Content-Type': 'application/json'
                    }

                }).success(function(reply){
                    defer.resolve(reply);
                }).error(function(err){
                    defer.reject(err);
                })
                return defer.promise;
            }
        })
    angular
    .module('app.home')
        .service('MessageService', function($http,$q,$window){
            this.getData=function(){
                var defer = $q.defer();
                $http({
                    url:'http://localhost:9000/api/v1/discussion/messages',
                    data:{
                        user : $window.localStorage.getItem("user"),
                       
                    },
                    method:'POST',
                    headers:{
                        'Content-Type': 'application/json'
                    }

                }).success(function(reply){
                    defer.resolve(reply);
                }).error(function(err){
                    defer.reject(err);
                })
                return defer.promise;
            }
        })