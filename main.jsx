/* User params */
var compSizeX = 1920,
    compSizeY = 1080,
    sceneLength = 30,
    lineColor = [0,1,0.75],
    lineWidth = 15,
    barColor = [0.6,0.9,1];

/* Other spacial params */
var xPadding = 40,
    leftFieldName= '12 Month Excess Return % (LEFT)',
    rightFieldName='Yield % (RIGHT)',
    easeIn = new KeyframeEase(0.5, 60),
    easeOut = new KeyframeEase(0.75, 35);

#include './lib/foreach-shim.jsx';

#include './inc/readJSON.jsx';

#include './inc/createComp.jsx';

#include './inc/createAssets.jsx';

#include './inc/helper.jsx';
 
 readJSONFile(File("~/Documents/ICM/Post-Chart-Template/data.json"));


 