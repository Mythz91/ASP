
    angular
        .module('app.home')
            .controller('reviewCtrl', reviewCtrl);

    function reviewCtrl( $location, $window, registerService) {
        var vm = this;
      vm.choices;
      vm.choice;
      vm.choiceMade=false;
      vm.data;
      vm.err=false;


        if (!$window.sessionStorage.getItem("auth-token")) {
            $location.path("/");
        }
        vm.getRegister = function(){
            registerService.getData().then(function(success){
                vm.choices=success;


            }, function(error){

            })

        }
        vm.closeAlert = function(){
            vm.err=false;
        }
        vm.change=function(){
            vm.choiceMade=false;
        }
        vm.getReviews = function(choice){
          var data = {
              reg : choice
          }
            registerService.getReviews(data).then(function(success){
                if(success.length==0){
                    vm.choiceMade=false;
                    vm.err=true;
                }else{
                vm.choiceMade=true;
                vm.data = success;


                }
            },function(error){
                vm.err=true;
            })
        }
    }
