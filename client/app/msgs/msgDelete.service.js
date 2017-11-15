angular.module('app.home')
.service('MessageDeleteService', function ($http, $q, $window) {
    this.delete = function (topic, discussion, time) {
        var defer = $q.defer();

        var defer = $q.defer();
        $http({
            url: 'http://localhost:9000/api/v1/discussion/delete',
            data: {
                user: $window.sessionStorage.getItem("user"),
                topic: topic,
                discussion: discussion,
                time: time
            },
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }

        }).success(function (reply) {
            defer.resolve(reply);
        }).error(function (err) {
            defer.reject(err);
        })
        return defer.promise;
    }
})