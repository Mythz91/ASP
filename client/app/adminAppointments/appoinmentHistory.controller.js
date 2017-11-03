(function () {
    angular
        .module('app.home')

        .controller('appCtrl', appCtrl);

    function appCtrl(appService, $location, $window, $uibModal, $rootScope) {
        var vm = this;
      
        var data;
        vm.bool = false;
        $rootScope.dis = {};
        $rootScope.rev={};
        vm.del = false;
        $rootScope.userDetails = {};
      vm.contact;
        vm.regUser;
        vm.reg;
        vm.email;
        $rootScope.review = false;
      $rootScope.$on("change2",function(event,data){
          $rootScope.val.push($rootScope.index);
        $rootScope.rev[$rootScope.index] = true;
        $rootScope.dis[$rootScope.index] =true;
      })

        $rootScope.$on("changes1", function (event, data) {
            var changes = {
                regUser:vm.regUser,
                reg:vm.reg,
                email:vm.email,
                pt:data.userName,
                age:data.age,
                sex:data.sex,
                date:data.date,
                contact:vm.contact,
                symptoms:data.symptoms,
                pastPt: $rootScope.userDetails.user,
                pastAge: $rootScope.userDetails.age,
                pastSex: $rootScope.userDetails.sex,
                pastSymp: $rootScope.userDetails.symptoms,
                pastDate: $rootScope.userDetails.date

            }
            appService.editAppointment(changes).then(function(success){
                vm.loadDetails();
            }, function(err){

            })
        })
        if (!$window.localStorage.getItem("auth-token")) {
            $location.path("/");
        }
        vm.closeAlert = function () {
            vm.bool = false;
        }
        vm.close = function(){
            $rootScope.review=false;
        }
     
        vm.loadDetails = function () {
            appService.getApp().then(function (success) {

                data = success;
                var res = seggregate(data);
                vm.present = res.present;
                vm.future = res.future;
                vm.past = res.past;
                $rootScope.rev[$rootScope.index] = true;
                $rootScope.dis[$rootScope.index] =true;

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
                $rootScope.dis[index] = true;

            }, function (err) {

            });


        }
        vm.review = function (userName, email, user, age, sex, symptoms, date,reg, index) {
           
            $rootScope.userDetails.user = userName;
            $rootScope.userDetails.age = age;
            $rootScope.userDetails.sex = sex;
            $rootScope.userDetails.symptoms = symptoms;
            $rootScope.userDetails.date = date;
            $rootScope.userDetails.reg =reg;
            $rootScope.index=index;
      
            
            var modal = $uibModal.open({
                templateUrl : 'templates/review-form.html',
                controller: reviewCtrl,
                resolve:{
                    reviewForm : function(){
                        return vm.reviewForm;
                    }
                }
            })

        }
        vm.edit = function (userName, reg, email, user, age, sex, symptoms, date, contact, index) {
            
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

