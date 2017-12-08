(function () {
    angular
        .module('app.home')

        .controller('appCtrl', appCtrl);

    function appCtrl(appService, $location, $window, $uibModal, $rootScope,ReviewFactory) {
      if (!$window.sessionStorage.getItem("auth-token")) {
        $location.path("/");
    }
        var vm = this;
      var index;
        var data;
        vm.bool = false;
      vm.found=false;
        vm.del = false;
        $rootScope.userDetails = {};
      vm.contact;
        vm.regUser;
        vm.reg;
        vm.email;

        $rootScope.review = false;


        $rootScope.$on("changesEdit", function (event, data) {

          var res = seggregate(data);
          vm.present = res.present;
          vm.future = res.future;
          vm.past = res.past;

        })

        vm.closeAlert = function () {
            vm.bool = false;
        }
        vm.close = function(){
            $rootScope.review=false;
        }
        vm.closeFound = function(){
            vm.found=false;
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
        vm.review = function (userName, user, age, sex, symptoms, date,reg, index,doc) {
            var val ={
                userReg:userName,
                user:user,
                age:age,
                sex:sex,
                symp:symptoms,
                date:date,
                reg:reg,
                index:index,
                doc:doc

            }

            appService.findReview(val).then(function(success){

               if(success=="found"){
                vm.found =true
               }
              else{
                ReviewFactory.setData(val);

                 var modalInstance = $uibModal.open({
                   templateUrl: 'templates/review-form.html',
                     controller: ReviewCtrlStart,
                     resolve: {
                         reviewForm: function () {
                             return vm.reviewForm;
                         }
                     }
                 })
               }
            },function(err){

            })




        }
        vm.edit = function (userName, reg, email, user, age, sex, symptoms, date, contact, index,doc) {
          $rootScope.data={
            userName:user,
            age:age,
            sex:sex,
            symptoms:symptoms,
            date:date,
            doc:doc,
            obj:{
              user:userName,
              regNum:reg,
              email:email,
              contact:contact
            }

          }
            vm.regUser = userName;
            vm.reg=reg;
            vm.email =email;
            vm.contact=contact;
            $rootScope.userDetails.user = user;
            $rootScope.userDetails.age = age;
            $rootScope.userDetails.sex = sex;
            $rootScope.userDetails.symptoms = symptoms;
            $rootScope.userDetails.date = date;

            var modalInstance = $uibModal.open({
                templateUrl: 'templates/edit-formAdmin.html',
                controller: EditCtrl,
                resolve: {
                    editForm: function () {
                        return vm.editForm;
                    }
                }
            })
        }


        // vm.delete = function (userName, reg, email, user, age, sex, symptoms, date, index) {

        //     var text = {
        //         regUser: userName,
        //         regNum: reg,
        //         mail: email,
        //         pt: user,
        //         age: age,
        //         sex: sex,
        //         sym: symptoms,
        //         date: date
        //     }
        //     appService.deleteApp(text).then(function (success) {

        //         vm.del = true;
        //         vm.loadDetails();

        //     }, function (err) {

        //     });

        // }
   //}

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
 vm.delete = function(userName ,reg, email,user,age,sex,symptoms,date,index,doc,contact){
$rootScope.select = {
regNum :reg,
user : userName,
email : email,
date : date,
userName : user,
gen : sex,
symp : symptoms,
doc : doc,
age : age,
phone : contact
}
  var modal = $uibModal.open({
    templateUrl: 'templates/delete-form.html',
    controller: deleteCtrl,
    resolve: {
        deleteForm: function () {
            return vm.deleteForm;
        }
    }
})
}
}
})();

