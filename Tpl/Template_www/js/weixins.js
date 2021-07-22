

function weixinpay(obj) { //二维码显示
	    var url = $("#url").val();  
        var tradeno = $("#tradeno").val();
		var return_code = $("#return_code").val();
		var return_msg = $("#return_msg").val();

		if(return_code=='SUCCESS'){
			$("#code").qrcode({
				width: 200, //宽度
				height:200, //高度
				text: url //生成二维码
			});
			window.setTimeout("orderstatus('"+tradeno+"')", 5000);  //5秒调用订单状态
		}else{	
			alert(return_msg);
			return;
		}		
	 
}


function orderstatus(tradeno) { //订单状态
$.ajax({
        type: "POST",
        url:"/pay3/checkweixinpay",
        data:{tradeno:tradeno},  
        dataType: 'text',
        success:function(data){
		  if(data=='1'){ 
		    alert("支付成功");	
		  // window.open("http://bbs.lcardy.net") 
          }else{
			window.setTimeout("orderstatus('"+tradeno+"')", 5000);   
		  }
		  
		}
     });	
}

//
