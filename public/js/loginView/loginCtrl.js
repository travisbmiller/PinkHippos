var app = angular.module('app');

app.controller('LoginCtrl', function ($scope, LoginService, $timeout) {
    
    $scope.showSignIn = true;
    $scope.hidelogin = false;
    $scope.showregistration = function () {
        $scope.showSignIn = false;
        $scope.hidelogin = true;

    }

    $scope.signIn = function (user) {
        LoginService.login(user)
            .then(function (res) {
                console.log(res)
            }, function (err) {
                console.log(err)
            })
    }

    $scope.register = function (user) {
        LoginService.register(user) 
            .then(function (res) {
                console.log(res)
            }, function (err) {
                console.log(err)
            })
    }
     
})