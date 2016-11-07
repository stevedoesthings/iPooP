function doGet() {
  return HtmlService
      .createTemplateFromFile('index')
      .evaluate()
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
}

function DiarrheaStatus() {
  
  var ss = SpreadsheetApp.openById('1z4UsIdaKd-HIAdphGjEPDE_2cKBOLSP5xtP3TogyqF4'); // get the spreadsheet
  var sheet = ss.getSheetByName('Form responses 1'); // get the sheet
  var aValues = sheet.getRange('A2:'+sheet.getLastRow()).getValues(); // gets the timestamp
  var bValues = sheet.getRange('B2:'+sheet.getLastRow()).getValues(); // gets the type
  var count = 0;
  var type = '', display = '';
  
  for (var i = 0; i < aValues.length; i++) { // checks if the entry is from today
    var today = Date(); // get date today
    var todayStr = today.toString();
    var datadayStr = aValues[i][0].toString();
    var datadayRes = datadayStr.substr(0, 10);
    var todayRes = todayStr.substr(0, 10);
    
    if (datadayRes == todayRes){ // counts
      count++;
      type = bValues[i][0];   
    }
    
    if (type.indexOf("rr") > -1){  // checks if entry was marked Diarrhea
      display = 'Diarrhea ... - ' +count;
    } else if (count >= 3){ // if you've pooped 3 times or more you have Diarrhea
      display = 'Diarrhea ... - ' +count;
    } else {
      display = 'No Diarrhea! - ' +count;
    }
  }
  
  return display;
}