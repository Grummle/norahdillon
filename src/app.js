
/**
 * Module dependencies.
 */
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

//setInterval(function(){dbjs.doSync(null,path.resolve("./"))},2000);

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
    fs.rename(req.files.file.path,path.join(__dirname, 'public/images/'+ new Date().getTime()),function(){});
    console.log('FILE:'+req.files.file.originalFilename);

    req.files.file.path
    res.send('douche');
    dbjs.doSync(function(){},'');
});

app.use('/api/images',function(req,res){
    fs.readdir(path.join(__dirname, 'public/images'),function(err,files){
        res.set('Content-Type','application/json');
        var files = _.chain(files).filter(function(name){
            return name !== '.DS_Store';
        }).filter(function(name){
                return !fs.statSync(path.join(path.join(__dirname, 'public/images'),name)).isDirectory() ;
            }).map(function(file){
                return {name:file}
            }).value();
        res.send(JSON.stringify(files));
    });
});

var getMetaDate = function(path){

};

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
