function createAssets(item, count, spaceBetween, rightMax) {
    // var parentNull = createNull(item, count, spaceBetween, rightMax);
    var parentNull;
    if (chartType == "Bar" || chartType == "Line & Bars") {
        createSolid(item, count, spaceBetween, parentNull, rightMax);
    }
    createText(item, count, spaceBetween, parentNull);
}

function createMasterNull() {
    var myNull = myComp.layers.addNull(sceneLength);
    myNull.source.name = "null-master-ctrl";

    // Add fill color
    myNull.Effects.addProperty("ADBE Fill");
    var myNullFill = myNull
        .property("Effects")
        .property("Fill")
        .property("Color");
    myNullFill.setValue(lineColor);
    myNullFill.addToMotionGraphicsTemplateAs(myComp, "Bar Color");
}

function makeVertices(item, count, spaceBetween, rightMax) {
    var spreadValue = spaceBetween * count;
    var yValue = getProportionalYValue(item["Yield % (RIGHT)"], rightMax);
    var vertex = [spreadValue + xPadding, yValue];
    return vertex;
}

function getProportionalYValue(dataColumn, rightMax) {
    var proportionalHeight = (dataColumn * compSizeY) / rightMax;
    var rawHeight = proportionalHeight * chartHeight;
    var yValue = chartBase - rawHeight;
    return yValue;
}

function createLine(verts) {
    var myShapeLayer = myComp.layers.addShape();
    myShapeLayer.name = "Line";
    myShapeLayer.position.setValue([0, 0]);

    var myShapeLayerContents = myShapeLayer("ADBE Root Vectors Group");
    var myShapeGroup = myShapeLayerContents.addProperty("ADBE Vector Group");
    var myShapeContents = myShapeGroup.property("ADBE Vectors Group");
    var myPathGroup = myShapeContents.addProperty("ADBE Vector Shape - Group");
    var myPath = myPathGroup.property("ADBE Vector Shape");
    var myShape = new Shape();
    myShape.vertices = verts;
    myShape.closed = false;
    myPath.setValue(myShape);

    // Add stroke width
    var myStrokeProperties = myShapeContents.addProperty(
        "ADBE Vector Graphic - Stroke"
    );
    myStrokeProperties.property("ADBE Vector Stroke Width").setValue(lineWidth);
    var myStrokeWidthProp = myStrokeProperties.property(
        "ADBE Vector Stroke Width"
    );
    myStrokeWidthProp.addToMotionGraphicsTemplateAs(myComp, "Stroke Width");

    // Add stroke color
    myStrokeProperties.property("ADBE Vector Stroke Color").setValue(lineColor);
    var myStrokeColorProp = myStrokeProperties.property(
        "ADBE Vector Stroke Color"
    );
    myStrokeColorProp.addToMotionGraphicsTemplateAs(myComp, "Stroke Color");

    // Add trim path
    var myTrim = myShapeContents.addProperty("ADBE Vector Filter - Trim");
    myTrim.property("ADBE Vector Trim End").setValuesAtTimes([0, 5], [0, 100]);
    myTrim
        .property("ADBE Vector Trim End")
        .setTemporalEaseAtKey(1, [easeIn], [easeOut]);
    myTrim
        .property("ADBE Vector Trim End")
        .setTemporalEaseAtKey(2, [easeIn], [easeOut]);
    var myTrimProp = myTrim.property("ADBE Vector Trim End");

    myTrimProp.addToMotionGraphicsTemplate(myComp);
}

// function createNull(item, count, spaceBetween, rightMax){
//     var myNull = myComp.layers.addNull(sceneLength);
//     var spreadValue = spaceBetween * count;
//     var proportionalY = chartBase - ( item['Yield % (RIGHT)'] * compSizeY / rightMax * chartHeightToComp ) ;
//     // $.writeln(proportionalY);
//     myNull.name = 'null-' + item.FIELD1;
//     myNull.position.setValue([ spreadValue + xPadding, proportionalY  ]);
//     myNull.scale.setValue([ spaceBetween * 0.85, spaceBetween * 0.85 ]);
//     return myNull;
// };

function createSolid(item, count, spaceBetween, parentNull, rightMax) {
    if (count % 2 == 0) {
        var yValue = getProportionalYValue(item["Yield % (RIGHT)"], rightMax);

        var width = 100;
        var height = chartBase - yValue;
        var mySolid = myComp.layers.addSolid(
            barColor,
            "solid-" + item.FIELD1,
            10,
            Math.floor(height),
            1,
            sceneLength
        );
        // $.writeln(mySolid.anchorPoint.value);
        mySolid.anchorPoint.setValue([0, height]);
        var yWithNewAnchorPoint = height / (height * 2);
        var spreadValue = spaceBetween * count;
        mySolid.position.setValue([
            spreadValue + xPadding,
            chartBase - yWithNewAnchorPoint,
        ]);

        // Add fill color
        mySolid.Effects.addProperty("ADBE Fill");
        var mySolidFill = mySolid
            .property("Effects")
            .property("Fill")
            .property("Color");
        mySolidFill.expression =
            'thisComp.layer("null-master-ctrl").effect("Fill")("Color")';

        var easeIn = new KeyframeEase(0.5, 50);
        var easeOut = new KeyframeEase(0.75, 85);
        var myScaleProperty = mySolid.property("Scale");
        var start = count * 0.1 - count * 0.06;
        var end = start + 7 * 0.1;
        myScaleProperty.setValuesAtTimes(
            [start, end],
            [
                [width, 0],
                [width, 100],
            ]
        );
        myScaleProperty.setTemporalEaseAtKey(
            2,
            [easeIn, easeIn, easeIn],
            [easeOut, easeOut, easeOut]
        );

        //mySolid.parent = parentNull;
    }
}

function createText(item, count, spaceBetween, parentNull) {
    if ((count + 5) % 10 == 0) {
        var myText = myComp.layers.addText(item[axes.x]);
        var textProperty = myText.property("Source Text").value;
        var spreadValue = spaceBetween * count;
        myText.position.setValue([spreadValue + xPadding, chartBase + 50]);
        textProperty.fontSize = 30;
        textProperty.justification = ParagraphJustification.CENTER_JUSTIFY;
        myText.property("Source Text").setValue(textProperty);
    }
}
