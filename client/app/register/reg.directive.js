angular
.module('app.home')

.directive('register', register);

function register(){
    return{
        templateUrl:'templates/register.html'
    }
}