angular
    .module('app.home')
    .controller("EditCtrl", EditCtrl)

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
        $scope.symptoms = $rootScope.userDetails.symptoms;
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
        $rootScope.$emit("changes1",change);
            $uibModalInstance.close('closed');

    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
};

