angular.module('norah',['ngRoute']).config(function($routeProvider){
    $routeProvider.when('/',{
        controller:'IndexCtrl',
        templateUrl:'js/pages/index/index.html'
    });
});