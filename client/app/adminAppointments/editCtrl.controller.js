angular
    .module('app.home')
    .controller("EditCtrl", EditCtrl)

var EditCtrl = function ($scope, $rootScope, $uibModalInstance, editForm, $window,appService, appointmentService) {
    $scope.getData = function () {
      $scope.disp = false;
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
        $scope.dept =[];
        appointmentService.getDocDetails().then(function(success){
          for(var i=0;i<success.length;i++){
        $scope.dept.push(success[i].dept);
          }
           data=success;
       },function(err){
           console.log(err);
       })
    }
    $scope.closeValidate= function(){
      $scope.validate=false;
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
$scope.clearData=function(){
  $scope.show=false;
  $scope.checkTime="";
  $scope.disp=false;
}

   $scope.checkAvailability=function(selectDoc,date, selectDept){

    $scope.show=false;

                var obj = {
                    doc : selectDoc,
                    date : date,
                    dept : selectDept
                }
                appointmentService.docTime(obj).then(function(success){
                  if(success.length==0){
                   $scope.info = "Please select another Doctor as the Doctor you have selected is busy for the day!"
                  }
                 var data=  matchTime(success);
                 time = correctTime(data);
                  $scope.timings=time;
                  $scope.timeShow=true;
                  $scope.show=true;
                  $scope.disp=true;
                },function(err){

                })

   }
$scope.doc=[];
$scope.selectDoc="";
$scope.changeDoc = function(dep){

   $scope.doc=[];
      for(var i=0;i<data.length;i++){
          if(data[i].dept == dep){
              data[i].docs.forEach(function(ele){
               $scope.doc.push(ele);
              })
          }

         }
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

        var todayTime = today.getTime();
        var checkTime = check.getTime();

        if (check < today || check == today) {
          $scope.dateCheck = "please select a date of future occurance cannot make immediate appointment";
          return false;
      }

        var diff = Math.round(Math.abs((todayTime - checkTime) / (24 * 60 * 60 * 1000)));
        if (diff > 6) {
            $scope.dateCheck = "please select a date which is within a week from today " + (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
            return false;
        }
        return true;

    }

    $scope.choose=function(times){
      $scope.show=false;
      $scope.checkTime = times;
      $scope.disp=true;
    }
    $scope.checkChosenTime =function(){
      $scope.view = true;
    }

    $scope.form = {}
    $scope.submitForm = function (userName, age, sext, symptoms) {
      if ($scope.userName == "" || $scope.date == "" || $scope.date == undefined || $scope.age == undefined || $scope.symptoms == "" || $scope.sext == ""||!$scope.checkTime||!$scope.selectDoc||!$scope.verifyDate()) {
        $scope.validate = true;
        return;
    } else {
var obj = $rootScope.data;
      var data = {
        obj,
        new:{
       userName  : $scope.userName,
        age : $scope.age,
        sex : $scope.sext,
        date: $scope.date,
        age: $scope.age,
        symptoms: $scope.symptoms,
        sex: $scope.sext,
        doc:$scope.selectDoc,
        time:$scope.checkTime,

        }
      }


      appService.editAppointment(data).then(function(text){



      appService.getApp().then(function (success) {

                        data = success;

                        $rootScope.$emit("changesEdit",data);


                    }, function (err) {

                    });
            }, function(err){

            })
        }
       $uibModalInstance.close('closed');

    }


    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
};

