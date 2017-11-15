angular.module("app.home")
    .controller("replyCtrl",replyCtrl)
    function replyCtrl(replyService, addReplyService,$window){
        if(!$window.sessionStorage.getItem("auth-token")){
            $location.path("/");
        }
        var vm = this;
        vm.userName = $window.sessionStorage.getItem("to");
        vm.topic = $window.sessionStorage.getItem("topic");
        vm.replyText="";
        vm.data;
        vm.check=true;
        vm.checkStatus=function(){
            vm.check=false;
        }
       vm.previousReplies=function(){
        replyService.getReplies( vm.userName,vm.topic).then(function(success){
            
            vm.data=success;
        },function(err){

        });
        return;
       }
       vm.addReply = function(text){
        vm.replyText="";
           var text = {
               reply : text,
               user : $window.sessionStorage.getItem("user"),
               topic:vm.topic,
               to:vm.userName
           }
           addReplyService.addReply(text).then(function(success){
         
           vm.data=success;
         
           },function(err){

           })
       }

    }
   

       