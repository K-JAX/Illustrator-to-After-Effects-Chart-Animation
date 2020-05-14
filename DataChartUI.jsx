function createUI(thisObj) {
    var myPanel =
        thisObj instanceof Panel
            ? thisObj
            : new Window("palette", "Data Driven Chart Creator", undefined, {
                  resizeable: true,
              });
    var loadButton = myPanel.add("button", [10, 10, 100, 30], "Load Data");
    var createButton = myPanel.add("button", [10, 10, 100, 30], "Create Comp");
    var resetButton = myPanel.add("button", [10, 10, 100, 30], "Reset");

    loadButton.onClick = function() {
        loadData();
    }
    
    createButton.onClick = function () {
        createComp();
    };

    resetButton.onClick = function () {
        deleteEverything();
    }

    return myPanel;
}

var myScriptPal = createUI(this);
if (myScriptPal != null && myScriptPal instanceof Window) {
    myScriptPal.center();
    myScriptPal.show();
}

function loadData() {
    var dataFile = File.openDialog();
    if (dataFile && dataFile.open("r")){
        var data = JSON.parse(dataFile.read());
        dataFile.close();
        
    };
}

function createComp() {

    // app.project.importFileWithDialog();
    
    #include './main.jsx';

}

#include './lib/foreach-shim.jsx';

function deleteEverything() {
    var allAssets = app.project.items;
    for(var i = 0; i < allAssets.length; i++){
        app.project.item(1).remove();
    }
}

// {
//   function myScript(thisObj) {
//     function myScript_buildUI(thisObj) {
//       var myPanel =
//         thisObj instanceof Panel
//           ? thisObj
//           : new Window("palette", "AK_toolkit_V01", undefined, {
//               resizeable: true,
//             });

//       res =
//         "group{orientation:'row',\
// 				myTabbedPanel: Panel{type:'tabbedpanel', text:'',\
// 					myTab1: Panel{type:'tab', text:'tab1',\
// 						myTabContent1: Button{text:'my tabbed button1'},\
// 						myTabContent2: Button{text:'my tabbed button2'},\
// 						myTabContent3: Button{text:'my tabbed button3'},\
// 						myTabContent4: Button{text:'my tabbed button4'},\
// 						myTabContent5: Button{text:'my tabbed button5'},\
// 					},\
// 					myTab2: Panel{type:'tab', text:'tab2',\
// 					},\
// 					myTab3: Panel{type:'tab', text:'tab3',\
// 					},\
// 				},\
// 			}";

//       myPanel.grp = myPanel.add(res);

//       //Defaults
//       myPanel.grp.myTabbedPanel.myTab1.myTabContent1.onClick = function () {
//         alert("button 1 clicked");
//       };

//       myPanel.grp.myTabbedPanel.myTab1.myTabContent2.onClick = onTabClicked;

//       myPanel.layout.layout(true);

//       return myPanel;
//     }

//     function onTabClicked() {
//       alert(this.text + " button clicked");
//     }

//     var myScriptPal = myScript_buildUI(thisObj);

//     if (myScriptPal != null && myScriptPal instanceof Window) {
//       myScriptPal.center();
//       myScriptPal.show();
//     }
//   }
//   myScript(this);
// }
