(function(){
    angular
    .module('app.home')
    .controller('updateCtrl', update)
    function update(updateService, updateInfo){
		var update = this;
		var details;
		update.state =["AK - Alaska",
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
     

		update.updateData = function(){
			updateService.getData().then(function(data){
				console.log(data);
				details = data;
					update.userName = details.user;
					update.regNum = details.registration;
					update.mail = details.email;
					update.address=details.street;
					update.city = details.city;
					update.states= details.state;
					update.zip=details.zip;


				console.log(details)
			}, function(err){
				console.log(err);

			})
		}

		var text = {
			user : update.userName,
			regNum : update.regNum,
			mail : update.mail,
			street : update.address,
			city : update.city ,
			state : update.states,
			zip : update.zip
		}
		update.save = function(){
			alert("hi")
			updateInfo.update().then(function(data){
				console.log(data);
			},function(err){
				console.log(err);
			})
		}
	}

})();

angular.module("app.home")
.service("updateService",['$http','$q',function($http,$q){
    this.getData = function(){
        var defer = $q.defer();
    $http({
        method:'GET',
        url:'http://localhost:9000/getUserData'
    }).success(function(data){
        defer.resolve(data)
    }).error(function(err){
        defer.reject(err)
    })
    return defer.promise;
    }

}])

angular.module("app.home")
.service("updateInfo", ['$http','$q', function($http,$q){
    this.update = function(){
        var defer = $q.defer();
        $http({
            method : 'POST',
            url : 'http://localhost:9000/updateInfo',
            data : text,
             headers: {
            'Content-Type': 'application/json'
        }
        }).success(function(res){
            defer.resolve();
        }).error(function(err){
            defer.reject();
        })
        return defer.promise
    }
}])
