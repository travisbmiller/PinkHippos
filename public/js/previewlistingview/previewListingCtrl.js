var app = angular.module('app')

app.controller('PreviewListingCtrl', function ($scope, $window) {
    
    $scope.goBack = function () {
        $window.history.back();
    }
})