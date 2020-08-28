function myFunction() {
//======================================================================
  var seen_url_col = 'C';  // 輸入url的欄位
  var seen_start_row = 2; // 第一個網址的 row index // starting from 1
  var seen_end_row = 2; // 最後一個商品的 row index // 超過沒關係
  var seen_target_shopid_col = 'A'; // 寫入shopid的欄位
  var seen_target_itemid_col = 'B'; // 寫入itemid的欄位
//======================================================================
  var sheet = SpreadsheetApp.getActiveSheet();
  var sheetdata = sheet.getDataRange().getValues();
  
  var url_col = letter2index(seen_url_col);
  var start_row = seen_start_row - 1;
  var end_row = seen_end_row - 1;
  var target_target_shopid_col = letter2index(seen_target_shopid_col);
  var target_target_itemid_col = letter2index(seen_target_itemid_col);
  
  for (var i = start_row; i < end_row + 1; i++) {
    // if blank, continue
    if (null==sheetdata[i][url_col] || " "==sheetdata[i][url_col] || ""==sheetdata[i][url_col]) {
      continue;
    }
    // get url
    var url = sheetdata[i][url_col];
    var url = url.split('.');
    var shopid = url[url.length-2];
    var itemid = url[url.length-1];
    sheet.getRange(i + 1, target_target_shopid_col + 1).setValue(shopid);
    sheet.getRange(i + 1, target_target_itemid_col + 1).setValue(itemid);
  } 
}
function letter2index(seen_letters) {
  seen_letters = seen_letters.toUpperCase();
  var sum = 0;
  for(i = 0; i < seen_letters.length; i++) {
    var chr = seen_letters.charCodeAt(i);
    var sum = sum * 26 + chr - 65 + 1;
  }
  return sum - 1;
}
