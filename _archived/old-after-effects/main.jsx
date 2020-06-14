/* User params */
var compSizeX = 1920,
    compSizeY = 1080,
    sceneLength = 30,
    chartHeight = 0.5, // 0.0 - 1.0
    lineColor = [0,1,0.75],
    lineWidth = 15,
    barColor = [0.6,0.9,1];

/* Other spacial params */
var xPadding = 40,
    yPadding = 4,
    leftFieldName=axes.y,
    rightFieldName=axes.y,
    easeIn = new KeyframeEase(0.5, 60),
    easeOut = new KeyframeEase(0.75, 35);

var splitLabelXArray = getArrayStep(labels.x, data.length, 0);
var splitLabelYArray = getArrayStep(labels.y, chartMax, chartMin);

#include './inc/createComp.jsx';

#include './inc/createAssets.jsx';

createLayers(data);

 