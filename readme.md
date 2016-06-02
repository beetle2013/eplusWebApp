### eplusWebApp

一个移动端&&微信端 电商前端模板

![eplusWebApp](http://beetle2013.github.io/eplusWebApp/assets/img/epluswebapp.png)

visit form qrcode

###主要模块、功能、代码

###首页
####html5定位
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            alert("浏览器不支持地理定位。");
        }
    }
    function showPosition(position) {
        var lat = position.coords.latitude; //纬度
        var lng = position.coords.longitude; //经度
    }
######PC端浏览器除IE外定位不可用，移动端基本都可用

#####此处有坑
浏览器获取到的是经纬度，一般我们还会使用百度地图的API等来得到对应的市、区、镇、商圈等，此处的问题是因为国家安全的需要，国内的电子地图坐标都是经过加密算法处理过的，产生了偏移，被网友戏称为火星算法。（原理可百度）。在此感谢[coordtransform](https://github.com/wandergis/coordtransform)的作者提供了完美的解决方案。

    //wgs84转国测局坐标
    var wgs84togcj02 = coordtransform.wgs84togcj02(lng, lat);

    //国测局坐标转百度经纬度坐标
    var gcj02tobd09 = coordtransform.gcj02tobd09(wgs84togcj02[0], wgs84togcj02[1]);
    var latlon = gcj02tobd09[1] + ',' + gcj02tobd09[0];
    var $business = $("#business");

    var url = "http://api.map.baidu.com/geocoder/v2/?ak=你的ak&callback=renderReverse&location=" + latlon + "&output=json&pois=0";
    $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: url,
        beforeSend: function () {
            $business.html('正在定位...');
        },
        success: function (json) {
            if (json.status == 0) {
                $business.html(json.result.business);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $business.html(latlon + "地址位置获取失败");
        }
    });

####抢购倒计时
####上拉加载