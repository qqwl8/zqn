var default_game_key = "http://aszt.97time.com/";
var default_game_id = "26";
var default_game_name = "傲视遮天";

	

	/*新闻*/
	var newsnav = $('.news-top li');
	newsnav.mouseover(function(){
		newsnav.children().removeClass("on");
		$(this).children().addClass("on");
		var newsname = $(this).attr("id");
		$(".newsli").css({"display":"none"});
		$("."+newsname).css({"display":"block"});
		$(".news-more").attr("href","http://aszt.97time.com/article/newslist/?typeid=100");
		if ( newsname == 'hequ'|| newsname == 'huodong' || newsname == 'meiti') {
			$('.topnews-li').hide();
		} else {
			$('.topnews-li').show();
		}
    });


	function tabs( tab, con ) {
		var tabnav = $(tab),
			content = $(con),
			current = 0;

		tabnav.mouseover(function(){
			current = tabnav.index(this);
			tabnav.removeClass('on').eq(current).addClass('on');
			content.hide().eq(current).show();
		});
	}