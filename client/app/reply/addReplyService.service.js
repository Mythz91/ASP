angular.module("app.home")
.service("addReplyService",function($http,$q){
    this.addReply = function(text){
        var defer = $q.defer();
        $http({
            method : 'POST',
            data : text,
            url:'http://localhost:9000/api/v1/discussion/addReply',
            headers :{
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