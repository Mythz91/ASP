angular.module("app.home")
.service("discussionStartService", function ($http, $q) {
    this.startDiscussion = function (text) {
        var defer = $q.defer();
        $http({
            method: 'POST',
            data: text,
            headers: {
                'Content-Type': 'application/json'
            },
            url: 'http://localhost:9000/api/v1/discussion/'
        }).success(function (res) {
            defer.resolve(res);
        }).error(function (err) {
            defer.reject(err);
        })
        return defer.promise;
    }
});