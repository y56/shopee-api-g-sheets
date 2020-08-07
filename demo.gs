function myFunction() {
  
//======================================================================
  var seen_shopid_col = 'E'; // shop id的 column index // starting from A
  var seen_itemid_col = 'F'; // item id網址的 column index // starting from A
  var seen_start_row = 2; // 第一個網址的 row index // starting from 1
  var seen_end_row = 7; // 最後一個商品的 row index // 超過沒關係
  var seen_target_brand_col = 'A'; // 想要把品牌寫到這個column
  var seen_target_price_min_col = 'B'; // 想要把最低價寫到這個column
  var seen_target_price_max_col = 'C'; // 想要把最高價寫到這個column
  var seen_target_item_status_col = 'D'; // 想要把是庫存狀態寫到這個column
  var seen_target_item_name_col = 'I'; // 想要把產品名寫到這個column
//======================================================================
  
  var sheet = SpreadsheetApp.getActiveSheet();
  var sheetdata = sheet.getDataRange().getValues();
  
  var shopid_col = letter2index(seen_shopid_col);
  var itemid_col = letter2index(seen_itemid_col);
  var start_row = seen_start_row - 1;
  var end_row = seen_end_row - 1;
  var target_brand_col = letter2index(seen_target_brand_col);
  var target_price_min_col = letter2index(seen_target_price_min_col);
  var target_price_max_col = letter2index(seen_target_price_max_col);
  var target_item_status_col = letter2index(seen_target_item_status_col); 
  var target_item_name_col = letter2index(seen_target_item_name_col);
  
  for (var i = start_row; i < end_row + 1; i++) {
    // if blank, break
    if (null==sheetdata[i][shopid_col] || " "==sheetdata[i][shopid_col] || ""==sheetdata[i][shopid_col]) {
      break;
    }
    if (null==sheetdata[i][itemid_col] || " "==sheetdata[i][itemid_col] || ""==sheetdata[i][itemid_col]) {
      break;
    }
    // generate url and GET
    var itemid = sheetdata[i][itemid_col];
    var shopid = sheetdata[i][shopid_col];
    var url = "https://shopee.tw/api/v2/item/get?itemid=" + itemid + "&shopid=" + shopid;
    var response = UrlFetchApp.fetch(url, {'muteHttpExceptions': true});
    // parsing json
    var json = response.getContentText();
    var json = JSON.parse(json);
    // check for bad url
    if (null == json.item) {
      sheet.getRange(i + 1, target_brand_col + 1).setValue("Error! Bad URL!");
      sheet.getRange(i + 1, target_brand_col + 1).setBackground("red");
      continue;
    }
    // for brand
    // try to get info from json.item.attributes
    var item_list = json.item.attributes.filter(function(x) {
      if(x.name === "品牌") {
        return x;
      }
    });
    // if get nothing, try to get from json.item.brand
    if (item_list.length !== 0) {
      sheet.getRange(i + 1, target_brand_col + 1).setValue(item_list[0].value);
    } else if (json.item.brand != '' && json.item.brand != 0 && json.item.brand != '0' && json.item.brand != null){
      sheet.getRange(i + 1, target_brand_col + 1).setValue(json.item.brand);
    } else { // if both fail, color it
      sheet.getRange(i + 1, target_brand_col + 1).setBackground("red");
    }
    // for min price
    if (json.item.price_min != '' && json.item.price_min != 0 && json.item.price_min != '0' && json.item.price_min != null){
      sheet.getRange(i + 1, target_price_min_col + 1).setValue(json.item.price_min/100000);
    } else { // if fail, color it
      sheet.getRange(i + 1, target_price_min_col + 1).setBackground("red");
    }
    // for max price
    if (json.item.price_max != '' && json.item.price_max != 0 && json.item.price_max != '0' && json.item.price_max != null){
      sheet.getRange(i + 1, target_price_max_col + 1).setValue(json.item.price_max/100000);
    } else { // if fail, color it
      sheet.getRange(i + 1, target_price_max_col + 1).setBackground("red");
    }
   // for in stock/out of stock
    if (json.item.item_status != '' && json.item.item_status != 0 && json.item.item_status != '0' && json.item.item_status != null){
      sheet.getRange(i + 1, target_item_status_col + 1).setValue(json.item.item_status);
    } else { // if fail, color it
      sheet.getRange(i + 1, target_item_status_col + 1).setBackground("red");
    }
    // for 產品名
    if (json.item.name != '' && json.item.name != 0 && json.item.name != '0' && json.item.name != null){
      sheet.getRange(i + 1, target_item_name_col + 1).setValue(json.item.name);
    } else { // if fail, color it
      sheet.getRange(i + 1, target_item_name_col + 1).setBackground("red");
    }
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
