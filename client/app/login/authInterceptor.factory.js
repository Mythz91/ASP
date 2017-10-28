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