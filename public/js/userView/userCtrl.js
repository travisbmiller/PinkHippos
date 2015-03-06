var app = angular.module('app')
app.controller('UserCtrl', function ($scope) {

    $scope.listing = true;
    $scope.selling = false;
    $scope.sold = false;  
    $scope.showSlideNav = false;

    $scope.slideNavLine = function (nav) {
        if (nav === "selling") {
            $scope.listing = false;
            $scope.selling = true;
            $scope.sold = false;  
        } else if (nav === "sold") {
            $scope.listing = false;
            $scope.selling = false;
            $scope.sold = true; 
        } else if (nav === "listing") {
            $scope.listing = true;
            $scope.selling = false;
            $scope.sold = false; 
        }
    }
})