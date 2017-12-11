angular
.module('app.home')
.service('docService', ['$http', '$q', function ($http, $q) {

  this.getData = function(text){
  var defer = $q.defer();
  $http({
    method: 'POST',
    data:text,
    url: 'http://localhost:9000/api/v1/doctors/getData',

  }).success(function (result) {
    defer.resolve(result);
}).error(function (err) {
    defer.resolve(err)
})
return defer.promise;
  }
  this.getNames = function(text){
    var defer = $q.defer();
    $http({
      method: 'POST',
      data:text,
      url: 'http://localhost:9000/api/v1/doctors/getNames',

    }).success(function (result) {
      defer.resolve(result);
  }).error(function (err) {
      defer.resolve(err)
  })
  return defer.promise;
    }
  this.getDetails=function(text){
    var defer = $q.defer();
    $http({
      method: 'POST',
      data:text,
      url: 'http://localhost:9000/api/v1/doctors/getDetails',

    }).success(function (result) {
      defer.resolve(result);
  }).error(function (err) {
      defer.resolve(err)
  })
  return defer.promise;
  }
  this.updateDetails = function(text){
    var defer = $q.defer();
    $http({
      method: 'POST',
      data:text,
      url: 'http://localhost:9000/api/v1/doctors/update',

    }).success(function (result) {
      defer.resolve(result);
  }).error(function (err) {
      defer.resolve(err)
  })
  return defer.promise;
  }

}])
