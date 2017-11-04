angular
.module('app.home')
.factory('dataFactory', function(){
 
    var data;
    this.setData = function(value){
       
       data = value;
    }
this.getData = function(){
   
    return data;
}
return{
    getData : this.getData,
    setData : this.setData
}

});

