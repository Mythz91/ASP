angular.module('app.home')
    .provider("date",function(){
        var greet;
        return{
            setGreet : function(value){
               greet =value;
            },
            $get : function(){
                return{
                    showDate : function(){
                        var date = new Date();
                        return date.getHours();
                    },
                    showGreet: function(){
                        return "Hello! "+greet;
                    }
                }
            }
        }
    })