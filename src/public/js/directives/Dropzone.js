angular.module('norah').directive('dropzone', function(){
    return {
        link:function(scope,element, attr){
            new Dropzone('#farker',{url:'/api/images/upload',autoProcessQueue:true});
        }
    };
});