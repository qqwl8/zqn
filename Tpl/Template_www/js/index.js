$(function () {
    yxgl();
});
function yxgl() {
    var tab = $("#yxgl .tab li");
    var tabb = $("#yxgl .tabb ul");
    var len = tab.length;
    var leftbtn = $("#yxgl .leftbtn");
    var rightbtn = $("#yxgl .rightbtn");
    var cur = 0;
    tab.mouseover(function () {
        move($(this).index());
    });
    var move = function (i) {
        if (i < 0)i = len - 1;
        if (i >= len)i = 0;
        tab.removeClass("on").eq(i).addClass("on");
        tabb.hide().eq(i).show();
        cur = i;
    }
    leftbtn.click(function () {
        move(cur - 1)
    });
    rightbtn.click(function () {
        move(cur + 1)
    });
}
//平台首页友情链接
$("#linkmore").click(function () {
    var sid = $("#SenFe_1");
    if (sid.hasClass("xs")) {
        sid.attr("class", "join_ul");
        $(this).attr("class", "other");
    }
    else {
        sid.attr("class", "xs");
        $(this).attr("class", "another");
    }
});