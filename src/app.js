
/**
 * Module dependencies.
 */

var im = require('imagemagick');
var async = require('async');
var dbjs = require('./node_modules/dropbox_client/sync.js');
var fs = require('fs');
var coffee = require('coffee-script');
var express = require('express');
var http = require('http');
var path = require('path');
var jadeStatic = require('jade-static');
var qt = require('quickthumb');
var _ = require('underscore');
var im = require('imagemagick');
var path = require('path');
var k= require('./keeper');
var keeper = new k('./file_data','./public/images');
console.log(keeper);
keeper.refresh();
dbjs.doSync(keeper.refresh(),path.resolve("./"));
setInterval(function(){dbjs.doSync(keeper.refresh(),path.resolve("./"))},300000);

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(jadeStatic(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images/thumb', qt.static(path.join(__dirname, 'public/images')));


app.use('/api/images/upload',function(req,res){
    var newName =path.join(__dirname, 'public/images/'+ new Date().getTime()+path.extname(req.files.file.originalFilename));
    console.log(newName);
    fs.rename(req.files.file.path,newName,function(){});
    keeper.refresh().then(function(){
        res.set('Content-Type','application/json');
        res.send(JSON.stringify(_(keeper.data).filter(function(file){return file.name === path.basename(newName) })));
        var newFile = _(keeper.data).find(function(file){

        });
    });

});

app.use('/api/images',function(req,res){
        res.set('Content-Type','application/json');
        res.send(JSON.stringify(keeper.data));
});


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
