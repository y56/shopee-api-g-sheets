# shopee-api-g-sheets

## id2info
### usage
* Find desired info by google app script in google sheets through shopee's api.
* Modify the column/row index in the script.
* [Tools] --> [Script editor] --> paste and run
### shopee api and json
You may use  
    https://jsonformatter.org/  
to know the hierarchy of json from example like    
    https://shopee.tw/api/v2/item/get?itemid=1913016333&shopid=81844674
### Demo
https://docs.google.com/spreadsheets/d/1AOl1VAVnBFFFm539DNfhQbSR-CX3vxvUy3r5D8oZgUM/edit?usp=sharing  
In the demo sheet, info such as below are shown. 
* brand name
* min price
* max price
* item status (out-of-stock)
### trouble shooting
* Frequent access to the api may cause interruption while running the program. To avoid redundancy, remember to resume from an unprocessed row.
* The G Suite limits each execution to 30 min. Approximately, each row consumes 1 sec if calling api. To avoid redundancy, remember to resume from an unprocessed row. For more about the limits or quota, please see 
## url2id

# 使用步驟
1. 打開需要撈出資料名單的Google Sheet（商品名單必須包含 shop_id 及 item_id）
2. 按工具欄第七個「Tool」的第二個「<> Script editor」
3. Script.google.com 畫面跳出後，將程式碼複製貼上到 Code.js 欄位，並修改前面虛線欄位中的黃底位置文字
* 先告訴程式碼要讀取資料的位置在哪
Shop ID 在資料名單的哪一欄：var seen_shopid_col = 'G'; // shop id的 column index // starting from A
Item ID 在資料名單的哪一欄：var seen_itemid_col = 'C'; // item id網址的 column index // starting from A
資料從哪一列開始讀取：var seen_start_row = 2; // 第一個網址的 row index // starting from 1
資料從哪一列結束讀取：var seen_end_row = 88; // 最後一個商品的 row index // 超過沒關係
再告訴程式碼找完資料後要放哪（同一個分頁的哪一欄）
找出來的品牌要放哪一欄：var seen_target_brand_col = 'O'; // 想要把品牌寫到這個column
找出來的最低價要放哪一欄：var seen_target_price_min_col = 'P'; // 想要把最低價寫到這個column
找出來的最高價要放哪一欄：var seen_target_price_max_col = 'Q'; // 想要把最高價寫到這個column
找出來的庫存狀態要放哪一欄：var seen_target_item_status_col = 'R'; // 想要把寫到這個column  // 
4. 選擇「myFunction」、按下旁邊的「Run」
5. 第一次使用會需要 shopee.com 的授權，按下同意即可
6. 依照資料的多寡會需要不同時間等待資料跑出來，一分鐘約300筆
7. 若過多次處存取，會被蝦皮網站擋住，此時若資料還沒抓完，則需等一下並調整「資料從哪一列開始讀取：var seen_start_row =」這個欄位的開始欄數
