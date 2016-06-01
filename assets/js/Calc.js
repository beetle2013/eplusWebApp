/**
 * Created by beetle on 2016/6/1.
 */
var Calc = {
    createCalc: function (x,y) {
        var calc = {};
        var a = x;
        var b = y;
        var c;
        calc.plus = function () {
            c = a + b;
            alert(c);
        };
        return calc;
    }
};