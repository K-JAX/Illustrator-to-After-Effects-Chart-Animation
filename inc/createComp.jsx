var projItems = app.project.items;
var myComp = projItems.addComp(
    "chart",
    compSizeX,
    compSizeY,
    1,
    sceneLength,
    24
);
myComp.openInViewer();
// myComp.openInEssentialGraphics();
var chartBase = compSizeY * 0.75;

// var myPanel = new Window("pallette", "Dockable Script", undefined, {resizeable: true, closeButton: true});

function createLayers(data) {
    var count = 0;
    var total = data.length;
    var spaceBetween = (compSizeX - xPadding * 1.5) / total;

    var leftMax = getMaxValue(data, leftFieldName);
    var rightMax = getMaxValue(data, rightFieldName);

    var chartMax = Math.ceil(leftMax / 10 + 1) * 10;

    createMasterNull();

    var vertices = [];

    // T=myComp.layers.addText();
    // T.name = "Timecode Burn";
    // T.startTime = 0;
    // T.outPoint = myComp.duration;
    // T.text.sourceText.expression = "thisComp.layer(\"Line\").content(\"Group 1\").content(\"Trim Paths 1\").end";
    // T.transform.position.setValue([100,80,0]);

    app.project.activeItem.motionGraphicsTemplateName = "Line Chart Controls";
    data.forEach(function (arrayItem) {
        if (chartType == "Line" || chartType == "Line & Bars") {
            vertices.push(
                makeVertices(arrayItem, count, spaceBetween, rightMax)
            );
        }
        createAssets(arrayItem, count, spaceBetween, rightMax);
        count += 1;
    });

    createLine(vertices);
}
