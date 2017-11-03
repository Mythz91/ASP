
    angular
        .module('app.home')
        .controller('previousController', previous)

    function previous($uibModal,$rootScope,prevService,$window,dataFactory) {
        if(!$window.localStorage.getItem("auth-token")){
            $location.path("/");
        }
        var previous = this;
        previous.appointments;
        previous.show=false;
        previous.hide = true;
    
        previous.getData = function () {

            prevService.getData().then(function (res) {
             
                previous.show=true;
                previous.hide=false;
                previous.appointments = res;

            }, function (err) {
             
                console.log(err);
            })
        }
        previous.getReview = function(index,date,user,sex,symptoms){
          var  data = {
              index : index,
              date : date,
              user : user,
              sex : sex,
              symptoms : symptoms,
              regNum : $window.localStorage.getItem("reg")

          }
            dataFactory.setData(data);
        
            var modalInstance = $uibModal.open({
                templateUrl: 'templates/review.html',
                controller: ReviewCtrl,
                resolve: {
                    review: function () {
                        return previous.review;
                    }
                }
        })



}
    }



