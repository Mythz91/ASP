
    angular
    .module('app.home')
    .service("UserService", function ($http, $q) {

        this.login = function (regNum, password, URL) {
          
            var defer = $q.defer();
            $http({
                url: URL + 'login',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    user: regNum,
                    pass: password
                }
            }).success(function (data) {
             
                defer.resolve(data);
            }).error(function (err) {
               
                defer.reject(err);
            })
            return defer.promise;
        }

        
    })