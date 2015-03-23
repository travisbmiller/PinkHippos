var app = angular.module('app')

app.service('PublicListingService', function ($http) {
    this.getlisting = function (id) {
        return $http({
            method: 'GET',
            url: '/api/listing/' + id
        })
    }
})