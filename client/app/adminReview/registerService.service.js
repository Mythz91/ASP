angular
.module('app.home')

.service('registerService', registerService);

function registerService($http, $q){
    this.getData = function(){
        var defer = $q.defer();
        $http({
            method:'GET',
            url:'http://localhost:9000/api/v1/review/'
        }).success(function(data){
            defer.resolve(data);
        }).error(function(err){
            defer.reject(err);
        })
        return defer.promise;
    }
    this.getReviews = function(text){
        var defer = $q.defer();
        $http({
            method:'POST',
            url:'http://localhost:9000/api/v1/review/getReviews',
            data : text,
            headers:{
                'Content-Type': 'application/json' 
            }
        }).success(function(data){
            defer.resolve(data);
        }).error(function(err){
            defer.reject(err)
        })
        return defer.promise;
    }
}