/**
 * Created by beetle on 2016/5/25.
 */
$(document).ready(function () {
    var w = $('header').outerWidth();
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