angular.module('norah').factory('Image', function ($http) {
    var Image = function (data) {
        angular.extend(this, data);
        this.thumb_url = '/images/thumb/' + this.name + '?dim=200x200';
    };

    Image.get = function () {
        return $http.get('/api/images').then(function (response) {
            return _(response.data).map(function (image) {
                return new Image(image);
            })
        })
    };

    return Image;
});