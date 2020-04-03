function createAssets(item, count, spaceBetween, rightMax){
    // var parentNull = createNull(item, count, spaceBetween, rightMax);
    var parentNull;
    createSolid(item, count, spaceBetween, parentNull);
    createText(item, count, spaceBetween, parentNull);
} ;

function makeVertices(item, count, spaceBetween, rightMax){
    var spreadValue = spaceBetween * count;
    var proportionalY = chartBase - (item['Yield % (RIGHT)'] * compSizeY / rightMax * 0.75) ;    
    var vertex = [spreadValue + xPadding, proportionalY];
    return vertex; 
}

function createLine(verts){

    var myShapeLayer = myComp.layers.addShape();
        myShapeLayer.name = "Line";
        myShapeLayer.position.setValue([ 0, 0 ]);

    var myShapeLayerContents = myShapeLayer("ADBE Root Vectors Group");        
    var myShapeGroup = myShapeLayerContents.addProperty("ADBE Vector Group");
    var myShapeContents = myShapeGroup.property("ADBE Vectors Group");
    var myPathGroup = myShapeContents.addProperty("ADBE Vector Shape - Group");
    var myPath = myPathGroup.property("ADBE Vector Shape");
    var myShape = new Shape();
        myShape.vertices = verts;
        myShape.closed = false;
        myPath.setValue(myShape);

    var myStrokeProperties = myShapeContents.addProperty("ADBE Vector Graphic - Stroke");
        myStrokeProperties.property("ADBE Vector Stroke Width").setValue(lineWidth);
        myStrokeProperties.property("ADBE Vector Stroke Color").setValue(lineColor);

    var myTrim = myShapeContents.addProperty("ADBE Vector Filter - Trim");
        myTrim.property("ADBE Vector Trim End").setValuesAtTimes([0,5],[0,100]);
        myTrim.property("ADBE Vector Trim End").setTemporalEaseAtKey(1, [easeIn], [easeOut]);
        myTrim.property("ADBE Vector Trim End").setTemporalEaseAtKey(2, [easeIn], [easeOut]);
        myTrim.property("ADBE Vector Trim End");

        myTrimProp.addToMotionGraphicsTemplate(myComp);

};

function createNull(item, count, spaceBetween, rightMax){
    var myNull = myComp.layers.addNull(sceneLength);
    var spreadValue = spaceBetween * count;
    var proportionalY = chartBase - (item['Yield % (RIGHT)'] * compSizeY / rightMax * 0.75) ;
    // $.writeln(proportionalY);
    myNull.name = 'null-' + item.FIELD1;
    myNull.position.setValue([ spreadValue + xPadding, proportionalY  ]);
    myNull.scale.setValue([ spaceBetween * 0.85, spaceBetween * 0.85 ]);
    return myNull;
}; 

function createSolid(item, count, spaceBetween, parentNull){
    if( count % 2 == 0){
    var mySolid = myComp.layers.addSolid(barColor ,  'solid-' + item.FIELD1, 10, 80, 1, sceneLength);
    var spreadValue = spaceBetween * count;
    mySolid.position.setValue([spreadValue + xPadding, chartBase]);
    //mySolid.parent = parentNull;
    }
}; 
 
 function createText(item, count, spaceBetween, parentNull){
    if( (count +5) % 10 == 0){
        var myText = myComp.layers.addText(item.FIELD1); 
        var textProperty = myText.property("Source Text").value;
        var spreadValue = spaceBetween * count;
        myText.position.setValue([spreadValue + xPadding, chartBase + 100]);        
        textProperty.fontSize = 30;
        textProperty.justification= ParagraphJustification.CENTER_JUSTIFY;
        myText.property("Source Text").setValue(textProperty);        
    }
}; 