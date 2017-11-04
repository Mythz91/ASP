angular.module("app.home")
    .controller("replyCtrl",replyCtrl)
    function replyCtrl(replyService, addReplyService,$window){
        if(!$window.localStorage.getItem("auth-token")){
            $location.path("/");
        }
        var vm = this;
        vm.userName = $window.localStorage.getItem("to");
        vm.topic = $window.localStorage.getItem("topic");
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
               user : $window.localStorage.getItem("user"),
               topic:vm.topic,
               to:vm.userName
           }
           addReplyService.addReply(text).then(function(success){
         
           vm.data=success;
         
           },function(err){

           })
       }

    }
   

       