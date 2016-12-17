
//设置某元素（根据 ID）显示或者隐藏
function showElementById(nodeId, isShow) {
    //根据 ID 或者 class 的值，找到节点对象
    var obj = document.getElementById(nodeId);
    var show = isShow ? "block" : "none";
    obj.style.display = show;
}

//设置 top_box 里页签的高亮/正常效果
function showTopTag(node, isHover) {
    //找到 Label 元素（标签文本），设置鼠标悬停的样式效果
    var obj = node.parentNode.getElementsByTagName("label")[0];
    if (isHover)
        obj.className += " hover";
    else
        obj.className = "rt";

    //找到标签的链接，设置鼠标悬停的样式效果
    var linkObj = obj.getElementsByTagName("a")[0];
    if (isHover)
        linkObj.className += " hover";
    else
        linkObj.className = "";
}

//显示二级分类菜单
function showNaviSubItems(divObj) {
    var menus = document.getElementById("all_cate").getElementsByClassName("sub_cate_box");
    for (var i = 0; i < menus.length; i++) {
        menus[i].style.display = "none";
    }

    divObj.getElementsByTagName("div")[0].style.display = "block";
}

//初始化页面数据
function initialData() {
    //设置产品图片框的宽度
    var imageCount = document.getElementById("icon_list").getElementsByTagName("img").length;
    document.getElementById("icon_list").style.width = 62 * imageCount + "px";
    if (imageCount > 5) {
        var forwardObj = document.getElementById("preview").getElementsByTagName("a")[1];
        forwardObj.className = "forward";
    }
}


/*//移动产品的小图标
var forwardCount = 0;
var backwardCount = 0;
function right(obj) {
    if (document.getElementById("preview").getElementsByTagName("a")[1].className == "forward_disabled"){
        return;
	}

    //移动
    forwardCount++;
    var list = obj.parentNode.getElementsByTagName("ul")[0];
    list.style.left = -62 * forwardCount + "px";

    //修改右移样式
    var imageCount = document.getElementById("icon_list").getElementsByTagName("img").length;
    if (forwardCount == imageCount - 5){
        document.getElementById("preview").getElementsByTagName("a")[1].className = "forward_disabled";
	}

    //设置左移的样式和计数
    if (forwardCount > 0) {
        backwardCount = 0;
        document.getElementById("preview").getElementsByTagName("a")[0].className = "backward";
    }
}*/


var movedCount = 0; //缩微图列表移动的次数
//缩微图列表向左移动
document.querySelectorAll('#preview a')[0].onclick = 
function(){
	//this: 此时的this指代向左移动的小按钮
	if(this.className==='backward_disabled' || movedCount==0){
		return;
	}
	movedCount--;
	//(1)修改缩略图列表的位置
	var ul = document.querySelector('#icon_list');
	ul.style.left = (-62*movedCount)+'px';

	//(2)判定能否继续左移
	if(movedCount<=0){
		this.className = 'backward_disabled';
	}

	//(3)修改右移按钮
	document.querySelectorAll('#preview a')[1].className = 'forward';
}

//缩微图列表向右移动
document.querySelectorAll('#preview a')[1].onclick = 
function(){
	//this: 此时的this指代向右移动的小按钮
	//获取实际显示的缩微图的数量
	var imgCount = document.querySelectorAll('#preview ul img').length;
	if(imgCount<=5 || this.className==='forward_disabled'){
		return;
	}
	//图片数量足够多
	movedCount++;
	//(1)修改缩略图列表的位置
	var ul = document.querySelector('#icon_list');
	ul.style.left = (-62*movedCount)+'px';

	//(2)判断右移按钮能否继续右移
	if(movedCount >= imgCount-5){
		this.className = 'forward_disabled';
	}

	//(3)让左移按钮启用
	if(movedCount==1){
	document.querySelectorAll('#preview a')[0].className = 'backward';
	}
}

/**
*处理缩略图列表中的图片的鼠标悬停事件
**/
var imgList = document.querySelectorAll('#preview ul li img');
for(var i=0; i<imgList.length; i++){
	var img = imgList[i];
	img.onmouseover = changeThumbImg;
}
function changeThumbImg(){
	var previousHovered = document.querySelector('.hoveredThumb');
	if(previousHovered==null){
		this.className = 'hoveredThumb'; 
		changeMediumImg(this.src);	//修改中等图片的src
	}else if(previousHovered!=this){
		previousHovered.removeAttribute('class');
		this.className = 'hoveredThumb';
		changeMediumImg(this.src);	//修改中等图片的src
	}
}
//images/products/p-s1.jpg
//images/products/p-s1-m.jpg
function changeMediumImg(thumbSrc){
	var dotIndex = thumbSrc.lastIndexOf('.');
	var prefix = thumbSrc.substring(0, dotIndex);
	var suffix = thumbSrc.substring(dotIndex);
	var mediumSrc = prefix + '-m'+suffix;
	document.getElementById('mediumImg').src = mediumSrc;
}

/**
为半透明的放大镜mask添加鼠标移动事件
**/
document.querySelector('#maskTop').onmousemove = 
function(event){
	var x = event.offsetX;	//事件相对于事件源的偏移量
	var y = event.offsetY;
	
	var mask = document.getElementById('mask');
	
	var w = mask.offsetWidth; //mask的宽和高
	var h = mask.offsetHeight;


	var left = x<w/2 ? 0 : (x-w/2);
	var top = y<h/2 ? 0 : (y-h/2);

	/*if(x>(this.offsetWidth-w/2)){
		left = this.offsetWidth - w;
	}
	if(y>(this.offsetHeight-h/2)){
		top = this.offsetHeight - h;
	}*/
	left = left>(this.offsetWidth-w) ? (this.offsetWidth-w) : left;
	top = top>(this.offsetHeight-h) ? (this.offsetHeight-h) : top;

	mask.style.left = left+'px';
	mask.style.top = top+'px';

	//修改大图的位置
	var largeImg = document.getElementById('largeImg');
	largeImg.style.left = (-1*left*largeImg.width/this.offsetWidth) + 'px';
	largeImg.style.top = (-1*top*largeImg.height/this.offsetHeight)+'px';
}
document.querySelector('#maskTop').onmouseover = 
function(){
	//显示mask
	var mask = document.getElementById('mask');
	mask.style.display = 'block';

	//先显示大图，以及其中的loading图
	var largeImgContainer = document.getElementById('largeImgContainer');
	largeImgContainer.style.display = 'block';

	//获取当前要显示的大图的src
	var src = document.querySelector('#mediumImg').src;
	var dotIndex = src.lastIndexOf('.');
	var prefix = src.substring(0, dotIndex-2);
	var suffix = src.substring(dotIndex);
	src = prefix + '-l'+ suffix;

	var largeImg = document.getElementById('largeImg');
	largeImg.src = src;
	
	//必须等待图片从服务器加载完成后才能读取其尺寸
	largeImg.onload = function(){
		var largeWidth = largeImg.width;
		var largeHeight = largeImg.height;
		largeImgContainer.style.width = largeWidth/2+'px';
		largeImgContainer.style.height = largeHeight/2+'px';
		document.getElementById('loading').style.display = 'none';
		this.style.display = 'block';
	}
}
document.querySelector('#maskTop').onmouseout = 
function(){
	//除去mask
	var mask = document.getElementById('mask');
	mask.style.display = 'none';
	//除去大图显示区
	document.getElementById('largeImgContainer').style.display = 'none';
}










//显示或者隐藏更多的分享图标
function showMoreShares(obj) {
    var divObj = obj.parentNode;
    var linkNodes = divObj.getElementsByTagName("a");
    for (var i = 3; i < linkNodes.length - 1; i++) {
        if (linkNodes[i].style.display == "block") {
            linkNodes[i].style.display = "none";
            divObj.style.width = 155 + "px";
            obj.firstChild.className = "";
        }
        else {
            linkNodes[i].style.display = "block";
            obj.parentNode.style.width = 200 + "px";
            obj.firstChild.className = "backword";
        }
    }
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

//送货地址选择框：选择不同的页签
function storeSelectorTabsChange(index) {
    var tabs = document.getElementById("store_tabs").getElementsByTagName("li");
    for (var i = 0; i < tabs.length; i++) {
        if (i == index)
            tabs[i].className = "hover";
        else
            tabs[i].className = "";
    }
}

//显示minicart
function showMiniCart(isShow) {
    if (isShow) {
        document.getElementById("minicart").className = "minicart";
        document.getElementById("minicart").getElementsByTagName("div")[0].style.display = "block";
    }
    else {
        document.getElementById("minicart").className = "";
        document.getElementById("minicart").getElementsByTagName("div")[0].style.display = "none";
    }
}

//产品介绍里的页签切换
var tabsArray = ["product_info", "product_data", "product_package", "","product_saleAfter"];
function showProductTabs(aObj, index) {
    var liObjs = aObj.parentNode.getElementsByTagName("li");
    for (var i = 0; i < tabsArray.length; i++) {
        var tabObj = document.getElementById(tabsArray[i]);
        if (tabObj == null) {
            liObjs[i].className = "";
            continue;
        }
        if (i == index) {
            tabObj.style.display = "block";
            liObjs[i].className = "current";
        }
        else {
            tabObj.style.display = "none";
            liObjs[i].className = "";
        }
    }
    //只显示商品评价
    if (index == 3)
    {
        for (var i = 0; i < tabsArray.length; i++) {
            var tabObj = document.getElementById(tabsArray[i]);
            if (tabObj == null) {
                continue;
            }
            tabObj.style.display = "none";
        }
        liObjs[index].className = "current";
    }
}

//是否显示回复
function showReply(aObj) {
    var node = aObj.parentNode.parentNode.nextSibling.nextSibling;
    if (node.style.display == "none")
        node.style.display = "block";
    else
        node.style.display = "none";
}