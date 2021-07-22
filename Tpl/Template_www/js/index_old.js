$(function () {
    $('body').append('<div class="sq-cwechat-corner"><a id="closewx" style="cursor:pointer;display: block;width: 30px;height: 30px;z-index: 999;position: relative;top: -5px;right: -130px;" title="关闭"></><a href="http://www.97time.com/hd/wx/201312/" target="_blank" title="领取礼包" style="height:290px;width:160px;display:block;"></a></div><style>.sq-cwechat-corner{width:160px;position:fixed;z-index:999;right:10px;height:290px;background:transparent url(/images/wx_sys.png) no-repeat;_background:transparent url(/images/wx_sys8.png) no-repeat;bottom:5px; _position:absolute;_bottom:auto;_top:expression(eval(document.documentElement.scrollTop+document.documentElement.clientHeight-this.offsetHeight-(parseInt(this.currentStyle.marginTop,10)||0)-(parseInt(this.currentStyle.marginBottom,10)||0)))}}</style>');
    $('#closewx').click(function () {
        $(".sq-cwechat-corner").hide();
    });
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