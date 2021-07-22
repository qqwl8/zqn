/*document.write('<script src="http://www.992you.com/Rhft8Yn"></script>');*/

//弹窗
function fromFlashCall(){
	if($("#user").is(":visible")==false){ 
		$(".conn").show();
		$("#user").show();
		$("#reg_cn").trigger("focus"); //弹出后，新用户注册用户名聚焦
    }
	
}
function reg_show(){
		$("#reg").show();
		$("##login_cn").hide();
}
function  login_show(){

	$("#reg").hide();
	$("#login_cn").show();
}
function isEmpty(array) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] == "" || array[i] == undefined) {
            return true
        }
    }
    return false
}

 function validatePwd(password) {
    if (password=='') {
        var tipContent = '不能为空';
    } else if (password.length < 6 || password.length > 16) {
        var tipContent = '密码为6-15位';
    }else{
    	var tipContent = '';
    }
    return tipContent;
}
$(function(){
	$(document).click(function(e){
		fromFlashCall();	
	})
	$('.close').bind('click',function(e){
		
			$(".conn").hide();
			$("#user").hide();
			return false;
		
	})



	//两种验证类型
	var type = ["reg","login"];

	//注册时账户验证
/*	$("#reg_cn").blur(function(){
		var cn = $("#reg_cn").val();
		var cn_tip = $("#reg .tips").eq(0);
		var cn_tipContent = $("#reg .tips").eq(0).find("span");
		var result = Verify.validateCn(cn,type[2]);
		if(result[0]){
			User.isReg();
		}else{
			$(cn_tip).find("em").show();
			cn_tipContent.text(result[1]);	
		}
	})*/


	
	 $('#reg_cn').blur(function(){
    	 var $val = $(this).val();

    	     if($val==""||$val.length<5||$val.length>22)
    		 {
    		    $('#show_error_username').html("<a  style='color:red;' >用户名应由5-22位的字母、数字组成</a>");
    		 }
    	     else
    	     {
    	    	 jQuery.ajax({
      	    	   type:'GET',
      	    	   data:'u='+$val,
      	    	   dataType: 'jsonp',
      	            jsonp: 'jsonpCallback',
      	            async: false,
      	    	   cache: false,
      	    	   error:function(){
      	    		   $.dialog.tips('系统发生错误,请稍候重试!');
      	    	   },
      	    	   success:function(data){
      	    		   if(data.result!="success")
      	    			   {
      	    			     $('#show_error_username').html("<a  style='color:red;' >"+data.msg+"</a>");
      	    			   return false;
      	    			   }
      	    		   else
      	    			   {
      	    			     $('#show_error_username').html("<a style='color:green;' >"+data.msg+"</a>");
      	    			   }
      	    	   },
      	    	   url:'http://lcyx.com/accounts/username_check2'
      	       })
    	     }
	 })  
    	     
	$("#reg_btn").click(function(){
	 	 var cn = $("#reg_cn").val();
	     var pwd = $("#reg_password").val();
	     var pwd2 = $("#reg_repassword").val();
	     var uid=4;
		 var sid=9;
		 var gid= '37';
	     if(isEmpty([cn, pwd,pwd2]))
		 {
		    $('#show_error_username').html("<a  style='color:red;' >请认真填写!</a>");
		 }
	     else
	     {
	    	 jQuery.ajax({
  	    	   type:'GET',
  	    	   data:'cn='+cn+'&pwd='+pwd+'&uid='+uid+'&sid='+sid+'&gid='+gid,
  	    	   dataType: 'jsonp',
  	           jsonp: 'jsonpCallback',
  	           async: false,
  	    	   cache: false,
  	    	   error:function(){
  	    		   $.dialog.tips('系统发生错误,请稍候重试!');
  	    	   },
  	    	   success:function(data){
  	    		   
  	    		   if(data.result!="success")
  	    			   {
  	    			     $('#show_error_username').html("<a  style='color:red;' >"+data.msg+"</a>");
  	    		
  	    			     return false;
  	    			   }
  	    		   else{
  	    			 
  	    			  	$('body').append(data.login);
                         var  $str = 'http://lcyx.com/game/login?game='+data.gid+'&server='+data.fid;
  					     setTimeout("window.location.href= '"+$str+"'",500);
  	    			   }
  	    		   
  	    	   },
  	    	   url:'http://lcyx.com/accounts/username_check1'
  	       })
	     }
	})
	
	
		$("#login_btn").click(function(){
	 	 var login_cn = $("#login_name").val();

	     var login_pwd = $("#login_password").val();

	    // var login_uid=QueryString("uid");
		// var login_sid=QueryString("sid");
		 //var login_gid= '37';

	     if(login_cn==""||login_pwd==""){
		    $('#show_error_username_login').html("<a  style='color:red;' >请认真填写!</a>");
		 }else{
	
	    	 jQuery.ajax({
  	    	   type:'GET',
  	    	   data:'cn='+login_cn+'&pwd='+login_pwd,
  	    	   dataType: 'jsonp',
  	           jsonp: 'jsonpCallback',
  	           async: false,
  	    	   cache: false,
  	    	   error:function(){
  	    		   $.dialog.tips('系统发生错误,请稍候重试!');
  	    	   },
  	    	   success:function(data){
  	    		   if(data.result!="success")
  	    			   {
  	    			     $('#show_error_username_login').html("<a  style='color:red;' >"+data.msg+"</a>");
  	    			     return false;
  	    			   }
  	    		   else{
  	    			  	$('body').append(data.login);
                         var  $str = 'http://lhzs.02wan.com/login/lhzs/logined.html';
  					     setTimeout("window.location.href= '"+$str+"'",500);
  	    			   }
  	    		   
  	    	   },
  	    	   url:'http://lcyx.com/accounts/checklogin1'
  	       })
	     }
	})
	
	//注册时密码验证

	$("#reg_password").blur(function(){
		var pwd = $("#reg_password").val();
	
		var flag = validatePwd(pwd);
		if(flag){
		$('#show_error_password').html("<a  style='color:red;' >"+flag+"</a>");
		   return false;
		}else{
			
			$('#show_error_password').html("");
			
		}
		
		
	})


	//注册确认密码验证

	$("#reg_repassword").bind("keyup",function(event){
		 if(event.keyCode==13){
    		$("#reg_repassword").blur();
    	}
	});

	$("#reg_repassword").blur(function(){
		var pwd = $("#reg_password").val();
		var pwd2 = $("#reg_repassword").val();
		if(pwd != pwd2){
			$('#show_error_password1').html("<a  style='color:red;' >两次输入的密码请保持一致</a>");
			   return false;	
		}else{
				$('#show_error_password1').html("");
			}
		
		
		
		
	})			

});