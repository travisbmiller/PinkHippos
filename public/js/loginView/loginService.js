var app = angular.module('app')

app.service('LoginService', function ($http) {
       
       this.login = function (user) {
            return $http({
                method: 'POST',
                url: '/api/login',
                data: user
            })
       }
})