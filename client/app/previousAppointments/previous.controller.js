
    angular
        .module('app.home')
        .controller('previousController', previous)

    function previous($uibModal,$rootScope,prevService,$window,dataFactory,$location) {
      if (!$window.sessionStorage.getItem("auth-token")) {
        $location.path("/");
    }
    var previous = this;
    previous.dispEditClose = function(){
      previous.dispEdit=false;
    }
    $rootScope.$on('change4', function (event, data) {
      previous.dispEdit=true;
      previous.appointments;
      previous.show=false;
      previous.hide = true;
      previous.past;
      previous.future;
      previous.present;
      $rootScope.userInfo={};
      previous.past = null;
      previous.present = null;
      previous.future = null;
      obj = seggregateDate(data);
      previous.past = obj.past;
      previous.present = obj.present;
      previous.future = obj.future;

         previous.show=true;
         previous.hide=false;
         previous.appointments = data;
  });

        previous.appointments;
        previous.show=false;
        previous.hide = true;
        previous.past;
        previous.future;
        previous.present;
        $rootScope.userInfo={};
        previous.getData = function () {

            prevService.getData().then(function (res) {
             obj = seggregateDate(res);
             previous.past = obj.past;
             previous.present = obj.present;
             previous.future = obj.future;

                previous.show=true;
                previous.hide=false;
                previous.appointments = res;

            }, function (err) {


            })
        }
        previous.getReview = function(index,date,user,sex,symptoms){
          var  data = {
              index : index,
              date : date,
              user : user,
              sex : sex,
              symptoms : symptoms,
              regNum : $window.sessionStorage.getItem("reg")

          }
            dataFactory.setData(data);

            var modalInstance = $uibModal.open({
                templateUrl: 'templates/review.html',
                controller: ReviewCtrl,
                resolve: {
                    review: function () {
                        return previous.review;
                    }
                }
        })



}
function seggregateDate(data) {

  var obj = {
      past: [],
      present: [],
      future: []
  };
  for (i = 0; i < data.length; i++) {
      var one_day = 1000 * 60 * 60 * 24;
      var milDiff = new Date(data[i].date).getTime() - new Date().getTime();
      var diff = Math.round(milDiff / one_day);

      if (diff == 0) {

          obj.present.push(data[i]);
      }
      if (diff < 0) {

          obj.past.push(data[i]);
      }
      if (diff > 0) {

          obj.future.push(data[i]);


      }
  }

  return obj;
}
previous.edit = function (index,date,user,sex,symptoms,doc,age,contact) {

$rootScope.userInfo.user = $window
  .sessionStorage
  .getItem("user");
$rootScope.userInfo.reg = $window
  .sessionStorage
  .getItem("reg");

$rootScope.userInfo.userApp = user;
$rootScope.userInfo.age = age;
$rootScope.userInfo.sex = sex;
$rootScope.userInfo.doc = doc;
$rootScope.userInfo.date = date;

$rootScope.userInfo.contact=contact;

$rootScope.userInfo.symptoms = symptoms;
  var modalInstance = $uibModal.open({
      templateUrl: 'templates/edit-form.html',
      controller: AppEditCtrl,
      resolve: {
          editForm: function () {
              return previous.editForm;
          }
      }
  })
}
previous.delete = function(index,date,user,sex,symptoms,doc,age,contact){
$rootScope.select = {
regNum : $window
  .sessionStorage
  .getItem("reg"),
user : $window
  .sessionStorage
  .getItem("user"),
email : $window
  .sessionStorage
  .getItem("email"),
date : date,
userName : user,
gen : sex,
symp : symptoms,
doc : doc,
age : age,
phone : contact
}
  var modal = $uibModal.open({
    templateUrl: 'templates/delete-form.html',
    controller: DeleteAppCtrl,
    resolve: {
        deleteForm: function () {
            return previous.deleteForm;
        }
    }
})
}

    }



