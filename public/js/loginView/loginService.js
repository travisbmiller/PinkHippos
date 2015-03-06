var app = angular.module('app')

app.service('LoginService', function ($http) {
       
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

          return $http({
              method: 'POST',
              url: '/api/register',
              data: dataObj
          })
       }
})