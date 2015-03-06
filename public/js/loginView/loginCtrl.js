var app = angular.module('app');

app.controller('LoginCtrl', function ($scope, LoginService, $state, $timeout, WeatherService) {
    
    $scope.showSignIn = true;
    $scope.hidelogin = false;
    $scope.showErrorMsg = false;
    $scope.show_next_btn = true;
    $scope.showregisterstep1 = false;
    $scope.showregisterstep2 = false;
    $scope.showregisterstep3 = false;


    var getTemp = function () {
        WeatherService.getTemp()
            .then(function (data) {
                $scope.currentTemp = data.data.current_observation.temp_f
            }, function (err) {
                console.log(err)
            })
    }

    getTemp()

    $scope.showregistration = function () {
        
        $scope.showSignIn = false;
        $scope.hidelogin = true;
        $scope.showregisterstep1 = true;
        
    }

    $scope.signIn = function (user) {
        
        LoginService.login(user)
            .then(function (res) {
                console.log(res)
            }, function (err) {
                console.log("err", err)
                $scope.showErrorMsg = true;
                $scope.ErrorMsg = err.data
                $timeout(function () {
                    $scope.showErrorMsg = false
                }, 3000)
            })
    }

    $scope.createAccount = function (user) {
        
        delete user.test
        LoginService.register(user) 
            .then(function (res) {
                console.log(res)
                var userId = res.data._id
                console.log(userId)
                $state.go('user.dashboard', {user: userId})
            }, function (err) {
                console.log(err)
            })
    }


    $scope.changeStep = function () {
        
        if ($scope.showregisterstep1 === true) {
            
            $scope.showregisterstep1 = false
            $scope.showregisterstep2 = true
            
        } 
        else if ($scope.showregisterstep2 === true) {
            
            $scope.showregisterstep2 = false
            $scope.showregisterstep3 = true

        }


    }

    $scope.back = function () {
        
        if ($scope.showregisterstep1 === true) {
            
            $scope.showregisterstep1 = false
            $scope.showregisterstep2 = false
            $scope.showSignIn = true
            $scope.hidelogin = false;
            
        } 
        else if ($scope.showregisterstep2 === true) {
            
            $scope.showregisterstep2 = false
            $scope.showregisterstep1 = true
            
        }
        else if ($scope.showregisterstep3 === true) {
            $scope.showregisterstep3 = false
            $scope.showregisterstep2 = true
            $scope.showregisterstep1 = false

            
        }
    }


     
})