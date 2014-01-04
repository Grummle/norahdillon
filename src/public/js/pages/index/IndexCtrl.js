angular.module('norah').controller('IndexCtrl',function($scope, Image){
    $scope.perRow = 12;

    Image.get().then(function(images){
        $scope.images = images;
        $scope.partitions = partition(images,$scope.perRow);
    });

    $scope.increase = function(){$scope.perRow++;
        $scope.partitions = partition($scope.images,$scope.perRow);
    }

    $scope.decrease = function(){$scope.perRow--;
        $scope.partitions = partition($scope.images,$scope.perRow);
    }
    var partition = function(data,size){
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