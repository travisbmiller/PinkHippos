var app = angular.module('app')

app.service('UserService', function ($http) {
    this.getUser = function (id) {
        return $http({
            method: "GET",
            url: 'api/user/' + id
        })
    }
})