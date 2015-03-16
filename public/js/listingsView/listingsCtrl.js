var app = angular.module('app')

app.controller('ListingCtrl', function ($scope, ListingData) {
    console.log("listing ctrl")
    $scope.listings = ListingData.data

    console.log("listing data---", ListingData)
})


