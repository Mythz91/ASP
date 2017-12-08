angular.module("app.home")
.service("changeAppointmentService", ['$http', '$q','$window', function ($http, $q, $window) {
  this.changeAppointment = function(text){

    var defer = $q.defer();
    $http({
        method: 'POST',
        url: 'http://localhost:9000/api/v1/appointment/changeAppointmentDate',
        data : text,
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
this.delete = function(text){

  var defer = $q.defer();
  $http({
      method: 'POST',
      url: 'http://localhost:9000/api/v1/appointment/dropAppointment',
      data : text,
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
