angular
    .module('app.home')
    .service("ReviewUploadService", ReviewUploadService)

function ReviewUploadService($http, $q) {
   

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
}