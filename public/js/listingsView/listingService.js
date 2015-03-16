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

})