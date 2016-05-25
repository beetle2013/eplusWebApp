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


});