function myFunction() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var data = sheet.getDataRange().getValues();
  var tmp = [];
  
  var row_name = 25; // the seen number - 1 // 有商品名的row number - 1
  var row_score = 46; // the seen number - 1 // 有總分的row number - 1
  var col_start = 10; // 第一個商品的column number -1
  var col_end = 100; // 比最後一個商品的column number 大就好
  
  for (var i = col_start; i < col_end; i++) {
    if (null==data[row_name][i] || " "==data[row_name][i] || ""==data[row_name][i]) {
      break;
    }
    tmp.push([ data[row_score][i], data[row_name][i] ]);
  }
  
  tmp.sort(function(x,y) { // 由大到小排序
      return x[0] == y[0] ? 0 : x[0] < y[0] ? 1 : -1;
    }
  )
  // 採 Standard competition ranking 規則 1,2,2,4
  var pre_score = -1;
  var pre_rank = -1;
  for (var i = 0; i < tmp.length; i++) {
    if (tmp[i][0] == pre_score) {
      sheet.appendRow([pre_rank, tmp[i][1], tmp[i][0]]);
    } else {
      sheet.appendRow([i+1, tmp[i][1], tmp[i][0]]);
      pre_rank = i+1;
      pre_score = tmp[i][0];
    }
  }
}
