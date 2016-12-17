window.onload = function () {


//衣服展示区

    function grtTab(id, id2, id3, src, bigSrc) {
        var obj = document.getElementById(id);
        var bigBox = document.getElementById(id2);
        var big = document.getElementById(id3);
        obj.onmousemove = function () {
            bigBox.src = src;
            big.src = bigSrc;
        }

    }

    grtTab('icon_list_01', 'mediumImg', 'largeImg', 'images/pic/tb01.jpg', 'images/pic/bigt1.jpg');
    grtTab('icon_list_02', 'mediumImg', 'largeImg', 'images/pic/tb02.jpg', 'images/pic/bigt2.jpg');
    grtTab('icon_list_03', 'mediumImg', 'largeImg', 'images/pic/tb01.jpg', 'images/pic/bigt1.jpg');
    grtTab('icon_list_04', 'mediumImg', 'largeImg', 'images/pic/tb02.jpg', 'images/pic/bigt2.jpg');
    grtTab('icon_list_05', 'mediumImg', 'largeImg', 'images/pic/tb01.jpg', 'images/pic/bigt1.jpg');

    //放大镜效果
    var smallBox = document.getElementById('medimImgContainer');
    var mask = document.getElementById('mask');
    var bigBox = document.getElementById('largeImgContainer');
    var largeImg = document.getElementById('largeImg');

    smallBox.onmousemove = function () {
        mask.style.display = 'block';
        bigBox.style.display = 'block';

        var x = event.offsetX;	//事件相对于事件源的偏移量
        var y = event.offsetY;
        console.log(x);
        var w = mask.offsetWidth; //mask的宽和高
        var h = mask.offsetHeight;
        /*if(x>(this.offsetWidth-w/2)){
         left = this.offsetWidth - w;
         }
         if(y>(this.offsetHeight-h/2)){
         top = this.offsetHeight - h;
         }*/
        var left = x < w / 2 ? 0 : (x - w / 2);
        var top = y < h / 2 ? 0 : (y - h / 2);


        left = left > (this.offsetWidth - w) ? (this.offsetWidth - w) : left;
        top = top > (this.offsetHeight - h) ? (this.offsetHeight - h) : top;

        mask.style.left = left + 'px';
        mask.style.top = top + 'px';

        largeImg.style.left = (-1*left*largeImg.width/this.offsetWidth) + 'px';
        largeImg.style.top = (-1*top*largeImg.height/this.offsetHeight)+'px';

        console.log(largeImg.width);
    };
    smallBox.onmouseout = function () {
        mask.style.display = 'none';
        bigBox.style.display = 'none';
    };

};


//设置某元素（根据 ID）显示或者隐藏
function showElementById(nodeId, isShow) {
    //根据 ID 或者 class 的值，找到节点对象
    var obj = document.getElementById(nodeId);
    var show = isShow ? "block" : "none";
    obj.style.display = show;
}


//送货地区选择框：鼠标移入时
function storeSelecterHover(isHover) {
    if (isHover) {
        document.getElementById("store_select").getElementsByTagName("div")[0].className += " textHover";
        showElementById('store_close', isHover);
        showElementById('store_content', isHover);
    }
    else {
        document.getElementById("store_select").getElementsByTagName("div")[0].className = "text";
        showElementById('store_close', isHover);
        showElementById('store_content', isHover);
    }
}

