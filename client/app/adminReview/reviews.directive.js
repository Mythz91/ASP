angular
.module('app.home')

.directive('reviews', reviews);

function reviews(){
    return{
        templateUrl:'templates/resultReview.html'
    }
}