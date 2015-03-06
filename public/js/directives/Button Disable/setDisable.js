var app = angular.module('app')

app.directive('setDisable', function () {
    return {
        restrict: 'A',
        scope: {
            isvalid: '='
        },
        controller: function ($scope) {
            console.log($scope.isvalid)
        },
        link: function (scope, el, attrs) {
            
        }
    }
})