var data ="";
var pass="";
var reg = "";

(function () {
    angular
        .module('app.home')
        .controller('getLogin', getLogin)
    var URL = 'http://localhost:9000/api/v1/';
    function getLogin($scope, UserService,	authTokenFactory, $location,$window) {
        var vm = this;
        vm.regNum = "";
        vm.password = "";
        vm.PassErr = "";
        vm.err = "";
        vm.errUser = "";
        vm.verifyUser = function () {

            if( (vm.regNum.match(/^\d+$/g))){
                if(vm.regNum.charAt(0)==0||vm.regNum.charAt(0)=="0"){
                vm.errUser = "Please enter a valid registration number";
              return false;
                }
              return true;
            }

        }
        vm.clearUserErr = function () {
            vm.errUser = "";
        }
        vm.clearPassErr = function () {
            vm.PassErr = "";
        }
        vm.verifyPass = function () {

            if (!(vm.password.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,}/g))) {
                vm.passErr = "please enter  at least one number, one lowercase and one uppercase letter at least four characters long password";
            }

        }
        vm.login = login;
        vm.clear= function(){
            vm.err="";
        }
        function login(regNum, password) {
            if(vm.verifyUser()){
           try {
                UserService.login(regNum, password, URL).then(function (res) {

                    reg = regNum;
                   data=res.username;
                    pass=password;
                    $window.sessionStorage.setItem("user",res.username);
                    $window.sessionStorage.setItem("reg",regNum);
                    $window.sessionStorage.setItem("pass",password);
                    $window.sessionStorage.setItem("email",res.email);
                    if(res.username=='Admin'&& res.token && regNum=="9999999"){
                        authTokenFactory.setToken(res.token);
                        $location.path('/admin')
                    }
                    if(res.username=='Patrick'&& res.token && regNum=="1111111"){
                      authTokenFactory.setToken(res.token);
                      $location.path('/doctor')
                  }
                   else if(res.token){

                        authTokenFactory.setToken(res.token);
                        $location.path('/welcome');
                    }
                }, function (err) {
                    vm.err=err;
                });
            } catch (error) {
                vm.err="Please try again after some time";
            }

        }
    }
        vm.logout = logout;
        function logout(){

            authTokenFactory.setToken("");
            vm.userName = "";
            $window.sessionStorage.clear();
            $location.path("/");
            $window.localStorage.clear();

        }

    }


})();

