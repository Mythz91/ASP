angular.module("app.home")
.service("prevService", ['$http', '$q','$window', function ($http, $q, $window) {
    this.getData = function () {
        var defer = $q.defer();
        $http({
            method: 'POST',
            url: 'http://localhost:9000/api/v1/getAppointments',
            data : {
                regNum : $window.localStorage.getItem("reg"),
                password: $window.localStorage.getItem("pass")
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }).success(function (data) {
            defer.resolve(data);
        }).error(function (err) {
            defer.reject(err);
        })
        return defer.promise;
    }
}])