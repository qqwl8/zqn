var login_name='';
var pay_info = {gid:0,sid:0,pay_user:'',pay_tag:0,pay_way:'',pay_bank:'',cardpay_rate:0,pay_money:10,exchange_rate:0,pay_got_gold:0,orderid:0};
select_pay_way('alipay','支付宝(余额)','100');
function fullbg(){$("#fullbg").show();}
function fullbghide(){$("#fullbg").hide();}
function show_floatdiv(id){fullbg();}
function close_floatdiv(id){$('.float_div').hide();fullbghide();}
//是否登陆	
$.ajax({
	type:'post',
	async:false,
	data:'',
	url:"/hall/history",
	cache:false,
	dataType:'json',
	success: function(data) {
	  if (data.username != "") {
	  	login_name = data.username;
	  	var content = '您好, '+login_name+'<a href="/accounts/loginout">[注销]</a>';
	    $('#login_flage').html(content);
		set_pay_user(login_name);
	  }
	}
});	
var Query_username = getQueryStringByName('username');
if(Query_username!=''){
	$("#username").val(Query_username);	
	$("#login_account").html(Query_username);
	$(".main_user_account").hide();
	$(".main_user_input").show();
	if(login_name!='' && login_name!=Query_username)
		$('#check_username_msg').text('与当前登陆账号不一致');
}
//展开选择游戏
$("#main_select_game").click(function(){	
	if(login_name=='') $("#game_tab_9999").hide();
	$("#alert_arrow").show().removeClass("arrow_server");
	$("#select_game").show();
	$("#select_server").hide();
	select_game_tab('0');
});
//展开选择服
$("#main_select_server").click(function(){
	if(login_name=='') $("#server_tab_9999").hide();
	$("#alert_arrow").show().addClass("arrow_server");
	$("#select_game").hide();
	$("#select_server").show();
	select_server_tab('0');
});
//关闭选择游戏或服的浮框
$(".alert_select_close").click(function(){
	$("#alert_arrow").hide();
	$("#select_game").hide();
	$("#select_server").hide();
});
//切换 最近/全部
$(".alert_game").click(function(){
	var tab_id = $(this).attr('id');
	var arr = tab_id.split('_');
	select_game_tab(arr[2]);
});
$(".alert_server").click(function(){
	var tab_id = $(this).attr('id');
	var arr = tab_id.split('_');
	select_server_tab(arr[2]);
});
//选定游戏，并显示选中游戏的服
$(".game_list a").click(function(){
	var gid = $(this).attr("val");
	var exchange_rate = $(this).attr("gold-rate");
	$("#alert_arrow").show().addClass("arrow_server");
	$("#select_game").hide();
	$("#select_server").show();
	select_game(gid,exchange_rate);
	get_server(gid);
});
//确定帐号
$("#define_user").click(function(){
	var username = $("#username").val();
	if( login_name!=username){
		console.log(Query_username+'1');
		$("#rebatecard").hide();
	}else{
		console.log(Query_username+'1');
		$("#rebatecard").show();
	}
	if(!username){
		$('#check_username_msg').text('请确定充值帐号!');
		$("#username").focus();
		return;
	}
	$('#check_username_msg').text('');
	check_user(username);
});
$("#username").blur(function(){
	$("#define_user").click();	
});
//更换帐号名
$("#change_user").click(function(){
	$(".main_user_account").hide();
	$(".main_user_input").show();
	$("#username").focus();
	pay_info.pay_user = '';
});
//提交数据
$('#pay_submit').click(function(){
/*	$.ajax({
		type:'post',
		async:false,
		data:'',
		url:"/pay/create_order",
		cache:false,
		dataType:'json',
		success: function(data) {
		  if (data.orderid != "") {
		  	pay_info.order_id=data.orderid;
		  }
		}
	});
	*/
	var gid          = pay_info.gid;
	var sid          = pay_info.sid;
	var money        = pay_info.pay_money;
	var card         = pay_info.pay_card;
	var pay_got_gold = pay_info.pay_got_gold;
	var pay_tag     = pay_info.pay_tag;
	var pay_way     = pay_info.pay_way;
	var pay_bank     = pay_info.pay_bank;
	var pay_user     = pay_info.pay_user;
	var order_id     = pay_info.order_id;
	$('#platform_pass').val('');
	$('#confirm_platform_coin').hide();
	
	
	var pay_platform = $('input[name="platform"]:checked').val(); 
	if(pay_platform == 0)
	{
		if(!gid){$('#main_select_game').click();return;}
		if(!sid){$('#main_select_server').click();return;}
	}
	$('#check_username_msg').html('');


/*	if(money<10 || money>=500000){
		$('#money_unit_tips').html('请输入(10-500000)之间的整数!');
		$("#other_money").focus();
		return;
	}*/
	if(pay_platform == 0)
	{
	$('#confirm_game').text($('#main_select_game').text()); // 游戏
	$('#confirm_server').text($('#main_select_server').text()); // 服务器
	}
	else
	{
	$('#confirm_game').text("充值到平台币"); // 游戏
	$('#confirm_server').text("充值到平台币"); // 服务器
	}
	$('#confirm_money').text(money); // 金额
	$('#confirm_money1').text(money);// 金额
	$('#confirm_username').text(pay_user); // 帐号
	$('#confirm_pay_type_name').text(pay_way); // 充值方式
	$('#confirm_order_id').text(order_id);
	$('#confirm_coin').text(pay_got_gold);
	$('#confirm_coin1').text(pay_got_gold);
	$('#show_pay_info').show();

	$('#_input_game_id').val(gid);
	$('#_input_server_id').val(sid);
	$('#_input_order_id').val(order_id);
	$('#_input_member_name').val(pay_user);
	$('#_input_re_member_name').val(pay_user);
	$('#_input_pay_amount').val(money);
	$('#_input_pay_type').val(pay_tag);
	$('#_input_pay_bank').val(pay_bank);
	$('#_input_card').val(card);
	$('#_input_pay_platform').val(pay_platform);

	$('#order_pay_for_game').show();
	$('#order_pay_for_platform').hide();
});

//选择充值方式
function select_pay_way(pay_tag,pay_way,cardpay_rate){
	$('.li_'+pay_tag).addClass('this').siblings().removeClass('this');
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
	pay_info.pay_tag=pay_tag;
	pay_info.pay_way=pay_way;
	pay_info.cardpay_rate=cardpay_rate;
	calculate_gold_num();
	switch(pay_tag){
		case 'alipay':
			alipay();
		break;
		case 'yeepay':
			yeepay();
		break;
		case 'chinabank':
			chinabank();
			break;
		case 'weixin':
			weixin();
		break;
		case 'JUNNET':
			JUNNET();
		break;
		case 'sndacard':
			sndacard();
		break;
		case 'yeepay_szx':
			yeepay_szx();
		break;
		case 'telecom':
			telecom();
		break;
		case 'unicom':
			unicom();
		break;
		case 'qqcard':
			qqcard();
		break;
		case 'netease':
			netease();
		break;
		default: 
			alipay();
		break;
	}
	tips_type(pay_tag);
}
//获取？后面的参数
function getQueryStringByName(name){
  var result = location.search.match(new RegExp("[\?\&]" + name+ "=([^\&]+)","i"));
  if(result == null || result.length < 1){
  return "";
  }
  return result[1];
}
/*选择游戏Tab页*/
function select_game_tab(tab_index){
	var o = $("#game_tab_"+tab_index);
	o.addClass("on").siblings(".alert_game").removeClass("on");
	$("#game_cnt_"+tab_index).show().siblings(".game_list").hide();
}
function select_server_tab(tab_index){
	var o = $("#server_tab_"+tab_index);
	o.addClass("on").siblings(".alert_server").removeClass("on");
	$("#server_cnt_"+tab_index).show().siblings(".server_list").hide();
}
/*选择游戏*/
function select_game(gid,exchange_rate){
	//保存数据
	if(gid && pay_info.gid != gid){
		pay_info.gid = gid;	
		pay_info.exchange_rate = exchange_rate;
		var o = $("#game_"+gid);
		$(".game_list a[val='"+gid+"']").addClass("on").siblings().removeClass("on");
		//$("#main_select_game").addClass("main_select_on").html(o.text());//"<span class='select_on'></span>"+
		$("#main_select_game").html(o.text());//"<span class='select_on'></span>"+
		$('#gold_name').html('元宝');
		$('#confirm_gold_name').html('元宝');
		get_server(gid);//获取游戏列表
	}
	calculate_gold_num();//计算游戏币
}
/*选择游戏服，并关闭浮框 flag表人工点击 不切换tab*/
function select_server(sid){
	var o = $("#server_"+sid);
	if(o.size()<1){
		return false;
	}
	pay_info.sid = sid;
	//选中服
	$(".server_list a").removeClass("on");
	$('.server_list a[val="'+sid+'"]').addClass("on");
	$("#sid").val(sid);
	$("#alert_arrow").hide();
	$("#select_game").hide();
	$("#select_server").hide();
	$("#main_select_server").html($(o).text());
}
/*选择银行*/
//选择银行
$(".main_bank a").click(function(){
	pay_info.pay_bank=$(this).attr('val');
	$("#main_bank a").removeClass("on");
	$(this).addClass("on");
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
	
	pay_info.pay_money = money;
	calculate_gold_num();
}
//选择优惠卡
function select_card(index){
	var card = 0;
	$(".rebate_con .on").removeClass('on');
	var o = $("#card_"+index);
	card = o.attr('val');	
	o.addClass("on");

	pay_info.pay_card = card;
}
/*获取游戏列表并显示*/
function get_server(gid){
	pay_info.sid = 0;//清空数据
	$("#server_cnt_9999").html('');
	$("#server_cnt_0").html('');
	if(login_name){//最近玩过区服
		var html = '';
        var serverstr = '';
		$.ajax({
			url:'/hall/server_show/',
			type:'GET',
			dataType:'json',
			success:function(data){
				console.log(data);
			}	
		});
	}
	$("#main_select_server").html("充值服务器");
	$.ajax({
		type:'GET',
		url:'/hall/server_show/gid/'+gid,
		dataType:'jsonp',
		'jsonp':'callback',
		success:function(data){
			$("#main_select_server").html("充值服务器");
			var server_html = "";
			if(data==null) server_html = "该游戏暂无区服！";
			else
			$.each(data, function(i, item){    
				server_html+='<a val="'+item['sid']+'" id="server_'+item['sid']+'" onclick="select_server(\''+item['sid']+'\');" val="'+item['sid']+'">'+item['servername']+'</a>';   
			});
			$('#server_cnt_0').html(server_html);
			$("#main_select_server").trigger('click');
		}
	});
}
//设置支付帐号
function set_pay_user(username){
	pay_info.pay_user = username;
	$("#username").val(username);	
	$("#login_account").html(username);
}
function check_user(username){
	$.ajax({
		url:'/accounts/username_pay_check',
		type:'get',
		data:'u='+username+'&gid='+pay_info.gid+'&sid='+pay_info.sid,
		dataType:'json',
		success:function(data){
			if(data.state==1){
				set_pay_user(username);
			}else{
				$('#check_username_msg').text(username+data.msg);
				set_pay_user(username);
			}
		}	
	});
}
//计算元宝数
function calculate_gold_num(){
	//兑换比例
	if(pay_info.exchange_rate!=0){
		$(".proportion").show();
	}else{
		$(".proportion").hide();
	}
	$("#exchange_rate").html((pay_info.cardpay_rate/100)*pay_info.exchange_rate);
	var got_gold = pay_info.pay_money * (pay_info.cardpay_rate/100) * pay_info.exchange_rate;
	pay_info.pay_got_gold = got_gold;
	$("#money_convert").html(got_gold);
}
function confirm_submit(){
	$('#payform').submit();
	$('#show_pay_info').hide();
	$('#show_pay_success').show();
}
function show_result(a){
	a.href="/pay/pay_result/order_id/"+pay_info.order_id;
	a.target = '_blank';
}
function pay_service(){
	window.open('/service/');
}
function payok_return(){
	fullbghide();
	$('#show_pay_success').hide();
	return false;
}
//alipay
function alipay(){
	$('#main_bank').hide();
	$('#main_other_money').show();
}
function yeepay(){
	$('#main_bank').show();
	$('#main_other_money').show();
}
function chinabank(){
/*	$('#main_bank').show();
	$('#main_other_money').show();*/
}
function weixin(){
	$('#main_bank').hide();
	$('#main_other_money').show();
}
function JUNNET(){
	$('#main_bank').hide();
	$('#main_other_money').hide();
}
function sndacard(){
	$('#main_bank').hide();
	$('#main_other_money').hide();
}
function yeepay_szx(){
	$('#main_bank').hide();
	$('#main_other_money').hide();
}
function telecom(){
	$('#main_bank').hide();
	$('#main_other_money').hide();
}
function unicom(){
	$('#main_bank').hide();
	$('#main_other_money').hide();
}
function qqcard(){
	$('#main_bank').hide();
	$('#main_other_money').hide();
}
function netease(){
	$('#main_bank').hide();
	$('#main_other_money').hide();
}
function tips_type(type){
	html = '<strong>支付宝(余额)充值说明：</strong><p>1、支付宝余额支付：只要您的支付宝账户中存有余额，就可以为游戏进行充值。<br/>2、银行卡支付：只要您拥有与支付宝公司合作银行中的任意一张银行卡，并开通“网上银行”服务，即可完成充值。<br/>3、如果您用信用卡支付，请确认该信用卡的网上交易限额大于等于您的充值金额。<br/></p>';
	switch(type){
		case 'alipay':
			html = '<strong>支付宝(余额)充值说明：</strong><p>1、支付宝余额支付：只要您的支付宝账户中存有余额，就可以为游戏进行充值。<br/>2、银行卡支付：只要您拥有与支付宝公司合作银行中的任意一张银行卡，并开通“网上银行”服务，即可完成充值。<br/>3、如果您用信用卡支付，请确认该信用卡的网上交易限额大于等于您的充值金额。<br/></p>';
		break;
		case 'chinabank':
			html = '<strong>银行卡充值说明：</strong><p>1、您必须开通了网上银行业务；<br/>2、网上银行开通办法请咨询当地所属银行；<br/>3、请您关闭所有屏蔽弹出窗口之类的功能，否则在线支付将无法继续，比如：3721、上网助手、google toolbar、alexa toolbar、baidu等；<br/>4、如果您用信用卡支付，请确认该信用卡的网上交易限额大于等于您的充值金额；<br/>5、请充值时务必确认好您的充值金额准确无误后再进行充值，避免输错金额导致的失误，如因未仔细确认金额造成的充值问题，我们将一律不予处理此类退款申诉。<br/></p>';
		break;
		case 'weixin':
			html = '<strong>微信支付说明：</strong><p><br/></p>';
		break;
		case 'JUNNET':
			html = '<strong>骏网充值卡充值说明：</strong><p>1、请确认您的骏卡充值卡是由“北京汇元网科技有限责任公司”发行的充值卡。<br/>2、请按卡面金额进行充值，如填写额度不正确可能会无法完成充值。<br/>3、不能使用特定游戏专属充值卡支付。<br/>4、骏卡充值有手续费，手续费为16%。【该手续费为发卡单位收取】。<br/>5、如果有疑问，请拨打骏网充值卡客服电话：010－58103559。</p>';
		break;
		case 'sndacard':
			html = '<strong>盛大游戏卡充值说明：</strong><p>1、请使用卡号以CSC5、CS、S、CA、CSB、YC、YD、YA、YB、801335开头的“盛大互动娱乐卡”进行支付，暂不支持SC开头的卡。<br/>2、盛大游戏卡支持面值：5元、10元、30元、35元、45元、100元、350元、1000元。<br/>3、盛大游戏卡充值有手续费，手续费为16%。【该手续费为发卡单位收取】<br/>4、如果有疑问，请联系我们在线客服或拨打客服电话。</p>';
		break;
		case 'szx':
			html = '<strong>神州行(易宝)充值卡说明：</strong><p>1、请确认您的充值卡是序列号17位、密码18位，由中国移动发行的全国通用的神州行充值卡，而且是没有使用过的。<br/>2、请务必使用与您选择的面额相同的神州行卡进行支付，如果选择金额额度不正确会导致卡面金额丢失。<br/>本充值方式还支持江苏、浙江、广东、辽宁、福建的神州行地方卡。支持300和500元面额。<br/>5、如果有疑问，请联系我们在线客服或拨打客服电话。</p>';
		break;
		case 'telecom':
			html = '<strong>电信卡充值说明：</strong><p>1、支持中国电信发行的电信一卡充支付，面值为20元、30元、50元、100元、300元、500元。<br/>2、电信卡充值有手续费，手续费为6%。【该手续费为发卡单位收取】。<br/>3、如果有疑问，请联系我们在线客服或拨打客服电话。</p>';
		break;
		case 'unicom':
			html = '<strong>联通卡充值说明：</strong><p>1、支持中国联通发行的联通一卡充支付，面值为20元、30元、50元、100元、300元、500元。<br/>2、联通卡充值有手续费，手续费为6%。【该手续费为发卡单位收取】。<br/>3、如果有疑问，请联系我们在线客服或拨打客服电话。</p>';
		break;
		case 'qqcard':
			html = '<strong>QQ一卡通充值说明：</strong><p></p>';
		break;
		case 'netease':
			html = '<strong>网易一卡通充值说明：</strong><p></p>';
		break;
		default:
		break;
	}
	$('.main_explain').html(html);
}


/*选择游戏*/
function open_all_game_data1(){
    $("#cz_select_game").css('display','block');
	$("#cz_select_server").css('display','none');
}
function close_all_game_data1(){
    $("#cz_select_game").css('display','none');
	$("#cz_select_server").css('display','none');
}

function close_all_sever_data2(){
    $("#cz_select_server").css('display','none');
	if($("#qfSet a").html()=="选择区服"){
		$("#msg_for_game").show();
		$("#msg_for_game").html("服务器不能为空!");
	}
	
}
function open_all_sever_data2(){
		if($("#gameSet a").html()=="选择游戏"){
				$("#msg_for_game").html("充入游戏不能为空!");
			}else{
					$("#cz_select_server").show();
				}
	}

function getserver(name,val){
	$("#server_id").val(val);
    $("#qfSet a").html(name);
	$("#qfSet1 a").html(name);
    $("#cz_select_game").hide();
	$("#cz_select_server").hide();
	$("#msg_for_game").hide();
}