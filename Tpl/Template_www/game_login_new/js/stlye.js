// JavaScript Document
$(function(){
	$("#close_tools").click(function(){
		$('.release').show()
	})
	 $('.relBtn').click(function(){
		$('.topFrame').show(); 
		$('.release').hide()()
	})
})
function closeIframe(){
	$('.sam_game').hide()
		$('.game').hide()
	}

$(function(){
	$(".rightFrame").contents().find("#gifts").css('color','red');    
})

$(function(){
	$('.close_tools').click(function() {
	    window.parent.document.getElementById("mainFrame").rows="0,*";
	}); 
	$('.Lrelbtn').click(function() {
		if($('.leftFrame_con').is(':hidden')){
		    window.parent.document.getElementById("bottomFrame").cols="125,*";
		    $('.leftFrame').css('left','5px');
		    $('.leftFrame_con').show();
		    $(this).css('background-position','0 -41px');
		}else{
		    window.parent.document.getElementById("bottomFrame").cols="10,*";
		    $('.leftFrame').css('left','-110px');
		    $('.leftFrame_con').hide();
		    $(this).css('background-position','0 0');
		}
	}); 

})



function gift(){
	target = window.top.frames["rightFrame"];
	target.document.getElementById("gifts").style.display="block";
}

function get_gift(sid,gid,uid){
	$sid = sid;
	$gid = gid;
	if($gid==107){
		$card_type_id = 20;
	}else{
		$card_type_id = 13;
	}
	
	$.ajax({
		type:'get',
		url:'/members/card_check',
		data:'gid='+$gid+'&sid='+$sid+'&card_type_id='+$card_type_id,
		dataType:'json',
		error:function(){
			$('#card_num').html('系统发生错误，请稍后重试！');
		},
		success:function(data){
			$('#card_num').html(data.msg);
		}
	})
}

function task(){
	target = window.top.frames["rightFrame"];
	target.document.getElementById("tasks").style.display="block";
}

$("#mission").click(function(){
	target = window.top.frames["rightFrame"];
	target.document.getElementById("tasks").style.display="block";
})

function gettask(sid,gid){
	jQuery.ajax({
		type:'GET',
		url:'http://www.97time.com/Game/gettask?sid='+sid+'&gid='+gid,
		dataType: 'json',
		async: false,
		cache: false,
		success:function(data){
			//alert(data.Status);

			if(data.Status != 1){
				$('.sam_game_con li').html(data.msg);

			}else{
              	//$('.sam_game_con li').html(data.msg);
              	$('#cl_f').hide();
              	$('#cl_a').show();
            }
		}
	})
}

function gettaskmoney(lid,id)

{

	jQuery.ajax({

	type:'GET',

	url:'http://www.97time.com/TaskMotion/gettaskmoney?id='+lid,

	dataType: 'json',

	async: false,

	cache: false, 

	success:function(data){

		if(data.Status == 1)

		{

			alert('失败！'+data['Error']);

		}

		else

		{

			alert('领取！'+data['Error']);

 			document.getElementById("userlq"+id).innerHTML="<a id='lq' style='cursor:pointer;' onclick='javascript:alert(\"亲，你已经领取过改等级的奖励了哦\")'><img src='/Tpl/Template_www/images/ylq.jpg'></a>";

		}

	}

	})

}

function activity(){
	target = window.top.frames["rightFrame"];
	target.document.getElementById("activitys").style.display="block";
}

function strategy(){
	target = window.top.frames["rightFrame"];
	target.document.getElementById("strategys").style.display="block";
}
