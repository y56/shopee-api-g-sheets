function myFunction() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var data = sheet.getDataRange().getValues();
  
  for (var i = 0; i < 2; i++) {
    var tmp = String(data[0][i]);
    var tmp2 = tmp.split(" ");
    for (var j = 0; j < 2; j++) {
      Logger.log([tmp2[j]]);
      sheet.appendRow([tmp2[j]]);
    }
  }
  
}
    
