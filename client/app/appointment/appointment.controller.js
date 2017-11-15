(function () {
    angular
        .module('app.home')
        .controller('appointmentCtrl', appoint)

    function appoint(appointmentService, $location, $window) {
        if (!$window.sessionStorage.getItem("auth-token")) {
            $location.path("/");
        }
        var appoint = this;
        appoint.userName = "";
        appoint.selectedDet=false;
        appoint.age;
        appoint.app = true;
        appoint.sex = ["male", "female", "not interested to disclose"];
        appoint.sext;
        appoint.selection = "";
        appoint.date = "";
        appoint.delete = false;
        appoint.dateCheck = "";
        appoint.disable = true;
        appoint.symptoms = "";

        appoint.contact = "";

        appoint.validate = false;
        appoint.showres = false;
        appoint.fail = false;
        appoint.show = false;
        appoint.res = "";


        appoint.clear = function () {
            appoint.show = false;
            appoint.user = "";


        }
        appoint.clearFail = function () {
            appoint.fail = false;
            clearData();
            appoint.app = true;
        }
        appoint.clearDate = function () {
            appoint.dateCheck = "";
            appoint.selectedDet=false;
        }
        appoint.closeRes = function () {
            appoint.showres = false;
            clearData();
            appoint.app = true;
        }



        appoint.verifyDate = function () {
           var bool=false;
            if (!appoint.date) {
                appoint.dateCheck = "please select a date and time";
                appoint.selectedDet=false;
                return false;
            }
            appoint.dateCheck = "";


            var today = new Date();
            var check = new Date(appoint.date);
            if (check.getHours() > 15 || check.getHours() < 8) {
                appoint.dateCheck = "please select time from 8:00 AM to 03:00 PM";
                appoint.selectedDet=false;
                return false;

            }

            if (check.getTime() < today.getTime()) {
                appoint.selectedDet=false;
               appoint.dateCheck = "please select time of future : " + "the current time is " + today.toLocaleTimeString();;
            return false;
            }

            // if (check < today || check == today) {
            //     appoint.dateCheck = "please select a date of future occurance";
            // }
            var todayTime = today.getTime();
            var checkTime = check.getTime();

            var diff = Math.round(Math.abs((todayTime - checkTime) / (24 * 60 * 60 * 1000)));
            if (diff > 6) {
                appoint.selectedDet=false;
                appoint.dateCheck = "please select a date which is within a week from today " + (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
           return false;
            }
            bool=true;
            if(appoint.selectDept && appoint.selectDoc && bool){
              
                appoint.selectedDet=true;
                return true;
            }

        }
        appoint.checkAvailability = function(selectDoc,date, selectDept){
         
            var obj = {
                doc : selectDoc,
                date : date,
                dept : selectDept
            }
            appointmentService.docTime(obj).then(function(success){
                console.log(success);
            },function(err){

            })
        }
        appoint.closeOne = function () {
            appoint.validate = false;
        }
        appoint.close = function () {
            appoint.delete = false;
            clearData();
            appoint.app = true;
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
                clearData();


                appointmentService.createAppointment(data).then(function (data) {
                    if (data == "failed") {
                        appoint.fail = true;
                    } else {

                        appoint.showres = true;
                    }

                }, function (err) {

                })
            }
        }
        function clearData() {
            appoint.userName = "";
            appoint.contact = "";
            appoint.date = "";
            appoint.age = undefined;
            appoint.symptoms = "";
            appoint.sext = ""
            appoint.validate = false;
            appoint.show = false;
            appoint.res = "";

        } appoint.confirmAppointment = function () {
            if (!appoint.userName || !appoint.contact || !appoint.date || appoint.age == undefined || !appoint.symptoms || !appoint.sext) {
                appoint.show = false;
                appoint.validate = true;
            } else {
                appoint.app = false;
                appoint.show = true;
            }

        }
        appoint.drop = function () {
          
            appoint.app = true;
            appoint.show = false;
            appoint.userName = "";
            appoint.contact = "";
            appoint.date = "";
            appoint.age = undefined;
            appoint.symptoms = "";
            appoint.sext = ""
            appoint.delete = true;
        }
        appoint.dept=[];
        appoint.selectDept;
        var data;
        appoint.getData = function(){
            appointmentService.getDocDetails().then(function(success){
               for(var i=0;i<success.length;i++){
                appoint.dept.push(success[i].dept);
               }
                data=success;
            },function(err){
                console.log(err);
            })
        }
        appoint.doc=[];
        appoint.selectDoc;
        appoint.changeDoc = function(dep){
            appoint.doc=[];
            for(var i=0;i<data.length;i++){
                if(data[i].dept == dep){
                    data[i].docs.forEach(function(ele){
                        appoint.doc.push(ele);
                    })
                }
                
               }
        }
        

    }
  
})();
