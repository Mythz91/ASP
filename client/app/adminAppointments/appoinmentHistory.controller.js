(function(){
    angular
    .module('app.home')
   
    .controller('appCtrl', appCtrl); 
    function appCtrl(appService,$location,$window) {
        var vm = this;
        var data;
      
        if(!$window.localStorage.getItem("auth-token")){
            $location.path("/");
        }
       
        vm.loadDetails = function(){
           appService.getApp().then(function(success){
           console.log(success);
            data = success;
           var res= seggregate(data);
           vm.present = res.present;
           vm.future = res.future;
           vm.past = res.past;
           console.log(res.past, res.present, res.future);
           }, function(err){

           });
           
        }
    }
    function seggregate(data){
        var obj  = {past: [], present : [], future : []};
        for(i=0;i<data.length;i++){
            if(new Date(data[i].appoint.date).getTime() -new Date().getTime()==0){
                console.log(data[i].appoint.date+" today");
                obj.present.push(data[i]);
             

            }
            if(new Date(data[i].appoint.date).getTime() - new Date().getTime() <0){
                obj.past.push(data[i]);
                console.log(data[i].appoint.date+" past");
               

            }
            if(new Date(data[i].appoint.date).getTime() - new Date().getTime() >0){
                console.log(data[i].appoint.date+" future");
                obj.future.push(data[i]);
               

            }
        }
        return obj;
    }

})();

angular
.module('app.home')
    .service("appService",appService)
    function appService($http,$q){
        this.getApp = function(){
            var defer = $q.defer();
            $http({
                method:'GET',
                url:'http://localhost:9000/api/v1/schedule'

            }).success(function(res){
               defer.resolve(res)
            }).error(function(err){
                defer.reject(err)
            })
            return defer.promise;
        }
    }