var app = angular.module("app", ['ui.router', 'ngTouch']);

app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('login', {
            url: "/",
            templateUrl: "js/loginView/loginTemp.html",
            controller: 'LoginCtrl'
        })
        .state('user', {
            url: "/:user",
            templateUrl: "js/userView/userTemp.html",
            controller: 'UserCtrl'
        })
        .state('user.listing', {
            templateUrl: "js/dashboardView/dashboardTemp.html",
            controller: 'DashboardCtrl'
            // resolve: {
            //     UserData: function ($stateParams, UserService) {
            //         return UserService.getUser($stateParams.user)
            //     } 
            // }
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