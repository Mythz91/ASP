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
        function login(regNum, password) {
            if(vm.verifyUser()){
           try {
                UserService.login(regNum, password, URL).then(function (res) {
                    console.log(res);
                    reg = regNum;
                   data=res.username;
                    pass=password;
                    $window.localStorage.setItem("user",res.username);
                    $window.localStorage.setItem("reg",regNum);
                    $window.localStorage.setItem("pass",password);
                    $window.localStorage.setItem("email",res.email);
                    if(res.username=='admin'&& res.token){
                        authTokenFactory.setToken(res.token);
                        $location.path('/admin')
                    }
                   else if(res.token){
                       console.log("token");
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
            $window.localStorage.clear();
            $location.path("/");
           
        }

    }

    angular
        .module('app.home')
        .service("UserService", function ($http, $q) {

            this.login = function (regNum, password, URL) {
              
                var defer = $q.defer();
                $http({
                    url: URL + 'login',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: {
                        user: regNum,
                        pass: password
                    }
                }).success(function (data) {
                    console.log(data)
                    defer.resolve(data);
                }).error(function (err) {
                    console.log(err);
                    defer.reject(err);
                })
                return defer.promise;
            }

            
        })

})();

angular.module("app.home").factory("authTokenFactory", function($window){
    var store = $window.localStorage;
    var key = "auth-token";
    return{
        getToken : getToken,
        setToken : setToken
    }
    ;
    function getToken(){
        return store.getItem(key);
    }

    function setToken(token){
       
        if(token){
            store.setItem(key,token);
        }else{
            store.removeItem(key);
        }
    }
})

angular.module("app.home").factory("AuthInterceptor",function(authTokenFactory){
    return{
        request : addToken
    }

    function addToken(config){
        var token = authTokenFactory.getToken();
        if(token){
            config.headers = config.headers || {};
            config.headers.Authorization = 'Bearer '+token;
        }
        return config;
    }
})