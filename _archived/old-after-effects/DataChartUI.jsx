var data = null,
    dataFile,
    chartType,
    axes,
    labels,
    chartMin,
    chartMax;
    
function createUI(thisObj) {
    var window =
        thisObj instanceof Panel
            ? thisObj
            : new Window("palette", "Data Driven Chart Creator", undefined, {
                  resizeable: true,
              });

            var grp = window.add("group");
                grp.orientation = "column";
                grp.alignment = ["fill", "fill"];
                grp.alignChildren = ["fill", "fill"];

            var myStructure = grp.add("group");
                myStructure.orientation = "row";
                myStructure.alignment = ["fill", "fill"];
                myStructure.alignChildren = ["fill", "fill"];
        
            var createButton = grp.add("button", undefined, "Create Comp");
            var loadButton = grp.add("button", undefined, "Load Data");
            var loadText = grp.add("statictext", undefined, "You gotta load the data file first :)");

            var chartTypePanel = grp.add("panel", undefined, "Chart Type");
                chartTypePanel.orientation = "row";
                chartTypePanel.alignChildren = ["fill", "fill"];
                chartTypePanel.LineRb = chartTypePanel.add( "radiobutton", undefined, "Line" );
                chartTypePanel.BarRb = chartTypePanel.add( "radiobutton", undefined, "Bar" );
                chartTypePanel.LineBarRb = chartTypePanel.add( "radiobutton", undefined, "Line & Bars" );
                chartTypePanel.LineRb.value = true;

            var chartFieldPanel = grp.add("panel", undefined, "Chart Fields*");
                chartFieldPanel.orientation = "row";
                chartFieldPanel.alignChildren = ["fill", "fill"];
                
            var xAxisText = chartFieldPanel.add("statictext", undefined, "x Axis Field")
            var xAxisDropdown = chartFieldPanel.add("dropdownlist", [0, 0, 80, undefined], [])
            var yAxisText = chartFieldPanel.add("statictext", undefined, "y Axis Field")
            var yAxisDropdown = chartFieldPanel.add("dropdownlist", [0, 0, 80, undefined], [])

            var labelLimitPanel = grp.add("panel", undefined, "Label limits*");
                labelLimitPanel.orientation = "row";
                labelLimitPanel.alignChildren = ["fill", "fill"];
            var xLabelLimitText = labelLimitPanel.add("statictext", undefined, "x Labels")
            var xLimit = labelLimitPanel.add( "edittext", undefined, "4" );
            var yLabelLimitText = labelLimitPanel.add("statictext", undefined, "y Labels")
            var yLimit = labelLimitPanel.add( "edittext", undefined, "4" );

            var otherSettingsPanel = grp.add("panel", undefined, "Other settings*");
                otherSettingsPanel.orientation = "row";
                otherSettingsPanel.alignChildren = ["fill", "fill"];
            var minChartLabel = otherSettingsPanel.add( "statictext", undefined, "Minimum Chart Value?" );
            var minChartOption = otherSettingsPanel.add( "checkbox", undefined, "" );
            var minChartValue = otherSettingsPanel.add( "edittext", undefined, "" );

            yAxisDropdown.onChange = function(){
                getFieldValues(xAxisDropdown.selection, yAxisDropdown.selection);
                if (axes.y !== null){
                    var minChartApprox = getMinnish(data, axes.y);
                    chartMax = getMaxish(data, axes.y);
                    if(!isNaN(minChartApprox) && minChartApprox != Infinity){
                        minChartValue.text = minChartApprox;
                    }else{
                        minChartValue.text = '';
                    }
                }
            }

            minChartOption.onClick = function(){
                if( minChartOption.value == true ){
                    minChartValue.enabled = true;
                }else{
                    minChartValue.enabled = false;
                }
            }

            var resetButton = grp.add("button", undefined, "Reset");

    createButton.enabled = false;
    chartTypePanel.enabled = false;
    chartFieldPanel.enabled = false;
    labelLimitPanel.enabled = false;
    minChartValue.enabled = false;
    
    loadButton.onClick = function() {
        loadData();
        

        if( data !== null){
            createButton.enabled = true;
            chartTypePanel.enabled = true;
            chartFieldPanel.enabled = true;
                labelLimitPanel.enabled = true;

            loadText.text = "File: " + dataFile.toString();
            var keyFields = getKeys(data[0]);
            xAxisDropdown.removeAll();
            yAxisDropdown.removeAll();
            keyFields.forEach(function(key){
                xAxisDropdown.add( 'item', key )
                yAxisDropdown.add( 'item', key )
            });
            xAxisDropdown.selection=0;
            yAxisDropdown.selection=0;
        }

    }
    
    createButton.onClick = function () {
        getChartTypeValues(chartTypePanel);
        getLabelLimits(xLimit.text, yLimit.text);
        getUserChartMin(minChartOption.value, minChartValue.text);
        
        createComp();
    };

    resetButton.onClick = function () {
        deleteEverything();
    }

    return window;
}

var myScriptPal = createUI(this);
if (myScriptPal != null && myScriptPal instanceof Window) {
    myScriptPal.show();
    myScriptPal.center();
}

function getChartTypeValues(rbGroup){
    switch (true){
        case rbGroup.LineRb.value === true:
            chartType = rbGroup.LineRb.text;
            break;
        case rbGroup.BarRb.value === true:
            chartType = rbGroup.BarRb.text;
            break;
        case rbGroup.LineBarRb.value === true:
            chartType = rbGroup.LineBarRb.text;
            break;
    }
    return chartType;
}

function getFieldValues(xAxis, yAxis){
    axes = {x: xAxis, y: yAxis};
    return axes;
}

function getLabelLimits(xLimit, yLimit){
    labels = {x: xLimit, y: yLimit};
    return labels;
}

function getUserChartMin(enabled, userVal){
    if(enabled == true && userVal != ''){
        chartMin = userVal;
    }else{
        chartMin = 0;
    }
    return chartMin;
}

function loadData() {
    dataFile = File.openDialog('Load data file', '*.json' );

    if (dataFile && dataFile.open("r")){
        data = JSON.parse(dataFile.read());
        dataFile.close();
    };
    return data;
}

function createComp() {
    #include './main.jsx';
}

function deleteEverything() {
    var allAssets = app.project.items;
    for(var i = 0; i < allAssets.length; i++){
        app.project.item(1).remove();
    }
}

#include './lib/json2.js';
#include './lib/polyfills.jsx';
#include './inc/helper.jsx';
