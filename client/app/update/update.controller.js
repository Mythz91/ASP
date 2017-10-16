(function () {
    angular
        .module('app.home')
        .controller('updateCtrl', update)
    function update(updateService, updateInfo,$window) {
        if(!$window.localStorage.getItem("auth-token")){
            $location.path("/");
        }
        var vm = this;
        vm.uNameErr = "";
        vm.userName = "";
        vm.regNum = "";
        vm.regErr = "";
        vm.mail = "";
        vm.mailErr = "";
        vm.address = "";
        vm.city = "";
        vm.cityErr = "";
        vm.states;
        vm.zip = "";
        vm.zipErr = "";
        vm.password = "";
        vm.passErr = "";
        vm.passwordConfirm = "";
        vm.confirmErr = "";
        vm.data = "";
        vm.show = true;
        vm.msg = "";
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
        vm.verifyUserName = function () {

            if (!vm.userName && !(vm.userName.match(/^[A-Za-z]+$/g))) {
                vm.uName = "Please enter a valid user name";
            }
        }
        vm.verifyReg = function () {
            if (!(vm.regNum.match(/^\d+$/g))) {
                vm.regErr = "Please enter a valid registration number";
            }
        }
        vm.verifyEmail = function () {
            if (!(vm.mail.match(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/))) {
                vm.mailErr = "Please enter a valid email";
            }
        }
        vm.verifyCity = function () {
            if (!(vm.city.match(/^[A-Za-z]+$/g))) {
                vm.cityErr = "please enter a valid city";
            }
        }
        vm.verifyZip = function () {
            if (!(vm.zip.match(/^\d+$/g))) {
                vm.zipErr = "please enter a valid zip";
            }
        }
        vm.verifyPass = function () {
            if (!vm.password && !(vm.password.match(vm.password.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,}/g)))) {
                vm.passErr = "please enter  at least one number, one lowercase and one uppercase letter at least four characters long password"
            }
        }
        vm.confirmPass = function () {
            if (!vm.passwordConfirm && !(vm.passwordConfirm.match(vm.passwordConfirm.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,}/g)))) {
                vm.confirmErr = "please enter  at least one number, one lowercase and one uppercase letter at least four characters long password"
            }
            if ((!vm.password && !vm.passwordConfirm) && !(vm.password == vm.passwordConfirm)) {
                vm.confirmErr = "please enter same password for confirmation";
                vm.passwordConfirm = "";
            }


        }
        vm.clearUser = function () {
            vm.uName = "";
        }
        vm.clearReg = function () {
            vm.regErr = "";
        }
        vm.clearMail = function () {
            vm.mailErr = "";
        }
        vm.clearZip = function () {
            vm.zipErr = "";
        }
        vm.clearPassErr = function () {
            vm.passErr = "";
        }
        vm.clearPassCErr = function () {
            vm.confirmErr = "";
        }

        vm.updateInfo = function (userName, regNum, mail, addr, city, state, zip, password) {
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
                  
                    vm.msg="Update of information is successful";
                    
                },function(err){

                    vm.msg="there is a error in updating data, please try again";
                })
            }catch(error){
                vm.msg="please try again later";
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
