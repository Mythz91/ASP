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
        appoint.timeDisp = false;
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
        appoint.timings;
        appoint.info="";
        appoint.dispTime=false;
        appoint.time;
        appoint.timeShow=false;
        appoint.contact = "";
        appoint.checkTime;
        appoint.validate = false;
        appoint.showres = false;
        appoint.fail = false;
        appoint.show = false;
        appoint.res = "";
        appoint.fillDisp= false;
        appoint.set = false;
        appoint.fillDispClose = function(){
            appoint.fillDisp= false;
        }

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
            appoint.timeShow=false;
        }
        appoint.closeRes = function () {
            appoint.showres = false;
            clearData();
            appoint.app = true;
            appoint.dispTime=false;
            appoint.doc=[];
            appoint.date="";
            appoint.checkTime="";
            appoint.dateCheck = "";
            appoint.selectedDet=false;
            appoint.timeShow=false;
            appoint.dept=[]
        }



        appoint.verifyDate = function () {
            appoint.selectedDet=false;
            appoint.timeShow=false;
            appoint.dispTime=false;
            appoint.checkTime="";
            appoint.view=false;

            if (!appoint.date) {
                appoint.dateCheck = "please select a date";
                appoint.selectedDet=false;
                return false;
            }
            appoint.dateCheck = "";


            var today = new Date();
            var check = new Date(appoint.date);

            if ( today-check>86400000 ) {
                appoint.dateCheck = "please select a date of future occurance";
                return false;
            }
            var todayTime = today.getTime();
            var checkTime = check.getTime();

            var diff = Math.round(Math.abs((todayTime - checkTime) / (24 * 60 * 60 * 1000)));
            if (diff > 6) {
                appoint.selectedDet=false;
                appoint.dateCheck = "please select a date which is within a week from today " + (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
           return false;
            }
           return true;

        }
        appoint.getDet =function(){
            if(appoint.selectDept && appoint.selectDoc &&  appoint.verifyDate()){
                appoint.timeShow=false;
                appoint.selectedDet=true;
                appoint.dispTime = true;
                return true;
            }
            else{

                appoint.fillDisp = true;
            }
        }
        function matchTime(data){
            var arr = [];

            for(var i=0;i<data.length;i++){
                if(data[i]==1){
                    arr.push(8)
                }
                if(data[i]==2){
                    arr.push(9)
                }
                if(data[i]==3){
                    arr.push(10)
                }
                if(data[i]==4){
                    arr.push(11)
                }
                if(data[i]==5){
                    arr.push(13)
                }
                if(data[i]==6){
                    arr.push(14)
                }
                if(data[i]==7){
                    arr.push(15)
                }
            }
            return arr;
        }
        appoint.checkChosenTime = function(){
          if(appoint.checkTime)  {
              appoint.view=true;
              appoint.timeDisp = false;
              appoint.set = true;
          }
        }
        appoint.closeTime=function(){
            appoint.timeDisp = false;
        }
        function correctTime(data){
            var hour = new Date().getHours();
           var time = [];
           var hours=[];


           var today = new Date();
           var check = new Date(appoint.date);
           for(var i=0;i<data.length;i++){

              if( Math.round((today.getTime() - check.getTime()) )>= 0){

                if(data[i]>hour){
                    time.push(data[i]);
                }
              } else{
                time.push(data[i]);
              }
           }
           var swapped;
           do {
               swapped = false;
               for (var i=0; i < time.length-1; i++) {
                   if (time[i] > time[i+1]) {
                       var temp = time[i];
                       time[i] = time[i+1];
                       time[i+1] = temp;
                       swapped = true;
                   }
               }
           } while (swapped);

           for(var i=0;i<time.length;i++){

            if(time[i]==13){
               hours.push("1:00 pm");
            }
            if(time[i]==14){
               hours.push("2:00 pm");
            }
            if(time[i]==15){
               hours.push("3:00 pm");
            }
            if(time[i]==8){
               hours.push("8:00 am")
            }
            if(time[i]==9){
               hours.push("9:00 am")
            }
            if(time[i]==10){
               hours.push("10:00 am")
            }
            if(time[i]==11){
               hours.push("11:00 am")
            }

           }
           return hours;

        }
        appoint.choose = function(time){
            appoint.timeShow=false;
            appoint.checkTime = time;
            appoint.dispTime=true;

        }
        appoint.checkAvailability = function(selectDoc,date, selectDept){
            appoint.timeShow=false;

            var obj = {
                doc : selectDoc,
                date : date,
                dept : selectDept
            }
            appointmentService.docTime(obj).then(function(success){
              if(success.length==0){
                appoint.info = "Please select another Doctor as the Doctor you have selected is busy for the day!"
              }
             var data=  matchTime(success);
             time = correctTime(data);
               appoint.timings=time;
               appoint.timeShow=true;
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


            if (appoint.userName == "" || appoint.contact == "" || appoint.date == "" || appoint.date == undefined || appoint.age == undefined || appoint.symptoms == "" || appoint.sext == ""||!appoint.checkTime||!appoint.selectDoc) {
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
                    sex: appoint.sext,
                    doc:appoint.selectDoc,
                    time:appoint.checkTime
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
            appoint.checkTime="";
            appoint.view=false;

        } appoint.confirmAppointment = function () {
            if (!appoint.userName || !appoint.contact || !appoint.date || appoint.age == undefined || !appoint.symptoms || !appoint.sext||!appoint.checkTime||!appoint.selectDoc) {
                appoint.show = false;
                appoint.validate = true;
            } else {
                if(appoint.set){
                    appoint.app = false;
                    appoint.show = true;
                }else{
                    appoint.timeDisp = true;
                }

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
        appoint.selectDoc="";

        appoint.changeDoc = function(dep){
            appoint.doc=[];
            appoint.date="";
            appoint.checkTime="";
            appoint.dateCheck = "";
            appoint.selectedDet=false;
            appoint.timeShow=false;

            appoint.dispTime=false;
            for(var i=0;i<data.length;i++){
                if(data[i].dept == dep){
                    data[i].docs.forEach(function(ele){
                        appoint.doc.push(ele);
                    })
                }

               }
        }
appoint.clearDoc=function(){
  appoint.date="";
  appoint.checkTime="";
  appoint.dateCheck = "";
  appoint.selectedDet=false;
  appoint.timeShow=false;

  appoint.dispTime=false;
}

    }

})();
