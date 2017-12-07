(function(){
    angular
    .module('app.home')
    .controller('registerCtrl', registerCtrl);

    var URL = 'http://localhost:9000/api/v1/'

    function registerCtrl(RegistrationService){
        var vm = this;
        vm.disp=true;
      var statesList=["AK - Alaska",
      "AL - Alabama",
      "AR - Arkansas",
      "AS - American Samoa",
      "AZ - Arizona",
      "CA - California",
      "CO - Colorado",
      "CT - Connecticut",
      "DC - District of Columbia",
      "DE - Delaware",
      "FL - Florida",
      "GA - Georgia",
      "GU - Guam",
      "HI - Hawaii",
      "IA - Iowa",
      "ID - Idaho",
      "IL - Illinois",
      "IN - Indiana",
      "KS - Kansas",
      "KY - Kentucky",
      "LA - Louisiana",
      "MA - Massachusetts",
      "MD - Maryland",
      "ME - Maine",
      "MI - Michigan",
      "MN - Minnesota",
      "MO - Missouri",
      "MS - Mississippi",
      "MT - Montana",
      "NC - North Carolina",
      "ND - North Dakota",
      "NE - Nebraska",
      "NH - New Hampshire",
      "NJ - New Jersey",
      "NM - New Mexico",
      "NV - Nevada",
      "NY - New York",
      "OH - Ohio",
      "OK - Oklahoma",
      "OR - Oregon",
      "PA - Pennsylvania",
      "PR - Puerto Rico",
      "RI - Rhode Island",
      "SC - South Carolina",
      "SD - South Dakota",
      "TN - Tennessee",
      "TX - Texas",
      "UT - Utah",
      "VA - Virginia",
      "VI - Virgin Islands",
      "VT - Vermont",
      "WA - Washington",
      "WI - Wisconsin",
      "WV - West Virginia",
      "WY - Wyoming"
  ];
        vm.userName = "";
        vm.regNum = "";
        vm.dataErr=false;
        vm.mail = "";

        vm.address = "";
        vm.city="";
        vm.Errdata=false;
        vm.closeErr1 = function(){
            vm.Errdata=false;
        }
        vm.states;
        vm.zip="";
        vm.zipErr="";
        vm.password="";
        vm.passErr = "";
        vm.passwordConfirm="";
        vm.confirmErr="";
        vm.data=false;
        vm.verifyState = "";

        vm.state = statesList;
    vm.close=function(){
        vm.data = false;
    }
    vm.closeErr= function(){
        vm.dataErr=false;
    }


    vm.verifyZip = function(){
        if((vm.zip.match(/^\d+$/g))){
            if(vm.zip.charAt(0)==0||vm.zip.charAt(0)=="0"){
            vm.zipErr = "please enter a valid zip";
            return false;
            }
            return true;
      }

    }
    vm.verifyPass = function(){
        if(!(vm.password.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,}/g))){

            vm.passErr= "please enter  at least one number, one lowercase and one uppercase letter at least four characters long password"
        return false;
        }
        return true;
    }
    vm.confirmPass=function(){

        if(!(vm.passwordConfirm.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,}/g))){
            vm.confirmErr= "please enter  at least one number, one lowercase and one uppercase letter at least four characters long password"
        return false;
        }
      if(!(vm.password==vm.passwordConfirm)){

        vm.confirmErr="please enter same password for confirmation";
        vm.passwordConfirm="";
        vm.password="";
        return false;
      }
       return true;

    }
   vm.checkRegister = function(){
    if(vm.regNum.charAt(0)==0){
      vm.regNum="";
    }
   }
    vm.clearPassErr = function(){
        vm.passErr = "";
    }
    vm.clearPassCErr = function(){
        vm.confirmErr="";
    }

        vm.getRegistered = function(userName,regNum,mail,addr,city,state,zip,password){

            if(vm.confirmPass() && vm.verifyPass() && vm.verifyZip()){
                vm.disp=false;
            var data ={
               userName: userName,
               registration: regNum,
               email: mail,
              address:{
                street: addr,
                 city:  city,
                 state: state,
                zip: zip
              },
              password:  password
            }
            vm.userName = "";
            vm.regNum = "";

            vm.mail = "";

            vm.address = "";
            vm.city="";
            vm.states;
            vm.state=statesList;
            vm.zip="";
            vm.zipErr="";
            vm.password="";
            vm.passErr = "";
            vm.passwordConfirm="";
            vm.confirmErr="";
          vm.dataErr=false;
            vm.verifyState = "";
           try{
            RegistrationService.register(data,URL).then(function(success){
                if(success=="the registration number is already in use"){
                    vm.Errdata=true;
                }else{
                    vm.data=true;
                }


            },function(err){
                vm.dataErr=true;
            })
        }catch(error){
            vm.dataErr=true;
        }
        }
    }

    }


})();
