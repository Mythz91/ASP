angular
.module('app.home')
.controller('aboutCtrl', aboutCtrl);

function aboutCtrl($scope){
    $scope.map = { center: { latitude: 39.0915837, longitude: -94.8559068}, zoom: 8 };
    
}
