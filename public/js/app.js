var app = angular.module("app", ['ui.router', 'ngTouch', "angularFileUpload"]);

app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('login', {
            url: "/",
            templateUrl: "js/loginView/loginTemp.html",
            controller: 'LoginCtrl'
        })
        .state('publicListing', {
            url: '/listing',
            templateUrl: 'js/publicListingView/publicListingTemp.html', 
            controller: 'PublicListingCtrl'
        })
        .state('user', {
            url: "/:user",
            templateUrl: "js/userView/userTemp.html",
            controller: 'UserCtrl',
            resolve: {
                UserData: function ($stateParams, UserService) {
                    return UserService.getUser($stateParams.user)
                } 
            }
        })
        .state('user.listings', {
            templateUrl: "js/listingsView/listingTemp.html",
            controller: 'ListingCtrl',
            resolve: {
                ListingData: function ($stateParams, ListingService) {
                    return ListingService.getListings($stateParams.user)
                } 
            }
        })
        .state('user.sold', {
            template: "<p>Sold view</p>",
            controller: function ($scope) {
                console.log("sold view")
            } 
            // resolve: {
            //     UserData: function ($stateParams, UserService) {
            //         return UserService.getUser($stateParams.user)
            //     } 
            // }
        })
        .state('user.selling', {
            template: "<p>Selling view</p>",
            controller: function ($scope) {
                console.log("selling view")
            } 
            // resolve: {
            //     UserData: function ($stateParams, UserService) {
            //         return UserService.getUser($stateParams.user)
            //     } 
            // }
        })
        .state('user.createlisting', {
            url: '/newlisting',
            templateUrl: 'js/newlistingView/newlistingTemp.html', 
            controller: 'NewListingCtrl'
            // resolve: {
            //     UserData: function ($stateParams, UserService) {
            //         return UserService.getUser($stateParams.user)
            //     } 
            // }
        })
        

        


        $urlRouterProvider.otherwise('/');
})