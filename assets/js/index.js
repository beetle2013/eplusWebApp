/**
 * Created by beetle on 2016/5/25.
 */
$(document).ready(function () {
    var w = $('header').width();
    $('.swiper-container').width(w).height(w / 2);
    var mySwiper = new Swiper('.swiper-container', {
        // Optional parameters
        speed: 800,
        loop: true,
        autoplay: 1000,
        pagination: '.swiper-pagination'
    });

    var i;
    var $marquee = $('.marquee');

    //设计interval 间隔
    function marInit() {
        i = setInterval(marMain, 30);//每30ms margin-top递减1
        $marquee.css('margin-top', parseInt($marquee.css('margin-top')) - 1 + 'px'); //初始递减1
    }

    function marMain() {
        //滚动中
        if (parseInt($marquee.css('margin-top')) % 20 != 0) {//20为行高
            $marquee.css('margin-top', parseInt($marquee.css('margin-top')) - 1 + 'px');
        }
        else {
            //如果一行滚动完成
            clearInterval(i);//停止滚动
            if (parseInt($marquee.css('margin-top')) + 59 < 0) {//3行滚动完成
                $marquee.css('margin-top', '0px')
            }
            setTimeout(marInit, 1500);//间隔后重新开始
        }
    }

    setTimeout(marInit, 1500);

    var t = timer();
    t.countDown(".time_left");
    
    $('.input-wrapper input').on('tap',function () {
        alert('search');
    })

});

function timer() {
    var instance = {};
    instance.countDown = function (ele) {
        var $ele = $(ele);
        if (!$ele || $ele.length == 0) {
            return
        }
        var intervalSecond = 3600;
        var hour = $ele.find(".hour");
        var minute = $ele.find(".min");
        var second = $ele.find(".second");
        $ele.show();
        var hh = 0, mm = 0, ss = 0;
        var intervals = {};
        intervals[$ele.selector] = setInterval(function () {
            intervalSecond--;
            if (intervalSecond < 0) {
                clearInterval(intervals[$ele.selector]);
                return
            }
            hh = ~~(intervalSecond / 3600);
            mm = ~~(intervalSecond / 60 % 60);
            ss = ~~(intervalSecond % 60);
            hour.html(hh < 10 ? "0" + hh : hh);
            minute.html(mm < 10 ? "0" + mm : mm);
            second.html(ss < 10 ? "0" + ss : ss)
        }, 1000)
    };
    return instance;
}

$(function () {
    var counter = 0;
    // 每页展示4个
    var num = 4;
    var pageStart = 0, pageEnd = 0;

    // dropload
    $('.main').dropload({
        scrollArea: window,
        loadDownFn: function (me) {
            $.ajax({
                type: 'GET',
                url: '../json/more.json',
                dataType: 'json',
                success: function (data) {
                    var result = '';
                    counter++;
                    pageEnd = num * counter;
                    pageStart = pageEnd - num;

                    for (var i = pageStart; i < pageEnd; i++) {
                        result += '<div class="good">' + '<a href="">'
                            + '<img src="' + data.goods[i].img + '" alt="">'
                            + '<p>' + data.goods[i].name + '</p>'
                            + '<p class="good-desc">' + data.goods[i].desc + '</p>'
                            + '<p class="main-color">￥' + data.goods[i].price + '<s>￥' + data.goods[i].oldprice + '</s></p>'
                            + '<span class="ico-cart">+</span>'
                            + '</a>' + '</div>';
                        if ((i + 1) >= data.goods.length) {
                            // 锁定
                            me.lock();
                            // 无数据
                            me.noData();
                            break;
                        }
                    }
                    // 为了测试，延迟1秒加载
                    setTimeout(function () {
                        $('.recomend').append(result);
                        // 每次数据加载完，必须重置
                        me.resetload();
                    }, 1000);
                },
                error: function (xhr, type) {
                    alert('Ajax error!');
                    // 即使加载出错，也得重置
                    me.resetload();
                }
            });
        }
    });
});