angular.module('norah').controller('IndexCtrl',function($scope, Image){

    Image.get().then(function(images){$scope.images = images;});
});