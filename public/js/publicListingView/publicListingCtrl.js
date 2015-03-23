var app = angular.module('app')

app.controller('PublicListingCtrl', function ($scope, ListingData){
  
    console.log("public listing controller")
    
    
    console.log(ListingData.data[0])
    $scope.listing = ListingData.data[0]
    
    if(ListingData.data[0].img[0].url) {
        $scope.listing.img = ListingData.data[0].img[0].url
         console.log($scope.listing.img)
    }
   

    $scope.post_a_question = false;
    $scope.login_pop_up = false;


})