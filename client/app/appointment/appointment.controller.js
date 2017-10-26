(function () {
    angular
        .module('app.home')
        .controller('appointmentCtrl', appoint)

    function appoint(appointmentService,$location,$window) {
        if(!$window.localStorage.getItem("auth-token")){
            $location.path("/");
        }
        var appoint = this;
        appoint.userName = "";
       
        appoint.age;
       
        appoint.sex = ["male", "female", "not interested to disclose"];
        appoint.sext;
        appoint.selection = "";
        appoint.date = "";
        appoint.delete=false;
        appoint.dateCheck = "";
        appoint.disable = false;
        appoint.symptoms = "";
       
        appoint.contact = "";
       
        appoint.validate = false;
        appoint.showres=false;
        appoint.show = false;
        appoint.res = "";
       
    
        appoint.clear = function () {
            appoint.show = false;
            appoint.user = "";


        }
        appoint.clearDate= function(){
            appoint.dateCheck="";
        }
        appoint.closeRes = function(){
            appoint.showres=false;
        }
        appoint.verifyUserName = function () {
            if (!appoint.userName) {
                appoint.user = "please enter valid name of length atleast of 5 characters long";
                console.log(appoint.user);
            }

            if (!appoint.userName && appoint.userName.length != 0) {
                var i;
                for (i = 0; i < appoint.userName.length; i++) {
                    if (appoint.userName[i].match(/\d+/g)) {
                        appoint.user = "please enter valid name"
                        break;
                    }
                }
            }
            if (i < 5) {
                appoint.user = "please enter valid name"
            } else {
                appoint.user = "";
            }


        }
       
     
        appoint.verifyDate = function () {
            if(!appoint.date){
                appoint.dateCheck = "please select a date and time";
            }
            appoint.dateCheck = "";
            console.log(appoint.date);

            var today = new Date();
            var check = new Date(appoint.date);

            // if (check < today || check == today) {
            //     appoint.dateCheck = "please select a date of future occurance";
            // }
            var todayTime = today.getTime();
            var checkTime = check.getTime();

            var diff = Math.round(Math.abs((todayTime - checkTime) / (24 * 60 * 60 * 1000)));
            if (diff > 6) {
                appoint.dateCheck = "please select a date which is within a week from today " + (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
            }

        }

        appoint.closeOne = function(){
            appoint.validate=false;
        }
        appoint.close = function(){
            appoint.delete=false;
        }
       
        appoint.appointment = function () {
            appoint.disable = true;
      
            if (appoint.userName == "" || appoint.contact == "" || appoint.date == "" || appoint.date == undefined || appoint.age == undefined || appoint.symptoms == "" || appoint.sext == "") {
                appoint.validate = true;
            } else {

                var data = {
                    userName: appoint.userName,
                    regNum: reg,
                    password: pass,
                    contact: appoint.contact,
                    date: appoint.date,
                    age: appoint.age,
                    symptoms: appoint.symptoms,
                    sex: appoint.sext
                }
                appoint.userName = "";
                appoint.contact = "";
                appoint.date = "";
                appoint.age = undefined;
                appoint.symptoms = "";
                appoint.sext = ""
                 appoint.validate = false;
                 appoint.show = false;
                 appoint.res = "";

                
                 
                appointmentService.createAppointment(data).then(function (data) {
                    appoint.showres=true;
                 
                }, function (err) {
                    console.log(err);
                })
            }
        }

        appoint.confirmAppointment = function () {
            if (!appoint.userName || !appoint.contact || !appoint.date || appoint.age == undefined || !appoint.symptoms || !appoint.sext) {
                appoint.show = false;
                appoint.validate = true;
            } else {
                appoint.show = true;
            }

        }
        appoint.drop = function () {
            appoint.show = false;
            appoint.userName = "";
            appoint.contact = "";
            appoint.date = "";
            appoint.age = undefined;
            appoint.symptoms = "";
            appoint.sext = ""
            appoint.delete=true;
        }


    }
})();
angular.module("app.home")
    .service("appointmentService", ['$http', '$q', function ($http, $q) {
        this.createAppointment = function (text) {
            var defer = $q.defer();
            $http({
                method: 'POST',
                data: text,
                url: 'http://localhost:9000/api/v1/appointment/appointment',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).success(function (result) {
                defer.resolve(result);
            }).error(function (err) {
                defer.resolve(err)
            })
            return defer.promise;
        }
    }]);