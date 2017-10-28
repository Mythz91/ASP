
angular.module("app.home")
    .service("updateInfo", ['$http', '$q', function ($http, $q) {
        this.update = function (text) {
            var defer = $q.defer();
            $http({
                method: 'POST',
                url: 'http://localhost:9000/api/v1/update/',
                data: text,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).success(function (res) {
                defer.resolve();
            }).error(function (err) {
                defer.reject();
            })
            return defer.promise
        }
    }])