var app = angular.module('app');
app.controller('NewListingCtrl', function ($scope, $upload, $http, $state) {
   

 
    $scope.upload = function (data) {
        // if (files && files.length) {
        //     for (var i = 0; i < files.length; i++) {
        //         var file = files[i];

        $upload.upload({
            url: 'api/listing',
            file: data.picFile,
            data: {
                title: data.title,
                price: data.price,
                description: data.description,
                seller: $scope.user._id
            }
        }).progress(function (evt) {
            if (evt.file) {
                console.log("hit1")
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.file[0].name);
            }
        }).success(function (data, status, headers, config) {
            if (config.file) {
                console.log('file ' + config.file[0].name + ' uploaded. Response: ', data);
                $state.go('user.listings')
            } else {
                console.log(data)
                $state.go('user.listings')
            }
        });
           
    }





})