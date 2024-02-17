// // polyfills required by exceljs
// require('core-js/modules/es.promise');
// require('core-js/modules/es.string.includes');
// require('core-js/modules/es.object.assign');
// require('core-js/modules/es.object.keys');
// require('core-js/modules/es.symbol');
// require('core-js/modules/es.symbol.async-iterator');
// require('regenerator-runtime/runtime');

const Excel = require("exceljs");

function loadPlaylist() {
    //date = document.getElementById("date");
    
    // Get date from spreadsheet and assign to inner html
    //date.innerHTML = "curr_date";

    // Create text for playlist to be put underneath date
    var text = "";

    const data = readPlaylist();
    console.log("read playlist");
    for(var i = 0; i < data.length; i++){
        text += data[i][0] + " - " + data[i][1];
        console.log(data[i]);
    }

    //date.innerHTML = text;
}


/**
 * Reads excel spreadsheet and produces two lists
 * One list for artist names
 * Another for song titles
 * 
 */
function readPlaylist() {
    var workbook = new Excel.Workbook();
    var data = workbook.csv.readFile("./playlist.xlsx").then(function () {
        var rowData = [];
        var worksheet = workbook.getWorksheet("./playlist.xlsx");
        var rows = worksheet.rowCount;
        for(var i = 1; i <= rows; i++) {
            var row = worksheet.getRow(i);
            rowData[i - 1] = new Array(row.cellCount);
            for(var j = 1; j<= row.cellCount; j++) {
                rowData[i -1][j -1] = row.getCell(j).value;
            }
        }

        return rowData;
    });

    return data;
}


loadPlaylist();

data = readPlaylist();
console.log(data);