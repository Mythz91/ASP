
angular
.module('app.home')
.service("appService", appService)

function appService($http, $q) {
this.getApp = function () {
    var defer = $q.defer();
    $http({
        method: 'GET',
        url: 'http://localhost:9000/api/v1/schedule'

    }).success(function (res) {
        defer.resolve(res)
    }).error(function (err) {
        defer.reject(err)
    })
    return defer.promise;
}

this.sendMail = function (text) {
    var defer = $q.defer();
    $http({
        method: 'POST',
        url: 'http://localhost:9000/api/v1/schedule/remind',
        data: text,
        headers: {
            'Content-Type': 'application/json'
        }

    }).success(function (res) {
        defer.resolve(res)
    }).error(function (err) {
        defer.reject(err)
    })
    return defer.promise;
}
this.deleteApp = function (text) {
    var defer = $q.defer();
    $http({
        method: 'POST',
        url: 'http://localhost:9000/api/v1/schedule/delete',
        data: text,
        headers: {
            'Content-Type': 'application/json'
        }
    }).success(function (res) {
        defer.resolve(res)
    }).error(function (err) {
        defer.reject(err)
    })
    return defer.promise;

}
this.editAppointment=function(text){
    var defer = $q.defer();
    $http({
        method: 'POST',
        url: 'http://localhost:9000/api/v1/schedule/editApp',
        data: text,
        headers: {
            'Content-Type': 'application/json'
        }
    }).success(function (res) {
        defer.resolve(res)
    }).error(function (err) {
        defer.reject(err)
    })
    return defer.promise;


}
this.writeReview = function (text) {
    var defer = $q.defer();
    $http({
        method: 'POST',
        url: 'http://localhost:9000/api/v1/review/review',
        data: text,
        headers: {
            'Content-Type': 'application/json'
        }

    }).success(function (res) {
        defer.resolve(res)
    }).error(function (err) {
        defer.reject(err)
    })
    return defer.promise;


}

this.findReview = function(text){
    var defer = $q.defer();
    $http({
        method: 'POST',
        url: 'http://localhost:9000/api/v1/review/checkReview',
        data: text,
        headers: {
            'Content-Type': 'application/json'
        }

    }).success(function (res) {
        defer.resolve(res)
    }).error(function (err) {
        defer.reject(err)
    })
    return defer.promise;


}
}