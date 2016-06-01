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

    var formatted_address;
    var business;
    var addressComponent;

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
        googlegeo();
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
                    formatted_address = data.result.formatted_address;
                    business = data.result.business;
                    addressComponent = data.result.addressComponent;
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(latlon + "地址位置获取失败");
            }
        });
    }

    function googlegeo(){

        var url = 'http://maps.google.cn/maps/api/geocode/json?latlng='+latitude + "," + longitude +'&language=CN';
        $.ajax({
            type: "GET",
            url: url,
            beforeSend: function(){
                alert('正在定位...');
            },
            success: function (json) {
                if(json.status=='OK'){
                    var results = json.results;
                    $.each(results,function(index,array){
                        if(index==0){
                            alert(array['formatted_address']);
                        }
                    });
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(latlon+"地址位置获取失败");
            }
        });
    }
    return instance;
}
