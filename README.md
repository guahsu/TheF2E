# 六角學院的 The F2E 挑戰

### [活動查詢頁面](https://guahsu.github.io/TheF2E/dist/index.html#/)
[CODE](https://github.com/guahsu/TheF2E/blob/master/src/components/Index.vue)  
[DEMO](https://guahsu.github.io/TheF2E/dist/index.html#/)  
> 第二週時重寫UI做的，可以LocalSearch各種作品的tag與日期，查參賽資訊

### 第一週 - TodoList：
1. [設計稿](https://hexschool.github.io/THE_F2E_Design/todolist/)  
2. [CODE](https://github.com/guahsu/TheF2E/blob/master/src/components/TodoList.vue)  
3. [DEMO](https://guahsu.github.io/TheF2E/dist/index.html#/1/todolist)  

週末一個下午拼完...寫得滿髒，  
等挑戰週都結束再找時間來整理T_T。  
第一週的心得是只有一天的話就不要自己在那邊徒手寫CSS了，  
決定下週開始的都使用ui framework來弄畫面囧

### 第二週 - Filter：
1. [設計稿](https://hexschool.github.io/THE_F2E_Design/week2-filter/)  
2. [CODE](https://github.com/guahsu/TheF2E/blob/master/src/components/Filter.vue)  
3. [DEMO](https://guahsu.github.io/TheF2E/dist/index.html#/2/filter)  

原本是照著刻畫面，後來實在是找不到什麼好用的API可以做出一樣的效果，  
就改用六角的活動API，然後來自己做local filter了..。  
> 這個算是只完成了UI，後來自己重新寫了一個活動查詢頁在最上面

### 第三週 - Admin Order:
1. [設計稿](https://hexschool.github.io/THE_F2E_Design/week3-admin%20order/)  
2. [CODE](https://github.com/guahsu/TheF2E/blob/master/src/components/AdminOrder.vue)  
3. [DEMO](https://guahsu.github.io/TheF2E/dist/index.html#/3/admin_order)  

這週僅有短短的時間可以做UI，全用elementUI來刻  
做得有點急，週一看到題目時還想說可以套filebase來玩..  
但真是一天時間不夠用啊Ｑ＿＿＿Ｑ

### 第四週 - Product Gallery
1. [設計稿](https://hexschool.github.io/THE_F2E_Design/week4-product%20gallery/)
2. [CODE](https://github.com/guahsu/TheF2E/blob/master/src/components/ProductGallery.vue)  
3. [DEMO](https://guahsu.github.io/TheF2E/dist/index.html#/4/product_gallery)  

非常有趣的設計排版練習，也是第一次實際使用Grid來做切版，  
做到第三個區塊發現css的重複性很高，就改採用`@mixin`來做全部的版面應用！  
這次大量的練習了Grid & SCSS，覺得進步滿多的:D

### 第五週 - Comic Viewer
1. [設計稿](https://hexschool.github.io/THE_F2E_Design/week5-comic%20viewer/)
2. [CODE](https://github.com/guahsu/TheF2E/blob/master/src/components/ComicViewer.vue)  
3. [DEMO](https://guahsu.github.io/TheF2E/dist/index.html#/5/comic_viewer)  

這週非常忙碌..假日只擠出一點點時間做，  
切了個基本的框框而已，程式可說是幾乎沒套到Q_Q

### 第六週 - Validation
1. [設計稿](https://hexschool.github.io/THE_F2E_Design/week6-validation/)
2. [CODE](https://github.com/guahsu/TheF2E/blob/master/src/components/Validation.vue)  
3. [DEMO](https://guahsu.github.io/TheF2E/dist/index.html#/6/validation)  

使用element ui來做，發現element的驗證還算滿方便的，  
縣市鄉鎮區選單選用`Cascader`來做滿方便的可搜尋，  
不過因為時間不夠(懶著整理格式)..只寫了幾區來展示，  
也是時間緊繃的一週，偷了一個信用卡欄位頁面沒寫XD。

### 第七週 - Canvas Game
1. [設計稿](https://hackmd.io/N5yEjm2vSx6D41qAbJGDmw/)
2. [CODE](https://github.com/guahsu/TheF2E/blob/master/src/components/CanvasGame/stage.vue)  
3. [DEMO](https://guahsu.github.io/TheF2E/dist/index.html#/7/canvas_game)  

大神吳哲宇老師出的設計稿，  
這周排程超滿...遇到這麼難的題目整個崩潰XDDDD  
第一次研究pixi，只做出了個入門都不太到邊的東西(?)先頂著交作業，  
只能等有空再來調整了...也希望週三能趕得上老師的直播。

### 第八週 - Canvas Game
1. [設計稿](https://hexschool.github.io/THE_F2E_Design/week8-parallax%20scrolling/)
2. [CODE](https://github.com/guahsu/TheF2E/blob/master/src/components/ParallaxScrolling.vue)  
3. [DEMO](https://guahsu.github.io/TheF2E/dist/index.html#/8/parallax_scrolling)  

又是一個初體驗 `TweenLineMax`  
整個週六都在做這個，一玩就停不下來一直寫，  
最後做得整個跟設計稿不一樣了，改成隨機產花色的頁面(彌補上週沒做完遊戲的痛?)  

比較特別的是因為我不太會用svg畫圖，  
這次所有的形狀都是透過偽元素放`文字符號`&`-webkit-text-stroke`來做:D

### 第九週 - 
1. [設計稿](https://xd.adobe.com/spec/f02993f5-4d00-4282-5a3b-cc27869f9afd-8618/)
2. [CODE](https://github.com/guahsu/TheF2E/blob/master/src/components/SkillTree.vue)  
3. [DEMO](https://guahsu.github.io/TheF2E/dist/index.html#/9/skill_tree)  

最終週，第一次遇到skill這樣要考慮前後配點問題的條件，  
往後點要計算前置條件，往前取消要在把後方所有關聯都取消，  
所以在設定檔寫得比較複雜，後來發問才驚覺沒有什麼分支，  
設計稿上就是單純點滿往下一階囧  

最終週技能除了技能邏輯，還有複雜的箭頭符號，  
我沿用了第八週的文字符作法：）