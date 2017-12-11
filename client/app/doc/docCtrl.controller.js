angular
.module('app.home')
.controller('docCtrl', docCtrl)

function docCtrl(docService, $location, $window) {
if (!$window.sessionStorage.getItem("auth-token")) {
    $location.path("/");
}
var vm = this;
vm.choices;
vm.choice;
vm.names;
vm.name;
vm.disp=false;
vm.past;
vm.present;
vm.future;
vm.show=false;
vm.rev;
vm.getData=function(){

  var data={
    user:$window.sessionStorage.getItem("user")
  }
  docService.getData(data).then(function(text){
    vm.choices=text;

  }, function(error){
    console.log("error")
  })
}
vm.change=function(){
  vm.names="";
  var data={
    user:$window.sessionStorage.getItem("user"),
    reg:vm.choice
  }
  docService.getNames(data).then(function(text){
    vm.names=text;

  }, function(error){
    console.log("error")
  })
}
vm.getDetails=function(){
if(vm.choice== undefined || vm.name == undefined){
  vm.disp=true;
}
var text={
  reg : vm.choice,
  name: vm.name
}
docService.getDetails(text).then(function(success){
  vm.show=true;
  vm.past = success.past;
  vm.present = success.present;
  vm.future = success.future;

}, function(error){

})
}
vm.closeAlert= function(){
  vm.disp=false;
}
vm.update = function(reg,name,date,prob,rev,age){
console.log(reg,name,date,prob,rev)
var obj={
  reg:reg,
  name:name,
  date:date,
  prob:prob,
  doc:"Dr."+$window.sessionStorage.getItem("user"),
  rev:rev,
  age:age
}
docService.updateDetails(obj).then(function(success){
  docService.getData(data).then(function(text){
    vm.choices=text;

  }, function(error){
    console.log("error")
  })
}, function(error){
  console.log(error)
})
}

}
