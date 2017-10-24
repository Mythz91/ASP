(function () {
    angular
        .module('app.home')

        .controller('reviewCtrl', reviewCtrl);

    function reviewCtrl( $location, $window) {
        var vm = this;
      

        if (!$window.localStorage.getItem("auth-token")) {
            $location.path("/");
        }
    }
})();