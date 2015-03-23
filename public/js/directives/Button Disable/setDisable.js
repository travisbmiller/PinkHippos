var app = angular.module('app')

app.directive('slideToggleBody', function () {
    return {
        restrict: 'A',
        controller: function ($scope) {
            
        },
        link: function (scope, el, attrs) {
            // on page load have body hidden
            $(el).parent().next(".body_toggle").slideUp()

            // toggle body on click
            el.on('click', function () {
                console.log("I was clicked")
                console.log(el)
                $(this).parent().next(".body_toggle").slideToggle()
                
            })  
        }
    }
})