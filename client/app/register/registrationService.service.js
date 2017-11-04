
    angular
    .module('app.home')
        .service("RegistrationService",function($http,$q){
            this.register = function(text,URL){
                var defer = $q.defer();
                $http({
                    url : URL+"register",
                    method:'POST',
                    data : text,
                    headers : {
                        'Content-Type': 'application/json'
                    }
                }).success(function(data){
                    defer.resolve(data);
                }).error(function(err){
                    defer.reject(err);
                })
                return defer.promise;
            }
           
        })