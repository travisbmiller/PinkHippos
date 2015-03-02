var app = angular.module("app", ['ui.router']);

app.config(function ($stateProvider,$urlRouterProvider) {
    $stateProvider
        .state('login', {
          url: "/",
          templateUrl: "js/loginView/loginTemp.html",
          controller: 'LoginCtrl'
        })


        $urlRouterProvider.otherwise('/');
})