angular
.module('app.home')
.controller('AppEditCtrl', AppEditCtrl)
var AppEditCtrl = function ($scope, $rootScope, $uibModalInstance, editForm, $window,appointmentService, changeAppointmentService,$location, prevService) {
  if(!$window.sessionStorage.getItem("auth-token")){
    $location.path("/");
}
$scope.chang=true;
$scope.disp = false;
  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
};
$scope.verifyName = function(){

  if($scope.userName && $scope.userName.trim().length==0){
    $scope.errName = "Please enter valid name";
  }
}
$scope.closeValidate=function(){
  $scope.validate=false;
}

$scope.view = false;
$scope.verifyDate = function(){
$scope.chang = false;

            if (!$scope.date) {
                $scope.dateCheck = "please select a date";
                $scope.selectedDet=false;
                $scope.view = true;
                return false;
            }
            $scope.dateCheck = "";


            var today = new Date();
            var check = new Date($scope.date);

            if ( today-check>86400000 ) {
                $scope.dateCheck = "please select a date of future occurance";
                $scope.view = true;
                return false;
            }
            var todayTime = today.getTime();
            var checkTime = check.getTime();

            if (check < today || check == today) {
              $scope.dateCheck = "please select a date of future occurance cannot make immediate appointment";
              return false;
          }

            var diff = Math.round(Math.abs((todayTime - checkTime) / (24 * 60 * 60 * 1000)));
            if (diff > 6) {
                $scope.selectedDet=false;
                $scope.dateCheck = "please select a date which is within a week from today " + (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
                $scope.view = true;
           return false;
            }
            $scope.view = false;
           return true;
}

$scope.clearName = function(){
  $scope.errName = "";
}
var obj;
$scope.getData = function(){
  $scope.sex = ["male", "female", "not interested to disclose"];

$scope.userName = $rootScope.userInfo.userApp;
var reg=$rootScope.userInfo.reg;
var mail=$rootScope.userInfo.email;
$rootScope.userInfo.userApp;
$scope.age=$rootScope.userInfo.age;
$scope.sext=$rootScope.userInfo.sex;
$scope.selectDoc=$rootScope.userInfo.doc;
$scope.symptoms = $rootScope.userInfo.symptoms;
var date =getDate($rootScope.userInfo.date);
$scope.date = date[0];
var select = date[0];
$scope.checkTime = date[1];
console.log(date[1]);

obj ={
  userName : $rootScope.userInfo.userApp,
  reg:$rootScope.userInfo.reg,
  mail:$rootScope.userInfo.email,
 userIn: $rootScope.userInfo.userApp,
  age:$rootScope.userInfo.age,
  gen:$rootScope.userInfo.sex,
selectDoc:$rootScope.userInfo.doc,
  symptoms : $rootScope.userInfo.symptoms,
  date :$rootScope.userInfo.date,
  contact:$rootScope.userInfo.contact,
  time : date[1]
}

}
var hr;
function getDate(date){
  console.log(date);
  var split = date.split("-");
  var year = split[0];
  var month = split[1];
  var dayOne = split[2];
  var dayNow = dayOne.split("T");
  var day = parseInt(dayNow[0]);

 hr = (dayNow[1].split(":")[0])-6;

var time = getTime(hr);
console.log(day);

var da = [new Date(Date.UTC(year, (month-1), day,12)),time];
console.log(da);
    return [new Date(Date.UTC(year, (month-1), day,12)),time];
}
function getTime(hr){
  switch (hr) {
    case 8:
    return "8:00 am";
  case 9:
    return "9:00 am";
  case 10:
    return "10:00 am";
  case 11:
    return "11:00 am";
  case 13:
    return "1:00 pm";
  case 14:
    return "2:00 pm";
  case 15:
    return "3:00 pm";
  }
}
$scope.checkAvailability=function(selectDoc,date, selectDept){
$scope.chang=true;
console.log(selectDoc,date,hr)

   var obj = {
                doc : selectDoc,
                date : date,
                dept : selectDept
            }
            appointmentService.docTime(obj).then(function(success){
              if(success.length==0){
                appoint.info = "Please select another Doctor as the Doctor you have selected is busy for the day!"
              }
              $scope.show=true;

             var data=  matchTime(success);
             time = correctTime(data);
               $scope.timings=time;
               $scope.timeShow=true;
            },function(err){

            })

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

  if(time[i]==13 && time[i] != $scope.checkTime.split(":")[0]){
     hours.push("1:00 pm");
  }
  if(time[i]==14  && time[i] != $scope.checkTime.split(":")[0]){
     hours.push("2:00 pm");
  }
  if(time[i]==15  && time[i] != $scope.checkTime.split(":")[0]){
     hours.push("3:00 pm");
  }
  if(time[i]==8  && time[i] != $scope.checkTime.split(":")[0]){
     hours.push("8:00 am")
  }
  if(time[i]==9  && time[i] != $scope.checkTime.split(":")[0]){
     hours.push("9:00 am")
  }
  if(time[i]==10  && time[i] != $scope.checkTime.split(":")[0]){
     hours.push("10:00 am")
  }
  if(time[i]==11  && time[i] != $scope.checkTime.split(":")[0]){
     hours.push("11:00 am")
  }

 }
 return hours;

}
$scope.choose=function(times){
  $scope.show=false;
  $scope.checkTime = times;
  $scope.disp=true;
}
$scope.checkChosenTime =function(){
  $scope.view = true;
}
$scope.makeAppointment = function(){
  console.log("here");



            if ($scope.userName == "" || $scope.date == "" || $scope.date == undefined || $scope.age == undefined || $scope.symptoms == "" || $scope.sext == ""||!$scope.checkTime||!$scope.selectDoc||!$scope.verifyDate()) {
                $scope.validate = true;
                console.log("false");

                return;
            } else {

                var data = {
                  user:$rootScope.userInfo.user,
                    userName: $scope.userName,
                    email:  $window.sessionStorage.getItem("email"),
                    regNum: reg,
                    password: pass,
                  date: $scope.date,
                    age: $scope.age,
                    symptoms: $scope.symptoms,
                    sex: $scope.sext,
                    doc:$scope.selectDoc,
                    time:$scope.checkTime,
                    obj
                }
                console.log(data);


                changeAppointmentService.changeAppointment(data).then(function (data) {
                  console.log(data);
                    if (data == "failed") {
                        appoint.fail = true;
                    } else {
                      prevService.getData().then(function (res) {
                        console.log(res);

                        $rootScope.$emit("change4",res);


                       }, function (err) {


                       })

                    }

                }, function (err) {

                })
            }

  $uibModalInstance.close('closed');
}
}
