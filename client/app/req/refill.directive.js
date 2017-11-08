angular
.module('app.home')

.directive('refill', refill);

function refill(){
    return{
        templateUrl:'templates/refill.html'
    }
}