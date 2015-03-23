var app = angular.module('app')

app.controller('PreviewListingCtrl', function ($scope, $window, ListingData) {
    
    $scope.goBack = function () {
        $window.history.back();
    }

    console.log(ListingData.data[0])
    $scope.listing = ListingData.data[0]
    $scope.listing.img = ListingData.data[0].img[0].url
    console.log($scope.listing.img)

    
})