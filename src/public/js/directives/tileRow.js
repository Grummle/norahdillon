angular.module('norah').directive('tileRow', function ($window) {
    return {
        scope: {
            images: '=tileRow'
        },
        template: '<div><img ng-repeat="i in images" ng-src="/images/thumb/{{i.name}}?dim=400" width="{{i.cWidth*factor}}"></div>',
        link: function (scope, element, attrs) {

            var width = $(window).width();
            var compute = function (image) {
                var hfactor = 1000/image.height;
                image.cHeight = 1000;
                image.cWidth = image.width * hfactor;
                console.log(image.width * hfactor)
            }
            _(scope.images).each(function (image) {
                compute(image);
            });
            var iWidth = _.chain(scope.images).pluck('cWidth').reduce(function (memo, num) {
                return memo + num;
            }, 0).value();
            scope.factor = width / iWidth;

            scope.$watch(function(){return $(window).width()},function(){

            })


        }
    };
});