var app = angular.module('app')

app.controller('ListingCtrl', function ($scope, ListingData, ListingService, $stateParams) {
    
    $scope.listings = ListingData.data;

    $scope.showLisitingOptionsModal = ListingService.showListingModal;    
    
    $scope.$watch(function () {
                return ListingService.showListingModal;
            }, function() {
                 $scope.showLisitingOptionsModal = ListingService.showListingModal;
            }, true);

    $scope.listingOptionsModal = function (listing) {
        ListingService.selectedListing = listing;
        ListingService.showListingModal = true;
        console.log(listing);
    } 

    $scope.deletelisting = function (id) {
               console.log("deletelisting -- id", id)
                ListingService.deletelisting(id)
                    .then(function (data) {
                        
                        ListingService.getListings($stateParams.user)
                            .then(function(data) {
                                $scope.listings = data.data
                                ListingService.showListingModal = false;
                                ListingService.show_listing_confirm_delete = false;
                            })

                    }, function (err) {
                        console.log(console.log(err))
                    })
            }
    
})


