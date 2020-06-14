// get max value from an array
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

// pad the end of a number with 0s
function padEnd(number, padding) {
    // var newNum;
    for (var n = 0; n < padding; n++) {
        number = number.toString().concat("0");
    }
    var newNum = number;
    return newNum;
}

// get an approximate minimal number based on average number of data
function getMinnish(data, columnName) {
    var overallArray = [];
    data.forEach(function (arrayItem) {
        if (!isNaN(arrayItem[columnName])) {
            overallArray.push(arrayItem[columnName]);
        }
    });
    var min = Math.floor(Math.min.apply(Math, overallArray) * 0.9);

    if (min.toString().length < 3) {
        var paddingAmount = min.toString().length - 3;
    } else {
        var paddingAmount = min.toString().length - 2;
    }

    var paddedNumber = padEnd("1", paddingAmount);

    var paddedMin = Math.floor(min / paddedNumber) * paddedNumber;
    return paddedMin;
}

// get an approximate maximum number based on average number of data
function getMaxish(data, columnName) {
    var max = Math.ceil(getMaxValue(data, columnName) * 1.05);

    if (max.toString().length < 3) {
        var maxPaddingAmount = max.toString().length - 3;
    } else {
        var maxPaddingAmount = max.toString().length - 2;
    }

    var paddedNumber = padEnd("1", maxPaddingAmount);

    var paddedMax = Math.ceil(max / paddedNumber) * paddedNumber;

    return paddedMax;
}

// split a number into steps of multiples based on user input of label numbers
function getArrayStep(labelNum, max, min) {
    var stepArray = [];
    var totalAmountToStep = max - min;

    for (var n = 0; n < parseInt(labelNum) + 1; n++) {
        var value = Math.round((totalAmountToStep / labelNum) * n);
        stepArray.push(value);
    }
    return stepArray;
}
