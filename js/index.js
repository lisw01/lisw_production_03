/**
 *
 * Created by lisw on 2016/12/12 0012.
 */
$(function () {
    //替换图片
    (function () {
        var longen = document.getElementById('header_r_longen');
        var mask = document.getElementById('longen-box');
        var smomask = document.getElementById('longen-box-smo');
        var close_mask = document.getElementById('longen-box-smo-i');

        longen.onclick = function () {
            mask.style.display = "block";
            smomask.style.display = "block";
        };
        close_mask.onclick = function () {
            mask.style.display = "none";
            smomask.style.display = "none";
        };
        var liis = document.getElementById("main_r_up_down").getElementsByTagName("i");
        len = liis.length;
        for (var i = 0; i < len; i++) {
            liis[i].style.backgroundPosition = "0" + (i * -25) + "px";
        }
    })();

    //关闭广告
    (function () {
        var id_top_banner_a = document.getElementById('id_top_banner_a');
        var id_top_banner = document.getElementById('id_top_banner');
        id_top_banner_a.onclick = function () {
            id_top_banner.style.display = 'none';
        };

    })();

    //轮播图
    (function () {
        //jquery对象
        var $lrBut = $('#main_lr_but');
        var $lunBo = $('#main_gu_ding');
        var $butLeft = $('.main-lb-lbox');
        var $butRight = $('.main-lb-rbox');
        var $lbLis = $('#main_gu_ding > ul').children();
        var $ctrlLis = $('.main-lb-xyd > ul').children();

        //隐藏
        $lrBut.hide();
        //淡入淡出
        $lunBo.mouseenter(function () {
            $lrBut.fadeIn(100);
        }).mouseleave(function () {
            $lrBut.fadeOut(100);
        });
        //确定全局索引
        var index = 0;
        //点击右侧按钮
        $butRight.on('click', function () {

            moveRight();
        });
        //点击左侧
        $butLeft.on('click', function () {
            moveLeft();
        });

        //点击下面的控制键
        for (var i = 0; i < $ctrlLis.length; i++) {

            $ctrlLis[i].index = i;

            $ctrlLis[i].onclick = function () {
                var that = this.index;
                for (var j = 0; j < $ctrlLis.length; j++) {
                    $($ctrlLis[j]).removeClass('active');
                    $($lbLis[index]).animate({
                        opacity: '0',
                        zIndex: '0'
                    }, 100).removeClass('slider');

                }
                $(this).addClass('active');
                index = that;
                $($lbLis[index]).animate({
                    opacity: '1',
                    zIndex: '1'
                }, 500).addClass('slider');

            }


        }

        function moveRight() {
            $($lbLis[index]).animate({
                opacity: '0',
                zIndex: '0'
            }, 500).removeClass('slider');
            ++index > $lbLis.length - 1 ? index = 0 : index;
            $($lbLis[index]).animate({
                opacity: '1',
                zIndex: '1'
            }, 500).addClass('slider');

            ctrl();

        }

        function moveLeft() {
            $($lbLis[index]).animate({
                opacity: '0',
                zIndex: '0'
            }, 500).removeClass('slider');
            --index < 0 ? index = $lbLis.length - 1 : index;
            $($lbLis[index]).animate({
                opacity: '1',
                zIndex: '1'
            }, 500).addClass('slider');

            ctrl();
        }

        //    控制按钮
        function ctrl() {
            for (var i = 0; i < $ctrlLis.length; i++) {
                $($ctrlLis[i]).removeClass('active');
            }

            $($ctrlLis[index]).addClass('active');
        }

        //开启定时器
        var timer = null;

        timer = setInterval(moveRight, 2000);

        $lunBo.mouseenter(function () {
            clearInterval(timer);
        });

        $lunBo.mouseleave(function () {
            clearInterval(timer);
            timer = setInterval(moveRight, 2000);
        });

    })();

    //侧边tab选项

    (function () {
        //获取$对象
        var tabs = $('.nav-l-down-leftsidebar');

        var tabContents = $('.nav-centent-down > ul').children();

        var caiDan = $('.nav-l');

        var tabContent = $('.nav-centent-down');

        for (var i = 0; i < tabs.length; i++) {
            tabs[i].index = i;
            tabs[i].onmouseover = function () {
                for (var j = 0; j < tabs.length; j++) {
                    tabContents[j].classname = 'none';
                }
                $(tabContents[this.index]).addClass('show');
            };
            tabs[i].onmouseout = function () {
                for (var j = 0; j < tabs.length; j++) {
                    $(tabContents[j]).removeClass('show')
                }
                $(tabContents[this.index]).addClass('show');
            };


        }
        //离开父亲盒子的时候消失
        caiDan.mouseleave(function () {
            tabContents.removeClass('show');
        });


    })();

    //更改a标签的属性
    (function () {
        var As = $('a');
        for (var i = 0; i < As.length; i++) {
            $(As[i]).attr({
                href:'index_02.html',
                target:'_blank'
            })
        }
    })();


});