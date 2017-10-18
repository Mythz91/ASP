(function () {
    angular
        .module('app.home').controller("welcomeCtrl", welcomeCtrl)

    function welcomeCtrl($uibModal, DataService, $rootScope, $location, $window) {
        if (!$window.localStorage.getItem("auth-token")) {
            $location.path("/");
        }
        var vm = this;
        vm.userName = $window.localStorage.getItem("user");
        vm.pass = pass;
        vm.err = "";
        vm.discussion;
        vm.reply = function (userName, topic) {
            $window.localStorage.setItem("to", userName);
            $window.localStorage.setItem("topic", topic);


            $location.path("/reply");

        }

        vm.getData = function () {
            DataService.getData().then(function (success) {

                vm.discussion = success;

            }, function (err) {

            });

        }

        $rootScope.$on('change', function (event, data) {
            vm.discussion = data;
        });

        vm.showForm = function () {
            vm.err = "";
            var modalInstance = $uibModal.open({
                templateUrl: 'templates/discussion-form.html',
                controller: FormCtrl,
                resolve: {
                    userForm: function () {
                        return vm.userForm;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                vm.selected = selectedItem;
            }, function () {
                vm.err = "You can either check discussions or start one!";
            });
        };
    }
})();

var FormCtrl = function ($scope, $rootScope, $uibModalInstance, userForm, discussionStartService, DataService, $window) {

    $scope.form = {}
    $scope.submitForm = function (topic, discussion) {

        if (!topic || !discussion) {

            return 0;
        }
        console.log(topic, discussion);
        var text = {
            userName: $window.localStorage.getItem("user"),
            post: topic,
            detail: discussion
        }
        discussionStartService.startDiscussion(text).then(function (success) {
            console.log(success);
            DataService.getData().then(function (data) {
                console.log(data);

                $rootScope.$emit("change", data);

            }, function (err) {

            });
        }, function (err) {

        });
        $uibModalInstance.close('closed');

    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
};

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

angular.module("app.home")
    .service("DataService", function ($http, $q) {


        this.getData = function () {
            var defer = $q.defer();
            $http({
                method: 'GET',
                url: 'http://localhost:9000/api/v1/discussion/getData'
            }).success(function (res) {
                defer.resolve(res);
            }).error(function (err) {
                defer.reject(err);
            })
            return defer.promise;
        }


    })