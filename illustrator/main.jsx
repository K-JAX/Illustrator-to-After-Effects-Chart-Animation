var doc = app.activeDocument;

var layers = doc.layers;

for (var n = 0; n < layers.length; n++) {
    // $.writeln(layers[n].name);
    layers[n].name = n;
}
