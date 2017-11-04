
angular.module("app.home")
.service("DataService", function ($http, $q) {


    this.getData = function () {
        var defer = $q.defer();
        $http({
            method: 'GET',
            url: 'http://localhost:9000/api/v1/discussion/getData'
        }).success(function (res) {
            defer.resolve(res);
        }).error(function (err) {
            defer.reject(err);
        })
        return defer.promise;
    }


})