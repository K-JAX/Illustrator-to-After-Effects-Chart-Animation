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
    leftFieldName= '12 Month Excess Return % (LEFT)',
    rightFieldName=axes.y,
    easeIn = new KeyframeEase(0.5, 60),
    easeOut = new KeyframeEase(0.75, 35);
    
#include './lib/foreach-shim.jsx';

#include './lib/json2.js'

#include './inc/createComp.jsx';

#include './inc/createAssets.jsx';

#include './inc/helper.jsx';
 
createLayers(data);

 