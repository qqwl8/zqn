$(function () {
    var allgame = new Array();
    $("#gameul li").each(function (i) {
        var obj = new Object();
        obj.id = $(this).attr("data-id");
        obj.letter = $(this).attr("data-letter");
        obj.i = i;
        allgame.push(obj);
    });
    //分页
    function page(arr) {
        var gameul = $("#gameul");
        var page = $(".listpage");
        var first = $(".pfirst");
        var prev = $(".pprev");
        var next = $(".pnext");
        var last = $(".plast");
        var len = arr.length;
        var glist = arr;
        var n = 6;//一页显示多少个
        var cur = 1;
        var maxp = Math.ceil(len / n);//最大页数
        $(".listpage .pnum").remove();
        for (i = 1; i <= maxp; i++) {
            if (i == 1)next.before('<a class="pnum on" href="javascript:;">' + i + '</a>');
            else next.before('<a class="pnum" href="javascript:;">' + i + '</a>');
        }
        var pagefun = function (p) {
            if (p < 1)p = 1;
            if (p > maxp)p = maxp;
            $(".listpage .pnum").removeClass("on").eq(p - 1).addClass("on");
            $("#gameul li").hide();
            for (i = (p - 1) * n; i < n * p; i++) {
                if (glist[i]) {
                    $("#gameul li").eq(glist[i].i).show();
                }
            }
            cur = p;
        }
        pagefun(1);
        $("#gameul img").show();
        if ($("#gameul li:visible").length == 0)$(".listpage").hide();
        else $(".listpage").show();
        $(".listpage .pnum").click(function () {
            pagefun(parseInt($(this).text()));
        });
        first.click(function () {
            pagefun(1);
        });
        prev.click(function () {
            pagefun(cur - 1);
        });
        next.click(function () {
            pagefun(cur + 1);
        });
        last.click(function () {
            pagefun(parseInt($(".pnum:last").text()));
        });
    }

    page(allgame);
    //筛选
    function filter() {
        var arr = new Array();
        var letter = $("#gamelist .type a.on").text();
        var garr = allgame;
        for (i = 0; i < garr.length; i++) {
            var isletter = letter.indexOf(garr[i].letter) >= 0 || letter == "全部";
            if (isletter)arr.push(garr[i]);
        }
        page(arr);
    }

    var type = $("#gamelist .type a");
    type.click(function () {
        //变色
        type.removeClass("on");
        $(this).addClass("on");
        filter();//触发筛选
    });
    //顶过变色+1
    function hasding() {
        $("#gameul .br s").each(function () {
            var s = $(this);
            var li = $(this).closest("li");
            var id = li.attr("data-id");
            var num = li.find(".num");
            var saveId = unescape(getCookie('diggid'));
            if (saveId != null) {
                var saveIds = saveId.split(',');
                for (i = saveIds.length - 1; i >= 0; i--) {
                    if (saveIds[i] == id) {
                        s.addClass("on");
                        var n = parseInt(num.text()) + 1;
                        num.text(n);
                        break;
                    }
                }
            }
        });
    }

    hasding();
    function ding() {
        $("#gameul .br a").bind("click", function () {
            var s = $(this).find("s");
            var li = $(this).closest("li");
            var id = li.attr("data-id");
            var num = li.find(".num");
            var catid = 13;
            var saveId = unescape(getCookie('diggid'));
            s.addClass("on");
            if (saveId != null) {
                var saveIds = saveId.split(',');
                var hasId = false;
                j = 1;
                saveId = '';
                for (i = saveIds.length - 1; i >= 0; i--) {
                    if (saveIds[i] == id && hasId) continue;
                    else {
                        if (saveIds[i] == id && !hasId) hasId = true;
                        saveId += (saveId == '' ? saveIds[i] : ',' + saveIds[i]);
                        j++;
                    }
                }
                //if(hasId) { alert("您已经顶过该帖，请不要重复顶帖 ！"); return false; }
                if (hasId) {
                    return false;
                } else {
                    saveId += ',' + id;
                }
                setCookie('diggid', saveId, 86400);
            } else {
                setCookie('diggid', id, 86400);
            }
            n = parseInt(num.text());
            var new_n = parseInt(num.text()) + 1;
            num.text(new_n);
            $.getJSON("http://pytj.97time.com/?m=index&c=content&a=ding&cid=" + catid + "&game_id=" + id + "&callback=?", {}, function (data) {
                if (data.msg == 1) {
                    num.text(new_n);
                }
            });
        });
    }

    ding();
});