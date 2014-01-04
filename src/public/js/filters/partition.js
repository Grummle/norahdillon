angular.module('norah').filter('partition',function(){
    return function(data,size){
        if(!data)return data;
        var partitions = [];
        var current = [];
        var i = 0;
        for(var j=0;j<data.length;j++){
            if(i<size){
                current.push(data[j]);
                i++;
                if(i===size){
                    partitions.push(current);
                    current=[];
                    i=0;
                }
            }
        }
        partitions.push(current);
        return partitions;
    }
});