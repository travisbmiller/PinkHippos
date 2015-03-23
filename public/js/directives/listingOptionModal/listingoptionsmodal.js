var app = angular.module('app')

app.directive('listingOptionModal', function () {
    return {
        restrict: 'E',
        scope: {
            listing: '=',
            deletelisting: '&'
        },
        templateUrl: './js/directives/listingOptionModal/listingoptionmodaltemp.html',
        controller: function ($scope, ListingService, $state) {
            
            $scope.show_listing_options = true;
            $scope.show_listing_confirm_delete = false;
            
            $scope.performDelete = function () {
                $scope.deletelisting({id: ListingService.selectedListing._id});
            }

            $scope.viewlisting = function () {
                console.log("go to view")
                console.log(ListingService.selectedListing._id)
                $state.go('previewListing', {listing: ListingService.selectedListing._id})
                ListingService.showListingModal = false;

            }

            $scope.editlisting = function () {
                console.log("Edit Listing")
            }

            $scope.closeModal = function () {
                ListingService.showListingModal = false;
            }

            $scope.showDelete = function () {
                $scope.show_listing_options = false;
                ListingService.show_listing_confirm_delete = true;
            }

            
            console.log($scope.Listing)

            $scope.$watch(function () {
                return ListingService.selectedListing
            }, function() {
                $scope.Listing = ListingService.selectedListing;
            }, true);

            $scope.$watch(function () {
                return ListingService.show_listing_confirm_delete;
            }, function() {
                $scope.show_listing_confirm_delete = ListingService.show_listing_confirm_delete;
            }, true);

        },
        link: function (scope, el, attrs) {
            el.on('click', function () {
                
                $(this).parent().next(".body_toggle").slideToggle()
                
            })  
        }
    }
})