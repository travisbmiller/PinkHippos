var app = angular.module('app')

app.service('WeatherService', function ($http) {

    this.getTemp = function () {
        return $http({
            method: 'GET',
            url: 'http://api.wunderground.com/api/97e33a9ca3bb8054/conditions/q/UT/Provo.json'
        })
    }

})