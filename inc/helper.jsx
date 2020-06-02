function getMaxValue(data, columnName) {
    var overallArray = [];
    data.forEach(function (arrayItem) {
        if (!isNaN(arrayItem[columnName])) {
            overallArray.push(arrayItem[columnName]);
        }
    });
    var max = Math.max.apply(Math, overallArray);
    return max;
}

var getKeys = function (associativeArrayObject) {
    var arrayWithKeys = [],
        associativeArrayObject;
    for (key in associativeArrayObject) {
        // Avoid returning these keys from the Associative Array that are stored in it for some reason
        if (
            key !== undefined &&
            key !== "toJSONString" &&
            key !== "parseJSON"
        ) {
            arrayWithKeys.push(key);
        }
    }
    return arrayWithKeys;
};
