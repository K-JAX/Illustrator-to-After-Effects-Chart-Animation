function readJSONFile(file){
    file.open("r");
    var data = file.read();
    file.close();
    data = JSON.parse(data);
    createLayers(data);
}