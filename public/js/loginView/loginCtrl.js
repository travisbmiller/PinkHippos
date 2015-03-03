var app = angular.module('app');

app.controller('LoginCtrl', function ($scope, LoginService) {
    
    $scope.signIn = function (user) {
        LoginService.login(user)
            .then(function (res) {
                console.log(res)
            }, function (err) {
                console.log(err)
            })
    }
     
})