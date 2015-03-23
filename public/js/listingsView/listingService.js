var app = angular.module('app')

app.service('ListingService', function ($http) {

    this.getListings = function (id) {
        
        console.log("getlisting for --", id)
        
        return $http({
            method: 'GET',
            url: '/api/listings/' + id
        }, function (data) {
            return data.data
        }, function (err) {
            return console.log(err)
        } )

    }

    this.getListing = function (id) {
        
        console.log("getlisting for --", id)
        
        return $http({
            method: 'GET',
            url: '/api/listing/' + id
        }, function (data) {
            return data.data
        }, function (err) {
            return console.log(err)
        } )

    }

    this.deletelisting = function (id) {
        console.log(id)
        return $http({
            method: 'DELETE',
            url: '/api/listing/' + id
        })
    }

    this.getPublicListing

    this.selectedListing = {};
    this.showListingModal = false;
    this.show_listing_confirm_delete = false;
})