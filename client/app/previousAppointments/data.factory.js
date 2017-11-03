angular
.module('app.home')
.factory('dataFactory', function(){
 
    var data;
    this.setData = function(value){
        console.log("called")
       data = value;
    }
this.getData = function(){
    console.log("called")
    return data;
}
return{
    getData : this.getData,
    setData : this.setData
}

});

