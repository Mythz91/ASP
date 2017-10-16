(function () {
    angular
        .module('app.home')
        .controller('MessageCtrl', MessageCtrl)
        function MessageCtrl(MessageService,$location,$window){
            if(!$window.localStorage.getItem("auth-token")){
                $location.path("/");
            }
            var vm = this;
            vm.getData=function(){
                MessageService.getData().then(function(success){

                }, function(err){

                })
            }

        }
    })();
    angular
    .module('app.home')
        .service('MessageService', function($http,$q,$window){
            this.getData=function(){
                var defer = $q.defer();
                $http({
                    url:'http://localhost:9000/api/v1/discussion/messages',
                    data:{
                        regNum : $window.localStorage.getItem("reg"),
                        password: $window.localStorage.getItem("pass")
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