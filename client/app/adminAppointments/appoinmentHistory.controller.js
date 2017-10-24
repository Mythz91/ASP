(function () {
    angular
        .module('app.home')

        .controller('appCtrl', appCtrl);

    function appCtrl(appService, $location, $window) {
        var vm = this;
        var data;
        vm.bool = false;
        vm.dis = {};

        if (!$window.localStorage.getItem("auth-token")) {
            $location.path("/");
        }
        vm.closeAlert = function(){
            vm.bool=false;
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
        vm.remind = function(userName ,email,user,age,sex,symptoms,date,index){
           
            var text ={
                regUser : userName,
                mail : email,
                pt : user,
                age :age,
                sex:sex,
                sym:symptoms,
                date : date
            }
            appService.sendMail(text).then(function (success) {
               
                vm.bool = true;
                vm.dis[index] = true;
                  
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
            data : text,
            headers:{
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