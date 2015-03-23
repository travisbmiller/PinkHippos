var app = angular.module('app')

app.directive('hideButton', function ($window) {
    return {
        restrict: 'A',
        controller: function ($scope) {
            
        },
        link: function (scope, el, attrs) {
            console.log($(window).height())
        

            $( window ).resize(function() {
               if ($(window).height() < 400) {
                console.log("hide btn")
                $('.buy_container_scroll').css({ "padding-bottom": "0px"})
                el.hide()
                } else {
                  el.show()  
                  $('.buy_container_scroll').css({ "padding-bottom": "80px"})
                } 
            });
        }
    }
})