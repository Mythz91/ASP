(function(){
    angular
    .module('app.home')
    .controller('appointmentCtrl', appoint)

    function appoint(){
        var appoint = this;
        appoint.userName;
        appoint.user;
        appoint.age;
        appoint.ageCheck;
        appoint.sex = ["male", "female", "not interested to disclose"];
        appoint.sext = "";
        appoint.selection = "";
        appoint.date = "";
        appoint.dateCheck = "";
        appoint.symptoms= "";
        appoint.symp="";
        appoint.contact = "";
        appoint.contactCheck = "";
        appoint.validate="";
        appoint.show = false;
        appoint.res = "";
        appoint.checkContact = function(){
            var contact =appoint.contact;
            if(appoint.contact.startsWith('+')){
                contact =appoint.contact.replace("+","")
            }
            var i;
            for(i=0; i<appoint.contact.length;i++){
                if(appoint.contact[i]=="-"){
                    appoint.contactCheck = "please insert contact number without '-'";
                    break;
                }
    
            }
            if(i <10||i>10){
                appoint.contactCheck = "please insert correct contact number";
            }
        }
        appoint.clearContact = function(){
             appoint.contactCheck = "";
        }
        appoint.clear = function() {
            appoint.user = "";
    
        }
        appoint.verifyUserName = function() {
            var i;
            for (i = 0; i < appoint.userName.length; i++) {
                if (appoint.userName[i].match(/\d+/g)) {
    
                    appoint.user = "please enter valid name"
                    break;
                }
            }
    
            if (i < 5) {
                appoint.user = "please enter valid name"
            } else {
                appoint.user = "";
            }
    
    
        }
        appoint.clearAge = function() {
            appoint.ageCheck = "";
        }
        appoint.checkSelection = function() {
            console.log(appoint.sext)
            if (appoint.sext == "") {
                appoint.selection = "please select any one";
            }
        }
        appoint.clearSelect = function() {
            appoint.selection = "";
        }
        appoint.verifyAge = function() {
    
            if (appoint.age == undefined) {
                appoint.ageCheck = "please enter valid age"
            }
        }
        appoint.verifyDate = function() {
            appoint.dateCheck = "";
            console.log(appoint.date);
            var today = new Date();
            var check = new Date(appoint.date);
            if (check < today || check == today) {
                appoint.dateCheck = "please select a proper date";
            }
           var todayTime = today.getTime();
           var checkTime = check.getTime();
          var diff = Math.round(Math.abs((todayTime - checkTime)/(24*60*60*1000)));
            if(diff >6){
                appoint.dateCheck = "please select a date which is within a week from today "+(today.getMonth() + 1) + '/' + today.getDate() + '/' +  today.getFullYear();
            }
        }
        appoint.checkSymptoms = function(){
            if(appoint.symptoms.trim() == ""){
                appoint.symp = "Please enter valid symptoms";
            }
        }
        appoint.clearSymp = function(){
            appoint.symp = "";
        }
        appoint.appointment = function() {
            if(appoint.userName==""||appoint.contact==""|| appoint.date==""||appoint.age==undefined||appoint.symptoms == ""|| appoint.sext==""){
                appoint.validate="Please enter valid information"
            }else{
                var data ={
                    userName : appoint.userName,
                    contact : appoint.contact,
                    date : appoint.date,
                    age : appoint.age,
                    symptoms : appoint.symptoms,
                    sex : appoint.sext
                }
                appointmentService.createAppointment(data).then(function(data){
                
                    appoint.res = data;
                }, function(err){
                    console.log(err);
                })
            }
        }
    
        appoint.confirmAppointment = function(){
             appoint.show = true;
        }
        appoint.drop = function(){
            appoint.show = false;
            appoint.userName="";
            appoint.contact="";
             appoint.date="";
             appoint.age=undefined;
             appoint.symptoms ="";
              appoint.sext=""
        }
    
    
    }
})();
angular.module("app.home")
.service("appointmentService", ['$http', '$q', function($http, $q){
	this.createAppointment = function(text){
		var defer = $q.defer();
		$http({
			method : 'POST',
			data : text,
			url : 'http://localhost:4000/appointment',
			 headers: {
                    'Content-Type': 'application/json'
                }
		}).success(function(result){
			defer.resolve(result);
		}).error(function(err){
			defer.resolve(err)
		})
		return defer.promise;
	}
}]);
