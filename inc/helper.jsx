function getMaxValue(data, columnName){
    var overallArray = [];
    data.forEach(function(arrayItem){
         if( !isNaN(arrayItem[columnName]) ){
            overallArray.push(arrayItem[columnName])
        }
     });
    var max = Math.max.apply(Math, overallArray);
    return max;
}