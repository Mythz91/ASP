(function () {
    angular
        .module('app.home')
        .controller('previousController', previous)

    function previous(prevService) {
        var previous = this;
        previous.appointments;
        previous.show=false;
        previous.hide = true;
        previous.getData = function () {

            prevService.getData().then(function (res) {
              console.log(res);
                previous.show=true;
                previous.hide=false;
                previous.appointments = res;

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
                method: 'POST',
                url: 'http://localhost:9000/api/v1/getAppointments',
                data : {
                    regNum : reg,
                    password: pass
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