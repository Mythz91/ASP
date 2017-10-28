angular
.module('app.home')
.service('MessageService', function ($http, $q, $window) {
    console.log("here");
    this.getData = function () {
        var defer = $q.defer();
        $http({
            url: 'http://localhost:9000/api/v1/discussion/messages',
            data: {
                user: $window.localStorage.getItem("user"),

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