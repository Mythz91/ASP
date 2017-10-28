(function () {
    angular
        .module('app.home')
        .controller('previousController', previous)

    function previous(prevService,$window) {
        if(!$window.localStorage.getItem("auth-token")){
            $location.path("/");
        }
        var previous = this;
        previous.appointments;
        previous.show=false;
        previous.hide = true;
    
        previous.getData = function () {

            prevService.getData().then(function (res) {
              console.log(res);
                previous.show=true;
                previous.hide=false;
                previous.appointments = res;

            }, function (err) {
             
                console.log(err);
            })
        }


    };
})();

