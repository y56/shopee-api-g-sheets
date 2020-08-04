# shopee-api-g-sheets

## usage
* Find desired info by google app script in google sheets through shopee's api.
* Modify the column/row index in the script.
* [Tools] --> [Script editor] --> paste and run

## shopee api and json
You may use  
    https://jsonformatter.org/  
to know the hierarchy of json from example like    
    https://shopee.tw/api/v2/item/get?itemid=1913016333&shopid=81844674

## Demo
https://docs.google.com/spreadsheets/d/1AOl1VAVnBFFFm539DNfhQbSR-CX3vxvUy3r5D8oZgUM/edit?usp=sharing  
In the demo sheet, info such as below are shown. 
* brand name
* min price
* max price
* item status (out-of-stock)

## trouble shooting
* Frequent access to the api may cause interruption while running the program. To avoid redundancy, remember to resume from an unprocessed row.
* The G Suite limits each execution to 30 min. Approximately, each row consumes 1 sec if calling api. To avoid redundancy, remember to resume from an unprocessed row. For more about the limits or quota, please see 
