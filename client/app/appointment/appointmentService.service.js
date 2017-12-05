angular.module("app.home")
.service("appointmentService", ['$http', '$q', function ($http, $q) {
    this.createAppointment = function (text) {
        var defer = $q.defer();
        $http({
            method: 'POST',
            data: text,
            url: 'http://localhost:9000/api/v1/appointment/appointment',
            headers: {
                'Content-Type': 'application/json'
            }
        }).success(function (result) {
            defer.resolve(result);
        }).error(function (err) {
            defer.resolve(err)
        })
        return defer.promise;
    }
    this.getDocDetails = function(){
        var defer = $q.defer();
        $http({
            method:'GET',
            url : 'http://localhost:9000/api/v1/docs/getList'
        }).success(function (result) {
       
            defer.resolve(result);

        }).error(function (err) {
            defer.resolve(err)
        })
        return defer.promise;
    }
    this.docTime = function(text){
        var defer = $q.defer();
        $http({
            method: 'POST',
            data: text,
            url: 'http://localhost:9000/api/v1/docs/getTime',
            headers: {
                'Content-Type': 'application/json'
            }
        }).success(function (result) {
            defer.resolve(result);
        }).error(function (err) {
            defer.resolve(err)
        })
        return defer.promise;

    }
}]);