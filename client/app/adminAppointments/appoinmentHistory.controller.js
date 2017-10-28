(function () {
    angular
        .module('app.home')

        .controller('appCtrl', appCtrl);

    function appCtrl(appService, $location, $window, $uibModal, $rootScope) {
        var vm = this;
        var data;
        vm.bool = false;
        vm.dis = {};
        vm.del = false;
        $rootScope.userDetails = {};
        vm.regUser;
        vm.reg;

        $rootScope.$on("change", function (event, data) {
            var changes = {
                regUser:vm.regUser,
                reg:vm.reg,
                user:data.userName,
                age:data.age,
                sex:data.sex,
                date:data.date,
                symptoms:data.symptoms,

            }
            vm.changeAppointment(changes);
        })
        if (!$window.localStorage.getItem("auth-token")) {
            $location.path("/");
        }
        vm.closeAlert = function () {
            vm.bool = false;
        }
        vm.changeAppointment = function (data) {
            appService.editAppointment(data).then(function(success){

            }, function(err){

            })
        }
        vm.loadDetails = function () {
            appService.getApp().then(function (success) {

                data = success;
                var res = seggregate(data);
                vm.present = res.present;
                vm.future = res.future;
                vm.past = res.past;

            }, function (err) {

            });

        }
        vm.closeDel = function () {
            vm.del = false;
        }
        vm.remind = function (userName, email, user, age, sex, symptoms, date, index) {

            var text = {
                regUser: userName,
                mail: email,
                pt: user,
                age: age,
                sex: sex,
                sym: symptoms,
                date: date
            }
            appService.sendMail(text).then(function (success) {

                vm.bool = true;
                vm.dis[index] = true;

            }, function (err) {

            });


        }
        vm.review = function (userName, email, user, age, sex, symptoms, date, index) {

        }
        vm.edit = function (userName, reg, email, user, age, sex, symptoms, date, index) {
            vm.regUser = userName;
            vm.reg=reg;
            $rootScope.userDetails.user = user;
            $rootScope.userDetails.age = age;
            $rootScope.userDetails.sex = sex;
            $rootScope.userDetails.symptoms = symptoms;
            $rootScope.userDetails.date = date;

            console.log(userName, reg, email, user, age, sex, symptoms, date, index);
            var modalInstance = $uibModal.open({
                templateUrl: 'templates/edit-form.html',
                controller: EditCtrl,
                resolve: {
                    editForm: function () {
                        return vm.editForm;
                    }
                }
            })
        }
        vm.delete = function (userName, reg, email, user, age, sex, symptoms, date, index) {
            console.log(user, reg);
            var text = {
                regUser: userName,
                regNum: reg,
                mail: email,
                pt: user,
                age: age,
                sex: sex,
                sym: symptoms,
                date: date
            }
            appService.deleteApp(text).then(function (success) {

                vm.del = true;
                vm.loadDetails();

            }, function (err) {

            });

        }
    }

    function seggregate(data) {
        var obj = {
            past: [],
            present: [],
            future: []
        };
        for (i = 0; i < data.length; i++) {
            var one_day = 1000 * 60 * 60 * 24;
            var milDiff = new Date(data[i].appoint.date).getTime() - new Date().getTime();
            var diff = Math.round(milDiff / one_day);

            if (diff == 0) {
                obj.present.push(data[i]);
            }
            if (diff < 0) {
                obj.past.push(data[i]);
            }
            if (diff > 0) {
                obj.future.push(data[i]);


            }
        }
        return obj;
    }

})();

var EditCtrl = function ($scope, $rootScope, $uibModalInstance, editForm, $window) {
    $scope.getData = function () {
        $scope.userName = $rootScope.userDetails.user;
        $scope.age = $rootScope.userDetails.age;
        $scope.sex = ["male", "female", "not interested to disclose"];
        $scope.sext = $rootScope.userDetails.sex;
        $scope.selection = "";
        $scope.date = new Date($rootScope.userDetails.date);
        $scope.delete = false;
        $scope.dateCheck = "";
        $scope.disable = false;
        $scope.symptoms = $rootScope.userDetails.symptoms;
        $scope.validate = false;
        $scope.showres = false;
        $scope.show = false;
        $scope.res = "";
    }
    $scope.clearDate = function () {
        $scope.dateCheck = "";
    }
    $scope.verifyDate = function () {

        if (!$scope.date) {
            $scope.dateCheck = "please select a date and time";
            return false;
        }
        $scope.dateCheck = "";


        var today = new Date();
        var check = new Date($scope.date);

        // if (check < today || check == today) {
        //     $scope.dateCheck = "please select a date of future occurance";
        // return false;
        // }
        var todayTime = today.getTime();
        var checkTime = check.getTime();

        var diff = Math.round(Math.abs((todayTime - checkTime) / (24 * 60 * 60 * 1000)));
        if (diff > 6) {
            $scope.dateCheck = "please select a date which is within a week from today " + (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
            return false;
        }
        return true;

    }



    $scope.form = {}
    $scope.submitForm = function (userName, age, sext, date, symptoms) {
        if ($scope.verifyDate()) {
            console.log(userName, age, sext, date, symptoms)
        }
        var change = {
            userName: userName,
            age: age,
            sex: sext,
            date: date,
            symptoms: symptoms
        }
        $rootScope.$emit("change", change);

        $uibModalInstance.close('closed');

    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
};


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
}