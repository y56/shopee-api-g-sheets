# shopee-api-g-sheets
## Tool: id2info.gs 用ID換資訊
### 使用時機
當已知shop_id 及 item_id，需要撈出
* 商品品牌名稱
* 折扣前價格
* 商品售價 (最高價與最低價)
* 商品是否仍有庫存
* 產品名稱
### Usage
* Find desired info by google app script in google sheets through shopee's api.
* Modify the column/row index in the script.
* [Tools] --> [Script editor] --> paste and run
### 使用步驟
1. 打開需要撈出資料名單的Google Sheet（商品名單必須包含 shop_id 及 item_id）
2. 按工具欄第七個「Tool」的第二個「<> Script editor」
3. Script.google.com 畫面跳出後，將程式碼複製貼上到 Code.js 欄位，並修改前面夾在虛線之間的欄位字母編號與行列數字編號
4. 先告訴程式碼要讀取資料的位置在哪
    * Shop ID 在資料名單的哪一欄：`var seen_shopid_col = 'G'; // shop id的 column index // starting from A`
    * Item ID 在資料名單的哪一欄：`var seen_itemid_col = 'C'; // item id的 column index // starting from A`
    * 資料從哪一列開始讀取：`var seen_start_row = 2; // 第一個網址的 row index // starting from 1`
    * 資料從哪一列結束讀取：`var seen_end_row = 88; // 最後一個商品的 row index // 超過沒關係`
5. 再告訴程式碼找完資料後要放哪（同一個分頁的哪一欄）
    * 找出來的品牌要放哪一欄：`var seen_target_brand_col = 'O'; // 想要把品牌寫到這個column`
    * 找出來的最低價要放哪一欄：`var seen_target_price_min_col = 'P'; // 想要把最低價寫到這個column`
    * 找出來的最高價要放哪一欄：`var seen_target_price_max_col = 'Q'; // 想要把最高價寫到這個column`
    * 找出來的庫存狀態要放哪一欄：`var seen_target_item_status_col = 'R'; // 想要把庫存狀態寫到這個column`
6. 選擇「myFunction」、按下旁邊的「Run」
7. 第一次使用會需要 shopee.com 的授權，按下同意即可
    * 依照資料的多寡會需要不同時間等待資料跑出來，1秒約1筆
    * 若過多次處存取，會被蝦皮網站擋住，此時若資料還沒抓完，則需等一下並調整「資料從哪一列開始讀取：`var seen_start_row` =」這個欄位的開始欄數

### Shopee API and JSON
To know the hierarchy of json. For example, copy the content of  
    https://shopee.tw/api/v2/item/get?itemid=1913016333&shopid=81844674  
and paste into   
    https://jsonformatter.org/  
### Demo
https://docs.google.com/spreadsheets/d/1AOl1VAVnBFFFm539DNfhQbSR-CX3vxvUy3r5D8oZgUM/edit?usp=sharing
or
https://docs.google.com/spreadsheets/d/1e0VBsYXsABDD4lhfava6b_cDWYzpbpMRTgW3oFSWbdk/edit?usp=sharing

In the demo sheet, info such as below are shown. 
* brand name
* min price
* max price
* item status (out-of-stock)
### Trouble shooting
* Frequent access to the api may cause interruption while running the program. To avoid redundancy, remember to resume from an unprocessed row.
* The G Suite limits each execution to 30 min. Approximately, each row consumes 1 sec if calling api. To avoid redundancy, remember to resume from an unprocessed row. For more about the limits or quota, please see https://developers.google.com/apps-script/guides/services/quotas

## Tool: url2id.gs 用URL換ID
### 使用時機
當已知商品URL，需要撈出商品shop_id和item_id時可使用
比如說網址長這樣
https://shopee.tw/Aprica-SMOOOVE-ISOFIX-專用提籃底座-黑諾【麗兒采家】-i.49937260.3117951278
那最後的兩個數字是shop_id和item_id

DEMO:  
https://docs.google.com/spreadsheets/d/1eU_FQedCiRebDXD8if4qxHTfZI4QD6ktZ8w5_zGzbzw/edit?usp=sharing

### 使用步驟
好讀google doc版本 by Hallie Shiao: https://docs.google.com/document/d/1uKt193OX3M5g_r3KIbM5EccIpPL-iy9r1TobMoVE8Cs/edit?usp=sharing
1. 打開需要撈出資料名單的Google Sheet（商品名單必須包含URL）
2. 按工具欄第七個「Tool」的第二個「<> Script editor」

  <img src="https://i.imgur.com/xRzmVU7.png" width="250" height="200" />

3. Script.google.com 畫面跳出後，將程式碼複製貼上到 Code.js 欄位，並修改前面夾在虛線之間的欄位字母編號與行列數字編號

4. 先告訴程式碼要讀取資料的位置在哪
   * URL 在資料名單的哪一欄：`var seen_url_col = 'F'; // shop id的 column index`
   * 資料從哪一列開始讀取：`var seen_start_row = 3; // 第一個網址的 row index`
   * 資料從哪一列結束讀取：`var seen_end_row = 89; // 最後一個商品的 row index // 超過沒關係`
5. 再告訴程式碼找完資料後要放哪（同一個分頁的哪一欄）
   * 找出來的 shop_id 要放哪一欄： `var seen_target_shopid_col = 'D'; `
   * 找出來的 item_id 要放哪一欄： `var seen_target_itemid_col = 'E'; `
4. 選擇「myFunction」、按下旁邊的「Run」

  <img src="https://i.imgur.com/cv18iYr.png"/>    

5. 第一次使用會需要 shopee.com 的授權，按下同意即可
6. 依照資料的多寡會需要不同時間等待資料跑出來，一分鐘約300筆
7. 若過多次處存取，會被蝦皮網站擋住，此時若資料還沒抓完，則需等一下並調整「資料從哪一列開始讀取：var seen_start_row =」這個欄位的開始欄數

## Tool: find-max.gs 找一群ID中分數最大的的ID和其分數
DEMO:
https://docs.google.com/spreadsheets/d/1VqnKjYOMA0qLLyZ0KqHnJ0ku3MwVH8-RiqD8nRnessQ/edit?usp=sharing

## Tool: ranker.gs 排名
DEMO:
https://docs.google.com/spreadsheets/d/19ZJxUfgyyiD4s2D0wgJABgU89M0WfZJ1DhNppy6h2NM/edit?usp=sharing
