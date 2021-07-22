

function shujian(obj) { //订单请求
	    var tradeno = $("#tradeno").val();  
        var tradetype = $("#tradetype").val(); 
		var orderfee = $("#orderfee").val();   
	$.ajax({
        type: "POST",
        url:"/pay1/beihe",
        data:{tradeno:tradeno,tradetype:tradetype,orderfee:orderfee,status:'request'},  
        dataType: 'text',
        success:function(data,status){
		//alert(data.split(",")[0]);
        var datalist=data.split(",");
		if(datalist[0]=='0'){
			alert(datalist[1]);	 //错误信息
			return;
		}else if(datalist[0]=='1'){
			//document.getElementById("qrcode").innerHTML='<div id="code"></div>';
			//alert(datalist[1]);
		    $("#code").qrcode({
			width: 200, //宽度
			height:200, //高度
			text: datalist[1] //生成二维码
            });
			window.setTimeout("orderstatus('"+tradeno+"')", 5000);  //5秒调用订单状态
		}else if(datalist[0]=='2'){	
		window.open(data.split(",")[1]) //支付跳转
		}
		
		
		}
     });	
	 
}


function orderstatus(tradeno) { //订单状态
$.ajax({
        type: "POST",
        url:"/pay1/beihe",
        data:{tradeno:tradeno,status:'orderstatus'},  
        dataType: 'text',
        success:function(data,status){
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
