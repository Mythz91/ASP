
angular.module("app.home")
.service("emailService", function ($http, $q) {
    var service = this;
    this.sendMail = function(text){
        if (!text) {
                return 0;
                    }
       var defer = $q.defer();
       $http({
        method: 'POST',
        data: text,
        headers: {
            'Content-Type': 'application/json'
        },
        url: 'http://localhost:9000/api/v1/discussion/mail'
    }).success(function (res) {
        defer.resolve(res);
    }).error(function (err) {
        defer.reject(err);
    })
    return defer.promise;
   
    }
});