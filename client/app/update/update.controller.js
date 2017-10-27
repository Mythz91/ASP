(function () {
    angular
        .module('app.home')
        .controller('updateCtrl', update)
    function update(updateService, updateInfo,$window,$location) {
        if(!$window.localStorage.getItem("auth-token")){
            $location.path("/");
        }
        var vm = this;
   
        vm.userName = "";
        vm.regNum = "";
       
        vm.mail = "";
       
        vm.address = "";
        vm.city = "";
      
        vm.states;
        vm.zip = "";
      
        vm.password = "";
        vm.passErr = "";
        vm.passwordConfirm = "";
        vm.confirmErr = "";
        vm.data = false;
        vm.show = true;
        vm.msg = false;
        vm.msg2=false;
        vm.state = ["AK - Alaska",
            "AL - Alabama",
            "AR - Arkansas",
            "AS - American Samoa",
            "AZ - Arizona",
            "CA - California",
            "CO - Colorado",
            "CT - Connecticut",
            "DC - District of Columbia",
            "DE - Delaware",
            "FL - Florida",
            "GA - Georgia",
            "GU - Guam",
            "HI - Hawaii",
            "IA - Iowa",
            "ID - Idaho",
            "IL - Illinois",
            "IN - Indiana",
            "KS - Kansas",
            "KY - Kentucky",
            "LA - Louisiana",
            "MA - Massachusetts",
            "MD - Maryland",
            "ME - Maine",
            "MI - Michigan",
            "MN - Minnesota",
            "MO - Missouri",
            "MS - Mississippi",
            "MT - Montana",
            "NC - North Carolina",
            "ND - North Dakota",
            "NE - Nebraska",
            "NH - New Hampshire",
            "NJ - New Jersey",
            "NM - New Mexico",
            "NV - Nevada",
            "NY - New York",
            "OH - Ohio",
            "OK - Oklahoma",
            "OR - Oregon",
            "PA - Pennsylvania",
            "PR - Puerto Rico",
            "RI - Rhode Island",
            "SC - South Carolina",
            "SD - South Dakota",
            "TN - Tennessee",
            "TX - Texas",
            "UT - Utah",
            "VA - Virginia",
            "VI - Virgin Islands",
            "VT - Vermont",
            "WA - Washington",
            "WI - Wisconsin",
            "WV - West Virginia",
            "WY - Wyoming"
        ];
      
        vm.verifyPass = function () {
            if ( !(vm.password.match(vm.password.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,}/g)))) {
                vm.passErr = "please enter  at least one number, one lowercase and one uppercase letter at least four characters long password"
            return false;
            }
            return true;
        }
        vm.confirmPass = function () {
            if (!(vm.passwordConfirm.match(vm.passwordConfirm.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,}/g)))) {
                vm.confirmErr = "please enter  at least one number, one lowercase and one uppercase letter at least four characters long password"
          return false
            }
            if ( !(vm.password == vm.passwordConfirm)) {
                vm.confirmErr = "please enter same password for confirmation";
                vm.passwordConfirm = "";
                return false
            }
        return true;

        }
       
        vm.clearPassErr = function () {
            vm.passErr = "";
        }
        vm.clearPassCErr = function () {
            vm.confirmErr = "";
        }
        vm.close = function(){
            vm.data=false;
        }
        vm.closeMsg= function(){
            vm.msg=false;
        }
        vm.closeMsg2 = function(){
            vm.msg2=false;
        }

        vm.updateInfo = function (userName, regNum, mail, addr, city, state, zip, password) {
            if(vm.verifyPass() && vm.confirmPass){
            vm.show = false;
            var data = {
                userName: userName,
                registration: regNum,
                email: mail,
                address: {
                    street: addr,
                    city: city,
                    state: state,
                    zip: zip
                },
                password: password
            }
           
            try{
                updateInfo.update(data).then(function(success){
                  
                   vm.data=true;
                    
                },function(err){

                    vm.msg=true;
                })
            }catch(error){
                vm.msg2=true;
            }

        }
    }

        vm.updateData = function () {
            vm.msg = "";
            updateService.getData().then(function (data) {
                
                details = data;
                vm.userName = details.user;
                vm.regNum = details.registration;
                vm.mail = details.email;
                vm.address = details.street;
                vm.city = details.city;
                vm.states = details.state;
                vm.zip = details.zip;

            }, function (err) {
                console.log(err);

            })
        }

    }

})();

angular.module("app.home")
    .service("updateService", ['$http', '$q', '$window',function ($http, $q,$window) {
        this.getData = function () {
            var defer = $q.defer();
            $http({
                method: 'POST',
                url: 'http://localhost:9000/api/v1/update/getUserData',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    regNum: $window.localStorage.getItem("reg"),
                    password: $window.localStorage.getItem("pass")
                }
            }).success(function (data) {
                defer.resolve(data)
            }).error(function (err) {
                defer.reject(err)
            })
            return defer.promise;
        }

    }])

angular.module("app.home")
    .service("updateInfo", ['$http', '$q', function ($http, $q) {
        this.update = function (text) {
            var defer = $q.defer();
            $http({
                method: 'POST',
                url: 'http://localhost:9000/api/v1/update/',
                data: text,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).success(function (res) {
                defer.resolve();
            }).error(function (err) {
                defer.reject();
            })
            return defer.promise
        }
    }])
