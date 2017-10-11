(function () {
    angular
        .module('app.home')
        .controller('previousController', previous)

    function previous(prevService) {
        var previous = this;
        previous.appointments;
        previous.getData = function () {

            prevService.getData().then(function (data) {
                console.log(data);
                previous.appointments = data;

            }, function (err) {
                console.log(err);
            })
        }


    };
})();



angular.module("app.home")
    .service("prevService", ['$http', '$q', function ($http, $q) {
        this.getData = function () {
            var defer = $q.defer();
            $http({
                method: 'GET',
                url: 'http://localhost:9000/getAppointments/'

            }).success(function (data) {
                defer.resolve(data);
            }).error(function (err) {
                defer.reject(err);
            })
            return defer.promise;
        }
    }])