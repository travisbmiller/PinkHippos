var app = angular.module('app')

app.controller('PublicListingCtrl', function ($scope) {
  
    console.log("public listing controller")
    $scope.post_a_question = false;
    $scope.login_pop_up = true;
})