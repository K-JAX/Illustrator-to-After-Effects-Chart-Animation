
/* Shims array.forEach() function */
Array.prototype.forEach||(Array.prototype.forEach=function(r,o){var t,n;if(null==this)throw new TypeError(" this is null or not defined");var e=Object(this),i=e.length>>>0;if("function"!=typeof r)throw new TypeError(r+" is not a function");for(arguments.length>1&&(t=o),n=0;n<i;){var f;n in e&&(f=e[n],r.call(t,f,n,e)),n++}});

/* User params */
var compSizeX = 1920,
    compSizeY = 1080,
    sceneLength = 30; 


/* Other spacial params */
var xPadding = 30;

var projItems = app.project.items;
/* How to create a new comp */
var myComp = projItems .addComp('chart', compSizeX, compSizeY, 1,  sceneLength , 24);

function readJSONFile(file){
    file.open("r");
    var data = file.read();
    file.close();
    data = JSON.parse(data);
    createLayers(data);
    }
 
 function createLayers(data){
    var count = 0;
    var total= data.length;
    var spaceBetween = (compSizeX - xPadding*1.5) / total ;
 
     data.forEach(function (arrayItem){
         createAssets(arrayItem, count, spaceBetween);
         count += 1;
         });
        
     }
 
function createAssets(item, count, spaceBetween){
    var parentNull = createNull(item, count, spaceBetween);
    createSolid(item, count, spaceBetween, parentNull);
    
    } 
 
function createNull(item, count, spaceBetween){
    var myNull = myComp.layers.addNull(sceneLength);
    var spreadValue = spaceBetween * count;
    myNull.name = 'null-' + item.FIELD1;
    myNull.position.setValue([spreadValue + xPadding, compSizeY*0.75]);
    myNull.scale.setValue([ spaceBetween * 0.85, spaceBetween * 0.85 ]);
    return myNull;
    
    }; 

function createSolid(item, count, spaceBetween, parentNull){
    var mySolid = myComp.layers.addSolid([1,1,1],  'solid-' + item.FIELD1, 10, 80, 1, sceneLength);
    var spreadValue = spaceBetween * count;
    mySolid.position.setValue([spreadValue + xPadding, compSizeY*0.75]);
    mySolid.parent = parentNull;
    }; 
 
 readJSONFile(File("~/Documents/ICM/Post-Chart-Template/data.json"));

/*
for (i=0; i < 5; i++){
myComp.layers.addNull(100);    
}
*/