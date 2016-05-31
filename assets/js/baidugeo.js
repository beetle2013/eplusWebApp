/**
 * Created by beetle on 2016/5/31.
 */
"use strict";
function geo() {
    var instance = {};
    var latitude;//纬度
    var longitude;//经度

    var baidu_url = "http://api.map.baidu.com/geocoder/v2/";
    var baidu_ak = "sk4aD5OWDtIzYAgtOD8PdAmW";


    instance.htmlgeo = function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getPosition);
        } else {
            alert("浏览器不支持地理定位。");
        }
    };

    function getPosition(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        baidugeo();
    }

    function baidugeo() {
        var url = baidu_url + "?ak=" + baidu_ak + "&callback=renderReverse&location=" + latitude + "," + longitude + "&output=json&pois=0";

        $.ajax({
            type: "GET",
            dataType: "jsonp",
            url: url,
            beforeSend: function () {
                alert('正在定位...');
            },
            success: function (data) {
                if (data.status == 0) {
                    alert(data.result.business);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(latlon + "地址位置获取失败");
            }
        });
    }

    return instance;
}
