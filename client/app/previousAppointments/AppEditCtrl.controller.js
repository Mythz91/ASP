angular
.module('app.home')
.controller('AppEditCtrl', AppEditCtrl)
var AppEditCtrl = function ($scope, $rootScope, $uibModalInstance, editForm, $window,appointmentService) {
  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
};

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
$scope.checkTime = date[1];


}
var hr;
function getDate(date){
  console.log(date);
  var split = date.split("-");
  var year = split[0];
  var month = split[1];
  var dayOne = split[2];
  var dayNow = dayOne.split("T");
  var day = dayNow[0];
 hr = (dayNow[1].split(":")[0])-6;

var time = getTime(hr);


    return [new Date(Date.UTC(year, (month - 1), day)),time];
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
              console.log(success);
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

console.log(hr);
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
 for(var i=0;i<time.length;i++){

  if(time[i]==13 && time[i] != hr){
     hours.push("1:00 pm");
  }
  if(time[i]==14  && time[i] != hr){
     hours.push("2:00 pm");
  }
  if(time[i]==15  && time[i] != hr){
     hours.push("3:00 pm");
  }
  if(time[i]==8  && time[i] != hr){
     hours.push("8:00 am")
  }
  if(time[i]==9  && time[i] != hr){
     hours.push("9:00 am")
  }
  if(time[i]==10  && time[i] != hr){
     hours.push("10:00 am")
  }
  if(time[i]==11  && time[i] != hr){
     hours.push("11:00 am")
  }

 }
 return hours;

}
$scope.choose=function(times){
  $scope.checkTime = times;
}
$scope.checkChosenTime =function(){
  $scope.view = true;
}
$scope.makeAppointment = function(){
  console.log("here");
  $uibModalInstance.close('closed');
}
}
