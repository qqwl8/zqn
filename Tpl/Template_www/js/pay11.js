var bank_num = 13;
var pay_from_info = {pay_type_id:1,game_id:0,server_id:0,pay_for:'game',pay_user:'',pay_money:100,pay_ingot:0,bank:'',order_id:'',total:0,redpacket:'',redpacket_val:0,redpacket_money:0,redpacket_check:0};
function echolog(argument){console.log(argument);}
function fullbg(){
	if($("#fullbg").size()==0){
		$("body").prepend('<div class="loading" id="loading">订单生成中，<br/>如果长时间未能响应，请[<a href="">点此刷新</a>]</div>'+
				'<div class="layer" id="fullbg"></div>');
	}
	$("#fullbg").show();
}
function fullbghide(){$("#fullbg").hide();}
function show_floatdiv(id){fullbg();$("#"+id).floatdiv().show();}
function close_floatdiv(id){$('.float_div').hide();fullbghide();}
//选择充值方式
function select_pay_bank(bank){
	for(i=1;i<=bank_num;i++){
		$('.li_'+i).removeClass('this_li_'+i);
	}
	$('.li_'+bank).addClass('this_li_'+bank);
	select_money(100);
	pay_from_info.pay_money = 0; //重置金额
	var check_html_pay_money = true;
	$('#main1').show();
	$('#main2').hide();
	$('#main_bank').show();
	$('#paltform_coin_balance').hide();
	$('#main_other_money').show();
	$('#pay_type_not28').show();
	$('.change_user').show();
	$('#form_paymethod').val('');
	$('#ptypes').text('您的充值金额');
	$('#money_unit').text('元');
	//当前是否显示红包
	if(_97time_redpacket_div_flage){$('#_97time_redpacket_div').show();$('#predpacket').show();$('#predpacket1').show();}else{$('#_97time_redpacket_div').hide();$('#predpacket').hide();$('#predpacket1').hide();}
	
	switch(bank){
		case 1:
			kuaiqian();
			$('#form_paymethod').val('bankPay');
		break;
		case 2: //10
			yibao();
		break;
		case 3:
			kuaiqianzhanghao();
		break;
		case 4: //18
			zhifubao();
		break;
		case 5: //27
			qq();
		break;
		case 6: //24
			junwang();
		break;
		case 7: //6
			shenzhouxing();
		break;
		case 8: //14
			dianxinka();
		break;
		case 9: //15
			liantongka();
		break;
		case 10: //28
			platform();
		break;
		case 12: //30
			wx();
		break;
		case 13:
			sdo();
		break;
		default: //人工充值
			check_html_pay_money = false;
			$('#main1').hide();
			$('#main2').show();
			artificial_recharge();
		break;
	}
	tips_type(bank);
	delclass('bank_bg_'+bank);
	if(check_html_pay_money){html_pay_money()};
}
function delclass(c){
	$('#_97time_pay_watermark').removeAttr("class");
	$('#_97time_pay_watermark').addClass(c);
}
function sdo(){
	pay_from_info.bank='';
	pay_from_info.pay_type_id=33;
	$('.main_bank a').removeClass('on');
	$('#bank_bjrcb').hide();//北京农商
	$('#bank_hsb').hide();//徽商银行
	$('#bank_czb').hide();//浙商银行
	$('#bank_hzb').hide();//杭州银行
	$('#bank_sdb').hide();//深圳发展银行
}
function wx(){
	pay_from_info.pay_type_id=31;
	$('#main_bank').hide();
}
function kuaiqian(){
	pay_from_info.bank='';
	pay_from_info.pay_type_id=1;
	$('.main_bank a').removeClass('on');
	$('#bank_bjrcb').show();//北京农商
	$('#bank_hsb').show();//徽商银行
	$('#bank_czb').show();//浙商银行
	$('#bank_hzb').show();//杭州银行
	$('#bank_sdb').show();//深圳发展银行
}
function yibao(){
	$('#main_bank').hide();
	pay_from_info.pay_type_id=10;
}
function kuaiqianzhanghao(){
	$('#main_bank').hide();
	pay_from_info.pay_type_id=3;
}
function zhifubao(){
	$('#main_bank').hide();
	pay_from_info.pay_type_id=18;	
}
function qq(){
	$('#main_bank').hide();
	$('#main_other_money').hide();
	pay_from_info.pay_type_id=27;
}
function junwang(){
	$('#main_bank').hide();
	$('#main_other_money').hide();
	pay_from_info.pay_type_id=24;
}
function shenzhouxing(){
	$('#main_bank').hide();
	$('#main_other_money').hide();
	pay_from_info.pay_type_id=6;
}
function dianxinka(){
	$('#main_bank').hide();
	$('#main_other_money').hide();
	pay_from_info.pay_type_id=14;
}
function liantongka(){
	$('#main_bank').hide();
	$('#main_other_money').hide();
	pay_from_info.pay_type_id=15;
}
function platform(){
	$('#pay_type_not28').hide();
	$('#main_bank').hide();
	$('.change_user').hide();
	$('#paltform_coin_balance').show();
	$('#game_show').show();
	$('#ptypes').text('您所支付的平台币');
	$('#money_unit').text('平台币');
	//屏蔽红包显示
	$('#_97time_redpacket_div').hide();
	$('#predpacket').hide();
	pay_from_info.pay_type_id=28;
	pay_from_info.pay_for='game';
}
function lookresult(a){
	a.href="/pay_to_show.php?orderid="+pay_from_info.order_id;
	a.target = '_blank';
}
function html_pay_money(){
	var pay_info = arr_pay_type[pay_from_info.pay_type_id].cards;
	var pay_length = pay_info.length;
	var html = '';
	var money_unit = '元';
	var money = '';
	var check = '';
	if(pay_from_info.pay_type_id==28){money_unit='平台币'};
	for(var i = 0; i < pay_length; i++){
		money = pay_info[i];
		check = '';
		if(pay_from_info.pay_money==0 && (money==100 || i==pay_length-1)){ //选中100块 或最后一个
			pay_from_info.pay_money = money;
			check = ' on ';
		}
		html += '<a class="main_money_a'+check+'" val="'+money+'" id="money_'+i+'" onclick="select_money('+i+');">'+money+money_unit+'</a>';
	};
	$('#main_money_list').html(html);
	calculate_coin_num();
}
function artificial_recharge(){
	if($("#main2").html()!=''){return false;}
	$.ajax({
		type:'get',
		url:'artificial.html',
		dataType:'html',
		success:function(html){
			$("#main2").html($.trim(html));//一定要trim，不然在ie9以下都会出面插入内容空白的问题
		}
	})
}
//选择充值类型
function select_pay_for(type){
	pay_from_info.pay_for = type;
	var obj = $('#pay_for_'+type);
	$('.main_payFor_a').removeClass('on');
	obj.addClass('on');
	if(type=='game'){ //选择游戏
		$('#game_show').show();
		$('#platform_show').hide();
	}else{ //选择平台币
		$('#platform_show').show();
		$('#game_show').hide();
	}
	calculate_coin_num();
}
//展开选择游戏
$("#main_select_game").click(function(){	
	if(!login_name){
		select_game_tab(0);
	}else{
		select_game_tab(9999);
	}
	$("#alert_arrow").show().removeClass("arrow_server");
	$("#select_game").show();
	$("#select_server").hide();
});
//展开选择服
$("#main_select_server").click(function(){
	$("#alert_arrow").show().addClass("arrow_server");
	$("#select_game").hide();
	$("#select_server").show();
});
//关闭选择游戏或服的浮框
$(".alert_select_close").click(function(){
	$("#alert_arrow").hide();
	$("#select_game").hide();
	$("#select_server").hide();
});
/*选择游戏Tab页*/
function select_game_tab(tab_index){
	var o = $("#game_tab_"+tab_index);
	o.addClass("on").siblings(".alert_game").removeClass("on");
	$("#game_cnt_"+tab_index).show().siblings(".game_list").hide();
}
/*选择游戏*/
function select_game(game_id,server_id,actor_id){
	//保存数据
	if(game_id && pay_from_info.game_id != game_id){
		var game = null;
		try{
			game = g_game_data[game_id];
		}catch(e){
			return false;
		}
		pay_from_info.game_id = game_id;	
		var o = $("#game_"+game_id);
		$(".game_list a").removeClass("on");
		$(".game_list a[val='"+game_id+"']").addClass("on");
		//$("#main_select_game").addClass("main_select_on").html(o.text());//"<span class='select_on'></span>"+
		$("#main_select_game").html(o.text());//"<span class='select_on'></span>"+
		if(game && game.b_name){//显示元宝名		
			$('#coin_name').html(game.b_name);
			$('#confirm_coin_name').html(game.b_name);
		}else{
			$('#coin_name').html('元宝');
			$('#confirm_coin_name').html('元宝');
		}
		//获取游戏列表
		get_server(game_id, server_id, actor_id);
		//切到对应tab
		var parent_id = o.parent().parent().attr('id');
		var arr = parent_id.split('_');
		if(arr&&arr.length==3){
			select_game_tab(arr[2]);
		}
		if(!server_id){$("#main_select_server").click();}
	}
	set_redpacket_select(game_id);
	//计算游戏币
	calculate_coin_num();
}
function select_server_tab(tab_index){
	var o = $("#server_tab_"+tab_index);
	o.addClass("on").siblings(".alert_server").removeClass("on");
	$("#server_cnt_"+tab_index).show().siblings(".server_list").hide();
}
/*选择游戏服，并关闭浮框 flag表人工点击 不切换tab*/
function select_server(server_id,flag){
	var o = $("#server_"+server_id);
	if(o.size()<1){
		return false;
	}
	pay_from_info.server_id = server_id;	
	//选中服
	$(".server_list a").removeClass("on");
	$('.server_list a[val="'+server_id+'"]').addClass("on");
	$("#server_id").val(server_id);
	$("#alert_arrow").hide();
	$("#select_game").hide();
	$("#select_server").hide();
//	$("#main_select_server").addClass("main_select_on").html($(o).text());
	$("#main_select_server").html($(o).text());
}
/*获取游戏列表并显示*/
function get_server(s_game_id,server_id,actor_id){
	pay_from_info.server_id = 0;//清空数据
	$("#server_cnt_9999").html('');	
	if(g_my_game){//读取最近玩过的游戏
		/*for(var i=0;i<g_my_game['server'].length;i++){
			var d= g_my_game['server'][i];
			if(d.id==s_game_id){
				if(d.servers){
					var html = '';
					for(var j=0;j<d.servers.length;j++){
						html+='<a val="'+d.servers[j].id+'" onclick="select_server(\''+d.servers[j].id+'\',-9999);" >'+d.servers[j].name+'</a>';
					}
					$("#server_cnt_9999").html(html);
				}
				break;
			}
		}*/
		var html = '';
                var serverstr = '';
		if(typeof(g_my_game['server'][s_game_id])!='undefined'){//echolog(g_my_game['server'][s_game_id]);
			for(var i=0;i<g_my_game['server'][s_game_id].length;i++){
                            if(s_game_id==8){
                                var num = parseInt(g_my_game['server'][s_game_id][i]);                                
                                if(num >515){
                                    var snum = num-515;
                                    serverstr = '新版 '+snum+' 服';
                                }else{
                                    serverstr = '双线 '+g_my_game['server'][s_game_id][i]+' 服';
                                }
                            }else{
				serverstr = '双线 '+g_my_game['server'][s_game_id][i]+' 服';
                            }
                            html+='<a val="'+g_my_game['server'][s_game_id][i]+'" onclick="select_server(\''+g_my_game['server'][s_game_id][i]+'\',-9999);" >'+serverstr+'</a>';
			}
			$("#server_cnt_9999").html(html);
		}
	}
	$("#select_server .st").remove();
	$("#select_server .sl").remove();	
//	$("#main_select_server").removeClass("main_select_on").html("充值服务器");
	$("#main_select_server").html("充值服务器");
	$.ajax({
		type:'GET',
		url:'source/servers_str.php?gid='+s_game_id,
		dataType:'json',
		success:function(json){
			//重新清理标签
			$("#select_server .st").remove();
			$("#select_server .sl").remove();
//			$("#main_select_server").removeClass("main_select_on").html("充值服务器");
			$("#main_select_server").html("充值服务器");

			var server_count = parseInt(json.count);
			var ctotal_page = Math.ceil(server_count/18);
			var total_page = 5;
			if(ctotal_page<=3){
				total_page = ctotal_page;
			}
			var page_size = Math.ceil(server_count/total_page);
			var arr_server_html = new Array(total_page);
			var sid_min_max = new Array(total_page);
			if(server_count<15){
				total_page = 1;
				page_size = 15;
			}
			var other = '';
			var each_key = server_count-1;
			var cserver  = 0;
			$.each(json.data, function(key, val) {
				var html = '<a val="'+val.server_id+'" onclick="select_server(\''+val.server_id+'\',-9999);" id="server_'+val.server_id+'">'+val.name+'</a>';
				cserver = parseInt(val.server_id);
				if(cserver>50000){
					other+=html;
				}else{					
					var index = Math.floor(each_key/page_size);
					//echolog(index);
					if(!arr_server_html[index]){
						arr_server_html[index]="";
					}
					if(!sid_min_max[index]){
						sid_min_max[index]={min:0,max:0};
					}
					//tab最大最小值								
					if(cserver>sid_min_max[index].max || sid_min_max[index].max==0){
						sid_min_max[index].max = cserver;
					}
					if(cserver<sid_min_max[index].min || sid_min_max[index].min==0){
						sid_min_max[index].min = cserver;
					}
					arr_server_html[index]+=html;
				}
				each_key--;
			});
			var tab_html = "",server_html = "";
			for(var j=total_page-1;j>=0;j--){
				if(typeof(arr_server_html[j])=='undefined' || arr_server_html[j]=='')continue;
				var tab_text = sid_min_max[j].max+'-'+sid_min_max[j].min;
				tab_html+='<li class="alert_server st" id="server_tab_'+j+'" onclick="select_server_tab('+j+');">'+tab_text+'服</li>';
				//server_html = "";
				server_html+='<div class="alert_list server_list sl" id="server_cnt_'+j+'">'+arr_server_html[j]+'</div>';				
			}
			if(other){
				tab_html+='<li class="alert_server st" id="server_tab_'+total_page+'" onclick="select_server_tab('+total_page+');">其他</li>';
				server_html+='<div class="alert_list server_list sl" id="server_cnt_'+total_page+'">'+other+'</div>';					
			}
			$(".alert_server_sort").append(tab_html);
			$("#select_server").append(server_html);
			if(server_id && server_id>0){
				select_server(server_id,0);
			}else if($("#server_cnt_9999").html()==''){
				select_server_tab(total_page-1);
			}else{
				select_server_tab(9999);
			}	
		}
	});
}
//选择金额 -1表输入金额
function select_money(index){
	var money = 0;
	$(".main_money .on,.main_other_money .on").removeClass('on');
	if(index==-1){
		money = $("#other_money").val();
		$("#money_9999").addClass('on');
	}else{
		//money = $("#other_money").val();
		var o = $("#money_"+index);
		money = o.attr('val');	
		o.addClass("on");
		$("#other_money").val("");
		$('#money_unit_tips').html('');
	}
	pay_from_info.pay_money = money;
	if(pay_from_info.pay_money<pay_from_info.redpacket_check){
		$('#_97time_redpacket').val(0);
	}
	calculate_coin_num();
}
//计算元宝数
function calculate_coin_num(){
	var money_convert = 10;
	var coin=0,factor=1,coin_rate=0,exchange_rate=10;
	
	var pay_type = arr_pay_type[pay_from_info.pay_type_id];
	var layout = pay_type.pay_rate;
	//兑换比例
	if((typeof(pay_type.no_pay_rate)=='undefined' || !layout) && pay_from_info.game_id){
		$(".proportion").show();
	}else{
		$(".proportion").hide();
	}
	try{
		factor = layout;
		if(pay_from_info.pay_for=='platform'){//充值到平台币
			coin_rate = 10;//平台币充值比例 1：10				
		}else if(pay_from_info.game_id){
			var game = g_game_data[pay_from_info.game_id];
			coin_rate = game.rate;
			if(pay_from_info.game_id==3 && pay_from_info.server_id>=56){
				coin_rate=100;
			}
		}
	}catch(e){}
	exchange_rate = factor * coin_rate;
	$("#exchange_rate").html(exchange_rate);
	coin = pay_from_info.pay_money * exchange_rate;
	pay_from_info.total = coin;
	pay_from_info.redpacket_val = pay_from_info.redpacket_money * coin_rate;
	$("#money_convert").html(pay_from_info.total);
}
/*选择银行*/
function select_bank(key){
	if($('#bank_'+key).size()==0){
		return false;
	}
	pay_from_info.bank=key;
	$("#main_bank a").removeClass("on");
	$('#bank_'+key).addClass("on");

	$('#form_defaultbank').val(key);
}
//其他金额a标签
$("#money_9999").click(function(){
	select_money(-1);
	$("#other_money").focus();
});
//其他金额输入框
$("#other_money").focus(function(){
	select_money(-1);
});	
$("#other_money").keyup(function(){
	var o = $(this);
	var money = o.val();
	money = parseInt(money.replace(/[^0-9]/ig,''));
	o.val(money);
	if(money>0){
		select_money(-1);
	}else{
		$(this).val('0');
	}
});
//设置符合条件的红包
function set_redpacket_select(game_id){
	try{
		pay_from_info.redpacket_money = 0;
		var redpacket_html = '<option value="0">不使用红包</option>';
		var redpacket_flage = true;
		var json = eval(g_redpacket_data);
		for(var i=0; i<json.length; i++){
			if(json[i].game_id==game_id || json[i].game_id==0){
				redpacket_html += '<option value="'+json[i].hongbaoid+'_'+json[i].money+'_'+json[i].value+'">('+json[i].value+'元)'+json[i].from+' (充值金额:'+json[i].money+'元,可使用)</option>';
				redpacket_flage = false;
			}
		}
		if(redpacket_flage){redpacket_html = '<option value="0">没有可使用的红包</option>';}
		$('#_97time_redpacket').html(redpacket_html);
		pay_from_info.redpacket_money = pay_from_info.redpacket_check = pay_from_info.redpacket_val = 0;
		$('#_97time_redpacket').val(0);
		$('#_97time_redpacket_msg').text('');
		calculate_coin_num();
	}catch (e){
		
	}
}
$('#_97time_redpacket').change(function(){
	pay_from_info.redpacket = $(this).val();
	pay_from_info.redpacket_money = pay_from_info.redpacket_check = pay_from_info.redpacket_val = 0;
	$('#_97time_redpacket_msg').text('');
	if(pay_from_info.redpacket!='0'){
		var redpacket_array = pay_from_info.redpacket.split('_');
		pay_from_info.redpacket_money = parseInt(redpacket_array[2]);
		pay_from_info.redpacket_check = parseInt(redpacket_array[1]);
		if(pay_from_info.redpacket_check>pay_from_info.pay_money){
			pay_from_info.redpacket = '0';
			pay_from_info.redpacket_money = pay_from_info.redpacket_check = pay_from_info.redpacket_val = 0;
			$('#_97time_redpacket').val(0);
			$('#_97time_redpacket_msg').text('请选择满足使用条件的红包;');
		}
	}else{
		pay_from_info.redpacket = '0';
		$('#_97time_redpacket').val(0);
	}
	calculate_coin_num();
});

//选择充值类型
$(".main_payFor_a").click(function(){
	select_pay_for($(this).attr("val"));
});
//设置支付帐号
function set_pay_user(username){
	if(username){
		check_user(username);
	}else{
		$(".main_user_account").hide();
		$(".main_user_input").show();
	}
}
function check_user(username){
	$.ajax({
		type:'get',
		url:'api/check_user.php?user_name='+username+'&act=check_user',
		dataType:'html',
		success:function(html){
                        if($.trim(html)=='m1905'){
                            location.href='http://gamepay.1905.com/';
                        }else if($.trim(html) =='ok'){
                                var login_name = unescape(getCookie('login_name'));  
                                var subusername = username.substring(6);
                                if(login_name !='' && subusername ==login_name){
                                    username=subusername;
                                    $('#change_user_span').empty();
                                }
				pay_from_info.pay_user = username;
				$("#username").val(username);	
				$("#login_account").html(username);
				$(".main_user_account").show();
				$(".main_user_input").hide();
			}else{
                            $('#check_username_msg').text(username+' 帐号不存在!');				
                        }
		}
	})
}
//更换帐号名
$("#change_user").click(function(){
	$(".main_user_account").hide();
	$(".main_user_input").show();
	$("#username").focus();
	pay_from_info.pay_user = '';
});
//确定帐号名
$("#define_user").click(function(){
	var username = $("#username").val();
	if(!username){
		$('#check_username_msg').text('请确定充值帐号!');
		$("#username").focus();
		return;
	}
	$('#check_username_msg').text('');
	set_pay_user(username);
});
$("#username").blur(function(){
	$("#define_user").click();	
});
//切换不同类型的游戏tab
$(".alert_game").click(function(){
	var tab_id = $(this).attr('id');
	var arr = tab_id.split('_');
	select_game_tab(arr[2]);
});
//选择游戏，并显示选中游戏的服
$(".game_list a").click(function(){
	var game_id = $(this).attr("val");
	$("#alert_arrow").show().addClass("arrow_server");
	$("#select_game").hide();
	$("#select_server").show();
	//$("#main_select_game").addClass("main_select_on").html("<span class='select_on'></span>"+$(this).text());
	
	select_game(game_id,-9999,-9999);
	get_server($(this).attr('val'));
});
//提交数据 生成订单
function create_order(){
	var game_id  =pay_from_info.game_id;
	var server_id=pay_from_info.server_id;
	var money = pay_from_info.pay_money;
	var bank  = pay_from_info.bank;
	var type  = pay_from_info.pay_type_id;
	var pay_user = pay_from_info.pay_user;
	var order_id = pay_from_info.order_id;
	var pay_for  = pay_from_info.pay_for;
	var redpacket = pay_from_info.redpacket;
	
	$('#platform_pass').val('');
	$('#confirm_platform_coin').hide();
	
	if(pay_for!='platform'){
		if(!game_id){$('#main_select_game').click();return;}
		if(!server_id){$('#main_select_server').click();return;}
	}
	$('#check_username_msg').html('');
	if($(".main_user_input").is(":visible")==true){
		$('#check_username_msg').text('请确定充值帐号!');
		$("#username").focus();
		return;
	}
	if(type==28){
		if(money%10!=0){
			alert('平台币支付必须为10的倍数!');
			return;
		}else if(money<50){
			alert('平台币支付不能少于50平台币!');
			return;			
		}else if(g_platform_coin<50){
			alert('您的平台币不足,请选择其他充值方式！');
			return;
		}else if(g_platform_coin<money){
			alert("您的平台币不足以支付当前选择‘"+money+"平台币’的额度; \n 请选择‘"+g_platform_coin+"平台币’以内的额度！");
			return;
		}else if(money>500000){
                        alert("您的充值金额已超出当日平台币的限额！");
			return;
                }
	}else{
		if(money<10 || money>=500000){
			$('#money_unit_tips').html('(10-500000)之间的整数!');
			$("#other_money").focus();
			return;
		}
	}
	if(type==1 || type==33){
		$('#check_bank_msg').html('');
		if(!bank){alert('请选择支付充值的银行!');return;}
	}
	/*if(order_id!=''){
		alert('已提交订单,请进入充值页面进行充值');
		return;
	}*/
	show_floatdiv('loading');
	$.ajax({
		url:'make_order.php',
		type:'POST',
		data:{'pay_type':type,'game':game_id,'server':server_id,'money':money,'user':pay_user,'dfbank':bank,'pay_for':pay_for,'redpacket':redpacket,'rand':Math.random()},
		success:function(data){
			oflage = /[^\d]/.test(data);
			if(!oflage){
				$('#confirm_game').text($('#main_select_game').text()); // 游戏
				$('#confirm_server').text($('#main_select_server').text()); // 服务器
				$('#confirm_money').text(money); // 金额
				$('#confirm_money1').text(money);// 金额
				$('#confirm_username').text(pay_user); // 帐号
				$('#confirm_pay_type_name').text(arr_pay_type[type].payname); // 充值方式
				$('#confirm_order_id').text(data);
				$('#confirm_coin').text(pay_from_info.total);
				$('#confirm_coin1').text(pay_from_info.total);
				if(pay_from_info.pay_type_id!=28){
					$('#confirm_coin').text(pay_from_info.total+pay_from_info.redpacket_val);
					$('#confirm_coin1').text(pay_from_info.total+pay_from_info.redpacket_val);
					$('#predpacket_money').text(pay_from_info.redpacket_money);
					$('#predpacket1_money').text(pay_from_info.redpacket_money);
					$('#predpacket').show();$('#predpacket1').show();
					if(redpacket=='0' || redpacket==''){
						$('#predpacket').hide();$('#predpacket1').hide();
					}
				}
				$('#show_pay_info').show();
				
				pay_from_info.order_id = data;
		
				if(pay_for=='game'){
					$('#order_pay_for_game').show();
					$('#order_pay_for_platform').hide();
				}else{
					$('#order_pay_for_game').hide();
					$('#order_pay_for_platform').show();
				}
				if(type==28){
					$('#confirm_platform_coin').show();
				}
		
				$('#form_orderid').val(data);
				if(type==1){$('#form_paymethod').val('bankPay');}else{$('#form_paymethod').val('directPay');}
			}else if(data=='pay_for_error'){
				alert('获取订单号类型失败，请重新提交');
			}else if(data=='money_too_more'){
				alert('金额有误，请重新提交');			
                        }else if(data=='pay_money_too_more'){
				alert('超出了当天的充值限额，请明天再来继续充值吧');
			}else if(data=='nologin'){
				alert('平台币支付请先登录');
			}else if(data=='redpacket_error'){
				alert('红包已经使用,请选择尚未使用过的红包');
			}else{
				alert('获取订单号失败，请重新提交');
			}
			//called when successful
			close_floatdiv('loading');
		},
		error:function(xhr){
			//called when there is an error
			alert('网络异常，请刷新页面重试');
			close_floatdiv('loading');
		}
	});
}
function confirm_submit(){
	var type  = pay_from_info.pay_type_id;
	if(type==28){
		var platform_pass = $('#platform_pass').val();
		if(platform_pass.length<=5){
			alert('请正确输入平台二级密码');
			$("#platform_pass").focus();
			return false;
		}
		$("#platform_pass").val($.md5($("#platform_pass").val()));
	}
	$('#payform').submit();
	$('#show_pay_info').hide();
	$('#show_pay_success').show();
}
//选择银行
$(".main_bank a").click(function(){
	select_bank($(this).attr('val'));
});
$('#main_more_bank').click(function(event){
	$(this).hide();
	$('#main_close_bank').hide();
	$('#showmaxbank').show();
});
$('#main_close_bank').click(function(event) {
	$(this).hide();
	$('#main_more_bank').show();
	$('#showmaxbank').hide();
});
//提交充值 生成订单
$(".main_confirm a").click(function(){
	create_order();
});
$("#paltform_coin_balance_num").text(g_platform_coin);

function tips_type(type){
	html = '<strong>网上银行(快钱)充值说明：</strong><p>1.使用网银充值必须开通网上银行业务,需要到银行卡所在银行前台人工开通网银业务即可.<br/>2.注必需拥有一个电子邮箱地址<br/>3.请关闭所有弹出窗口之类的功能,否则在线支付将无法继续.如google toolbar,上网助手,elexa toolbar,baidu等.<br/>4.在浏览器尚未跳转或弹出97time网游戏平台充值成功的页面前,请不要关闭充值窗口.<br/><span style="color:red">备注: <a href="https://www.99bill.com/fiquery/common/selfhelpquery/selfhelpquery.htm?method=index" target="_blank" style="text-decoration:underline;color:#f00;">网上银行(快钱)交易明细</a></span></p>';
	switch(type){
		case 1:
			html = '<strong>网上银行(快钱)充值说明：</strong><p>1.使用网银充值必须开通网上银行业务,需要到银行卡所在银行前台人工开通网银业务即可.<br/>2.注必需拥有一个电子邮箱地址<br/>3.请关闭所有弹出窗口之类的功能,否则在线支付将无法继续.如google toolbar,上网助手,elexa toolbar,baidu等.<br/>4.在浏览器尚未跳转或弹出97time网游戏平台充值成功的页面前,请不要关闭充值窗口.<br/><span style="color:red">备注: <a href="https://www.99bill.com/fiquery/common/selfhelpquery/selfhelpquery.htm?method=index" target="_blank" style="text-decoration:underline;color:#f00;">网上银行(快钱)交易明细</a></span></p>';
		break;
		case 2:
			html = '<strong>网上银行(易宝)充值说明：</strong><p>1.使用网银充值必须开通网上银行业务,需要到银行卡所在银行前台人工开通网银业务即可.<br/>2.注必需拥有一个电子邮箱地址<br/>3.请关闭所有弹出窗口之类的功能,否则在线支付将无法继续.如google toolbar,上网助手,elexa toolbar,baidu等.<br/>4.在浏览器尚未跳转或弹出97time网游戏平台充值成功的页面前,请不要关闭充值窗口.<br/><span style="color:red">备注: <a href="https://www.yeepay.com/article/queryarticle/53c37e5dc83bd7d83151b972" target="_blank" style="text-decoration:underline;color:#f00;">网上银行(易宝)交易明细</a></span></p>';
		break;
		case 3:
			html = '<strong>快钱帐号充值充值说明：</strong><p>1.用快钱帐号充值的用户,请保证您的快钱帐号有足够的现金.<br/>2.本充值方式同时支持国内常用银行的在线银行支付.<br/>3.请关闭所有屏蔽弹出窗口之类的功能,否则支付将无法继续.比如:google toolbar,上网助手,alexa toolbar,baidu等.<br/>4.在浏览器尚未跳转或弹出97time网游戏平台充值成功的页面前,请不要关闭充值窗口.<br/><span style="color:red">备注: <a href="https://www.99bill.com/fiquery/common/selfhelpquery/selfhelpquery.htm?method=index" target="_blank" style="text-decoration:underline;color:#f00;">快钱帐号充值交易明细</a></span></p>';
		break;
		case 4:
			html = '<strong>支付宝(余额)充值说明：</strong><p>1.用支付宝帐户支付的用户,请保证您的支付宝帐户有足够的现金.<br/>2.本充值方式同时支持国内常用银行的在线银行支付.<br/>3.请关闭所有屏蔽弹出窗口之类的功能,否则支付将无法继续.比如:google toolbar,上网助手,alexa toolbar,baidu等.<br/>4.在浏览器尚未跳转或弹出97time网游戏平台充值成功的页面前,请不要关闭充值窗口.</p>';
		break;
		case 5:
			html = '<strong>Q币卡支付充值说明：</strong><p>1.充值卡面额必须与实际使用的<font style="color:red">充值卡面额一致</font>,否则将导致支付金额丢失或卡余额丢失失效,且无法弥补,请仔细确认.<br/>2.如果您在充值过程中遇到问题,请及时联系<a href="#" onclick="url53kf();return false;" style="color:red">在线客服</a>或者拨打客服热线：020-875797time<br/>3.您可以在身边的报刊亭、便利店、网吧、软件店、零售店购买到Q币卡.<br/><span style="color:red">备注: <a href="http://www.yeepay.com/app-merchant-proxy/QueryStoreAccount.action?sQuery=1#tips" target="_blank" style="text-decoration:underline;color:#f00;">Q币卡支付交易明细</a></span></p>';
		break;
		case 6:
			html = '<strong>骏网一卡通充值说明：</strong><p>1.请务必选择与实际面额一致的金额，否则可能会造成金额丢失.<br/>2.使用骏网充值必须选择购买骏网通用卡进行支付.骏网限制卡类平台不支持.<br/>3.充值尚未成功请不要关闭充值窗口.耐心等待一会。请玩家保留充值的卡号以便日后充值失败联系客服提供的重要信息.<br/><span style="color:red">备注: <a href="http://www.yeepay.com/app-merchant-proxy/QueryStoreAccount.action" target="_blank" style="text-decoration:underline;color:#f00;">骏网一卡通交易明细</a></span></p>';
		break;
		case 7:
			html = '<strong>神州行充值充值说明：</strong><p>1)由中国移动发行的全国通用的所有面额的神州行充值卡:卡号17位，密码18位。面额：10，20，30，50，100，300，500元.请勿使用其他面额进行支付.<br/>2)支持江苏地方神州行卡，卡号16位，密码17位。面额：30，50，100元.<br/>3)支持浙江地方神州行卡，卡号10位，密码8 位。面额：20，30，50，100元.<br/>4)支持福建移动充值卡（卡号16位，密码17位）。面额： 10,20,30,50,100 元.<br/>5)支持辽宁移动充值卡（卡号16位，密码21位）。面额： 10,20,30,50,100 元.(以上介绍信息以快钱为准) <br/>1、请务必使用与您选择的面额相同的神州行卡进行支付，否则引起的交易失败交易金额不予退还。如：选择50元面额但使用100元卡支付，则系统认为实际支付金额为50元，高于50元部分不予退还；选择50元面额但使用30元卡支付则系统认为支付失败，30元不予退还. 由此造成充值失败或金额丢失.97time平台不承担任何责任.<br/>2、神州行的系统网关验证比较严格所以充值成功之后需要稍等一会。请玩家保留充值的卡号以便日后充值失败联系客服提供重要信息。<br/><span style="color:red">备注: <a href="https://www.99bill.com/szx_gateway/ftl/inc_szxGatewayQuery.htm" target="_blank" style="text-decoration:underline;color:#f00;">神州行充值交易明细</a></span></p>';
		break;
		case 8:
			html = '<strong>电信卡充值充值说明：</strong><p>1.请务必选择与实际面额一致的金额，否则可能会造成金额丢失.<br/>2.支持如下卡类：电信全国充值卡--序列号：19位 密码：18位，卡号第四位为1。面额：50，100元 (以上介绍信息以快钱为准).<br/>3.充值尚未成功请不要关闭充值窗口.耐心等待一会。请玩家保留充值的卡号以便日后充值失败联系客服提供的重要信息.<br/><span style="color:red">备注: <a href="https://www.99bill.com/szx_gateway/ftl/inc_szxGatewayQuery.htm" target="_blank" style="text-decoration:underline;color:#f00;">电信卡充值交易明细</a></span></p>';
		break;
		case 9:
			html = '<strong>联通卡充值充值说明：</strong><p>1.请务必选择与实际面额一致的金额，否则可能会造成金额丢失.<br/>2.支持如下卡类：联通全国充值卡--序列号：15位 密码：19位。面额：20，30，50，100元(以上介绍信息以快钱为准).<br/>3.充值尚未成功请不要关闭充值窗口.耐心等待一会。请玩家保留充值的卡号以便日后充值失败联系客服提供的重要信息.<br/><span style="color:red">备注: <a href="https://www.99bill.com/szx_gateway/ftl/inc_szxGatewayQuery.htm" target="_blank" style="text-decoration:underline;color:#f00;">联通卡充值交易明细</a></span></p>';
		break;
		case 10:
			html = '<strong>平台币支付说明：</strong><br/>1.您必须设置了平台二级密码. <a style="color:red" href="http://www.97time.com/users/users_pwd2.php" target="_blank">马上设置</a><br/>2.每次支付平台币最低额度为50平台币.<br/>3.暂不支持将平台币充值到其它帐号.<br/><span style="color:red">4.每个账号每天只能充值500000平台币.</span><br/><span style="color:red">5.请充值时务必确认好您的充值金额准确无误后再进行充值，避免输错金额导致的失误，如因未仔细确认金额造成的充值问题，我们将一律不予处理此类退款申诉.</span><br/><span style="color:red">备注: <a href="http://www.97time.com/users/users_platform.php" target="_blank" style="text-decoration:underline;color:#f00;">平台币支付明细</a></span></p>';
		break;
		case 12:
			html = '<strong>微信支付说明：</strong><p>1.使用网银充值必须开通网上银行业务,需要到银行卡所在银行前台人工开通网银业务即可.<br/>2.注必需拥有一个电子邮箱地址<br/>3.请关闭所有弹出窗口之类的功能,否则在线支付将无法继续.如google toolbar,上网助手,elexa toolbar,baidu等.<br/>4.在浏览器尚未跳转或弹出97time网游戏平台充值成功的页面前,请不要关闭充值窗口.</p>';
		break;
		case 13:
			html = '<strong>网上银行(盛付通)充值说明：</strong><p>1.使用网银充值必须开通网上银行业务,需要到银行卡所在银行前台人工开通网银业务即可.<br/>2.注必需拥有一个电子邮箱地址<br/>3.请关闭所有弹出窗口之类的功能,否则在线支付将无法继续.如google toolbar,上网助手,elexa toolbar,baidu等.<br/>4.在浏览器尚未跳转或弹出97time网游戏平台充值成功的页面前,请不要关闭充值窗口.<br/><span style="color:red">备注: <a href="http://www.97time.com/kefu.html" target="_blank" style="text-decoration:underline;color:#f00;">网上银行(盛付通)交易明细</a></span></p>';
		break;
		default:
		break;
	}
	$('.main_explain').html(html);
}