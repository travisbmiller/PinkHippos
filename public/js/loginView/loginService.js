var app = angular.module('app')

app.service('LoginService', function ($http, $upload, $q) {
       
       this.currentUser = {user: "travis"}

       this.login = function (user) {
            return $http({
                method: 'POST',
                url: '/api/login',
                data: user
            })
       }

       this.getUser = function (id) {
          return $http({
            method: 'GET',
            url: '/api/getUser/' + id 
          })
       }

       this.register = function (user) {
          var dfd = $q.defer()
          console.log("user info --", user)

          var dataObj = {}

          dataObj.firstName = user.firstName
          dataObj.lastName = user.lastName
          dataObj.password = user.password
          dataObj.email = user.email
          dataObj.phone = {
            number: user.phone
          }
          dataObj.address = {
            address: user.address,
            address2: user.address2,
            city: user.city,
            state: user.state,
            zip: user.zip
          }

          // normal register without picture

          // return $http({
          //     method: 'POST',
          //     url: '/api/register',
          //     data: dataObj
          // })
          
          // registering with picture
          $upload.upload({
                    url: 'api/register',
                    file: user.pic,
                    data: dataObj
                }).progress(function (evt) {
                    
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file[0].name);
                }).success(function (data, status, headers, config) {
                    dfd.resolve(data)
                    console.log('file ' + config.file[0].name + ' uploaded. Response: ', data);
                });


          return dfd.promise


       }
})


              