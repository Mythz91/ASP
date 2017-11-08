angular
.module('app.home')

.directive('appoint', appoint);

function appoint(){
    return{
        templateUrl:'templates/appoint.html'
    }
}