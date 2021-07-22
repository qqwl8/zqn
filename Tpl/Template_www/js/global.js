//获取当前年份
function getCurrYear(id){var my_date = new Date();var curr_year = my_date.getFullYear();document.getElementById(id).innerHTML=curr_year;}
// 设为首页 <a onclick="setHome(this,window.location)">设为首页</a>
function setHome(obj,vrl){try{obj.style.behavior='url(#default#homepage)';obj.setHomePage(vrl)}catch(e){if(window.netscape){try{netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect")}catch(e){alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。")}var prefs=Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);prefs.setCharPref('browser.startup.homepage',vrl)}}}
// 收藏首页 <a onclick="addFavorite(window.location,'97time网页游戏平台')">收藏首页</a>
function addFavorite(sURL,sTitle){try{window.external.addFavorite(sURL,sTitle)}catch(e){try{window.sidebar.addPanel(sTitle,sURL,"")}catch(e){alert("加入收藏失败，请使用Ctrl+D进行添加")}}}
// 设置Cookie
function setCookie(cookieName,cookieValue,seconds){var expires=new Date();expires.setTime(expires.getTime()+parseInt(seconds)*1000);document.cookie=escape(cookieName)+'='+escape(cookieValue)+(seconds?('; expires='+expires.toGMTString()):"")+'; path=/; domain=97time.com;'}
// 获取Cookie
function getCookie(cname){var cookie_start=document.cookie.indexOf(cname);var cookie_end=document.cookie.indexOf(";",cookie_start);return cookie_start==-1?'':decodeURI(document.cookie.substring(cookie_start+cname.length+1,(cookie_end>cookie_start?cookie_end:document.cookie.length)))}
// 获取来路信息,保存到Cookie
function getReferrer(){var str=document.referrer;if(str){temp=str.split("//");website=temp[1].split("/");websiteFrame=website[0].split(".");if(websiteFrame[1]+"."+websiteFrame[2]!='97time.com'){set_cookie("from_url",str,1)}}}
try{getReferrer();}catch(e){}
// 获取url传递的参数
function getQueryString(queryStringName){var returnValue="";var URLString=new String(document.location);var serachLocation=-1;var queryStringLength=queryStringName.length;do{serachLocation=URLString.indexOf(queryStringName+"\=");if(serachLocation!=-1){if((URLString.charAt(serachLocation-1)=='?')||(URLString.charAt(serachLocation-1)=='&')){URLString=URLString.substr(serachLocation);break}URLString=URLString.substr(serachLocation+queryStringLength+1)}}while(serachLocation!=-1)if(serachLocation!=-1){var seperatorLocation=URLString.indexOf("&");if(seperatorLocation==-1){returnValue=URLString.substr(queryStringLength+1)}else{returnValue=URLString.substring(queryStringLength+1,seperatorLocation)}}returnValue=returnValue.replace(/#/g,'');return returnValue;}
try{var _docu_ref = escape(document.referrer);if(_docu_ref.indexOf('97time.com')==-1 && ref!=''){setCookie("from_url",_docu_ref,3600);}}catch(e){}

// 53kefu
function url53kf(){window.open('http://wpa.b.qq.com/cgi/wpa.php?ln=1&key=XzkzODA1NDIxMl8yNzAxNjVfNDAwOTY5MDkwMl8yXw');}
// 复制内容
function copyCode(){ZeroClipboard.setMoviePath('http://image.97time.com/images/ZeroClipboard.swf');var clip=new ZeroClipboard.Client();clip.setText('');clip.setHandCursor(true);clip.setCSSEffects(true);clip.addEventListener('load',function(client){});clip.addEventListener('complete',function(client,text){clip.hide()});clip.addEventListener('mouseOver',function(client){});clip.addEventListener('mouseOut',function(client){});clip.addEventListener('mouseDown',function(client){clip.setText(document.getElementById('card_id').innerHTML)});clip.addEventListener('mouseUp',function(client){alert("复制成功!")});clip.glue('d_clip_button')}
// 指定url
var _global_php_url = {'login':'http://www.97time.com/api/check_login_user.php','cuser':'http://www.97time.com/api/check_reg.php','kfgs':'http://www.97time.com/api/get_select_game_server.php','sign':'http://www.97time.com/api/user_sign.php','getuser':'http://www.97time.com/api/get_user.php','edituserimg':'http://www.97time.com/api/user_img.php','kfqq':'http://www.97time.com/api/kefu_qq.php'};
// 登录
function login(){var back_url=location.href.replace('#','');var login_user=$('#login_user').val();var login_pwd=$('#login_pwd').val();if(login_user==''||login_user=='帐号'){login_tips.show_msg('请输入帐号');$('#login_user').focus();return false;}if(login_pwd==''){login_tips.show_msg('请输入密码');$('#login_pwd').focus();return false;}var params={'login_user':login_user,'login_pwd':login_pwd,'act':'login'};loading_tips.timeout=10000;loading_tips.show('loading','正在登录,请稍后...');$.ajax({url:_global_php_url.login,type:'POST',dataType:'json',data:params,success:function(data){switch(data.code.toString()){case '01':loading_tips.hide();login_tips.show_msg(data.msg);break;case '02':loading_tips.hide();login_tips.show_verify();break;case '11':location.href=back_url;break;case '10':location.href=back_url;break;default:location.href=location.href;break;}},error:function(){loading_tips.hide();login_tips.show_msg('网络故障,验证失败!');return false;}});}
// 判断登录状态并修改顶部状态
function checkLogined(){
	$('#_97time_logined').hide();$('#_97time_login').show();$('#topul >.li1').hide();$('#topul >.li2').hide();
	var login_name=unescape(getCookie('login_name')),last_name=unescape(getCookie('last_name'));
	if(login_name){
		$('#_97time_logined').show();$('#_97time_login').hide();
		$('#logined_username').html('<a href="http://www.97time.com/users/" style="color:#FFF;" target="_blank">'+login_name+'</a> ');
		$('#_97time_user_name_top').text(login_name);
		$('#topul >.li1').show();
        $('#topul >.li2').show();
		var user_info = unescape(getCookie('userinfo'));
		if(user_info){ui = user_info.split("|");if(ui[4]){$('#uimgmin').attr('src','http://www.97time.com'+ui[4]);}}
		var login_game_info = unescape(getCookie('login_game_info'));
		var playedGames='';
		if(login_game_info != 0){
			var gameList = login_game_info.split("<a");
			if(gameList.length>0){
				for(var i =0;i < gameList.length;i++){
					gameinfo = gameList[i].split("_");
					key=0;
					playedGames += "<span><a href='http://www.97time.com/users/gamelogin.php?game="+gameinfo[key]+"&server="+gameinfo[key+1]+"' title='进入 "+gameinfo[key+2]+"' target='_blank'> > &nbsp;"+gameinfo[key+2]+"</a> <a href='http://pay.97time.com/?game_id="+gameinfo[key]+"&server_id="+gameinfo[key+1]+"' target='_blank' style='color:#d60000;float:right;font-weight:bold;width:50px;text-align:center;' title='充值 "+gameinfo[key+2]+"'>[充值]</a></span>";
				}
			}
        }else{
			playedGames = "<span><a href='http://zlcq.97time.com/' target='_blank'> > &nbsp;97time斩龙传奇</a> <a href='http://pay.97time.com/?game_id=19' target='_blank' style='color:#d60000;float:right;font-weight:bold;width:50px;text-align:center;'>[充值]</a></span>";
			playedGames += "<span><a href='http://mycs.97time.com/' target='_blank'> > &nbsp;97time魅影传说</a> <a href='http://pay.97time.com/?game_id=20' target='_blank' style='color:#d60000;float:right;font-weight:bold;width:50px;text-align:center;'>[充值]</a></span>";
			playedGames += "<span><a href='http://wy.97time.com/' target='_blank'> > &nbsp;97time武易</a> <a href='http://pay.97time.com/?game_id=8' target='_blank' style='color:#d60000;float:right;font-weight:bold;width:50px;text-align:center;'>[充值]</a></span>";
		}
        $('#_97time_login_game_info').html(playedGames);
        $.getJSON(_global_php_url.getuser,'callback=?',function(data){
                if(data.code==1){
                  if(typeof($('#_97time_user_platform_currency').val())!='undefined'){
                        if(data.login==null){$('#_97time_logined').hide();$('#_97time_login').show();$('#_97time_user_name_top').text('');$('#_97time_user_name_flage').hide();}
                            if(data.integration_today==1){
                                    $('#_97time_user_sign').attr('class','this');
                                    $('#_97time_user_sign').html('已签到');
                            }else{
                                    $('#_97time_user_sign').removeAttr('class');
                                    $('#_97time_user_sign').html('签到');
                            }
                            $('#_97time_user_sign').click(function(){usersign()});
                        $('#_97time_user_platform_currency').html(data.currency);
                        if(data.currency>0){
                            $('#_97time_user_platform_currency').attr('href','http://pay.97time.com?bank=10');
                            $('#_97time_user_platform_currency2').attr('href','http://pay.97time.com?bank=10');
                        }else {
                            $('#_97time_user_platform_currency').attr('href','http://pay.97time.com?pay_for=platform');
                            $('#_97time_user_platform_currency2').attr('href','http://pay.97time.com?pay_for=platform');
                        }
                        $('#_97time_vip_lev').addClass('vip' + data.vip_lev);
                        $('#_97time_user_exp').text(data.experience + '/' + data.next_lev_exp);
                        $('#_97time_rate_line').attr('style', 'width: ' + data.pic + '%;');
                        $('#_97time_user_platform_integration').html(data.integration);
                        if(! data.mobile){
                                var showmobile = getCookie('todayshowmobile');
                                if(showmobile !=1){
                                    phone = '<div id="pos_msg" style="display:block;z-index:1000;"><div id="pos_msg_top"><a id="pos_msg_close" onclick="$(\'#pos_msg\').hide();">×关闭</a>温馨提示</div><div id="pos_msg_con">您的账号安全系数较低<br>请<a target="_blank" onclick="$(\'#pos_msg\').hide();" href="http://www.97time.com/users/users_safety.php?do=mobile" style="color:#F00">免费绑定手机</a></div></div>';
                                    $('#_login_phone_flage').append(phone);
                                    setCookie('todayshowmobile',1,86400);
                                }
                        }
                    }
                if(data.message_num>0){
                    $('#_97time_user_msg').addClass('on');
                }
            }else{$('#_97time_logined').hide();$('#_97time_login').show();}
        });           	
	}else{var login_remember = unescape(getCookie('login_remember'));if(login_remember){$('#login_user').val(last_name);}$('#_97time_logined').hide();$('#_97time_login').show();$('#topul >.li1').hide();$('#topul >.li2').hide();}
}
function usersign(){
    var back_url=location.href.replace('#','');
    var login_name=unescape(getCookie('login_name'));
    if(login_name){
        if($('#signbox').length<=0){        
            var signboxstr = '<iframe id="signbox" name="signbox" style="z-index:999999999;left:60%;top:50%;width:450px; height:470px;overflow:hidden;margin-top:-275px;margin-left:-400px;position:fixed;_position:absolute;_top:expression(offsetParent.scrollTop + 380);_top:expression(eval(document.documentElement.scrollTop + document.documentElement.clientHeight*0.6)); " src="http://www.97time.com/api/signFrame.php" width="450" scrolling="no" height="470" frameborder="0"></iframe>';signboxstr +='<div id="tosignboxlayer" class="layer"></div>';$('body').append(signboxstr);$('#_97time_user_sign').attr('class','this');$('#_97time_user_sign').html('已签到');
        }
        $('#_97time_user_sign').click(function(){$('#tosignboxlayer').show();$('#signbox').show();});
    }else{
        location.href = back_url;
    }
}
function get_kfzx_server(game_id){if(!game_id){return;}$.getJSON(_global_php_url.kfgs,'act=get_server&game_id='+game_id+'&callback=?',function(data){if(data!='paramerror'){var shtml = '';$.each(data ,function(key,value){shtml += '<option value="'+value.svrID+'">['+value.svrID+'服]'+value.svrName+'</option>';});$('#server_id').html(shtml);}});}
function copy_code(){ZeroClipboard.setMoviePath('http://image.97time.com/images/ZeroClipboard.swf');var clip = new ZeroClipboard.Client();clip.setText('');clip.setHandCursor(true);clip.setCSSEffects(true);clip.addEventListener('load', function(client){});clip.addEventListener('complete', function(client, text){clip.hide();});clip.addEventListener('mouseOver', function(client){});clip.addEventListener('mouseOut', function(client){});clip.addEventListener('mouseDown', function(client){clip.setText(document.getElementById('card_id').innerHTML);});clip.addEventListener('mouseUp', function(client){alert("复制成功,赶快进入游戏去激活吧^-^");});clip.glue('d_clip_button');}
function top_flash_logo(){}