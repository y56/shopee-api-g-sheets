function myFunction() {
//=====================================
  var col_num_of_id = 0;
  var col_num_of_val = 1;
//=====================================
  
// find the largest val in each id
  var sheet = SpreadsheetApp.getActiveSheet();
  var data = sheet.getDataRange().getValues();
  
  var pre_id = -1;
  var my_max = -1;
  var cur_id = -1;
  var cur_val = -1;
  var row_index = -1
    
  for (var i = 1; i < data.length; i++) { // 0 is for column name
    cur_id = data[i][col_num_of_id];
    cur_val = data[i][col_num_of_val];

    if (pre_id == cur_id) { // still the same id, update the max
      if (cur_val > my_max) {
        my_max = cur_val;
        row_index = i;
      }
    } else { 
      if (row_index!=-1) { // don't append when init
        sheet.appendRow(data[row_index]);
      }
      // update id
      my_max = -1;
    }
    pre_id = cur_id;
  }
  sheet.appendRow(data[row_index]);
}
