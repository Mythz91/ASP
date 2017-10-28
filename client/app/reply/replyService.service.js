angular.module("app.home")
.service("replyService",function($http,$q){
    this.getReplies = function(user,diss){
        var defer = $q.defer();
        $http({
            method : 'POST',
            data : {
                userName : user,
                topic : diss
            },
            url:'http://localhost:9000/api/v1/discussion/getReply',
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

});