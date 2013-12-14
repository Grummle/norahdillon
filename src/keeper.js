var im = require('imagemagick');
var _ = require('underscore');
var path = require('path');
var fs = require('fs');
var q = require('q');

var Keeper = function (data_file_path, images_path) {
    this.data = JSON.parse(fs.readFileSync(data_file_path));

    this.getDimensions = function (path) {
        var defer = q.defer();

        im.identify(path, function (err, data) {
            if (data) {
                defer.resolve({width: data.width, height: data.height});
            }
            else defer.resolve({});
        })

        return defer.promise;
    }



    this.getImageFiles = function () {
        var deferred = q.defer();
        fs.readdir(path.resolve(images_path), function (err, files) {
            var files = _(files).filter(function (file) {
                var ext = path.extname(file).toLowerCase();
                return ext === '.jpg' || ext === '.png' || ext === '.gif';
            });
            deferred.resolve(files);
        });
        return deferred.promise;
    }

    this.refresh = function () {

        var that = this;
        return this.getImageFiles().then(function (files) {
            //remove from data where not in files
            that.data = _(that.data).filter(function (df) {
                return _(files).find(function (file) {
                    return file === df.name
                });
            });

            //add to data where in files
            _.chain(files).filter(function (f) {
                return !_(that.data).find(function (df) {
                    return df.name === f;
                })
            }).map(function (f) {
                    return {name: f}
                }).each(function (f) {
                    that.data.push(f);
                })

            return that.data;

        }).then(function (data) {
                var cbs = []
                _.chain(data).filter(function (df) {
                    return !(df.width && df.height);
                }).each(function (df) {
                        cbs.push(that.getDimensions('./'+path.join(images_path, df.name)).then(function(dim){
                            _.extend(df,dim);
                        }));

                    });
                return q.all(cbs).then(function () {
                    return data;
                })
            }).then(function (data) {
                console.log(data);
                //write to file
                fs.writeFile(path.resolve(data_file_path), JSON.stringify(data));

            });
    };

};

module.exports = Keeper;


