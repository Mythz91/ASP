
angular.module("app.home").factory("authTokenFactory", function($window){
    var store = $window.sessionStorage;
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
