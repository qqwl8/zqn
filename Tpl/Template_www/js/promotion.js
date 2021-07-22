/*function copy_clip(text){
	if(window.clipboardData) {
		//alert(text);
		var clip=document.getElementById(text);
		//alert(clip);
		clip.select(); // 选择对象 
		document.execCommand("Copy"); // 执行浏览器复制命令 
		alert("复制成功！");
	}else{
		alert("浏览器不支持，请选中文本然后按CTRL+C复制");
	}	 
}*/
//腾讯微博
function postToqqWb(){
  var _t = encodeURIComponent($('#_extend_qqweibo').val());
  var _appkey = encodeURI("appkey");//你从腾讯获得的appkey
  //var _pic = encodeURI('http://y0.ifengimg.com/5d61f60410d82918/2013/0724/weibo-gujian.jpg');
  var _pic ='';
  var _site = $('#_extend_adurl').val();//你的网站地址
  var _u = 'http://v.t.qq.com/share/share.php?title='+_t+'&appkey='+_appkey+'&pic='+_pic+'&site='+_site;
  window.open(_u,"_blank");
}
function xinlangweibo(){
    var _t = encodeURIComponent($('#_extend_qqweibo').val());
    var _appkey = '1392530042';//你的appkey
    //var _pic = encodeURI('http://y0.ifengimg.com/5d61f60410d82918/2013/0724/weibo-gujian.jpg');
    var _pic ='';
    var _site = $('#_extend_adurl').val();//你的网站地址
    var _u = 'http://v.t.sina.com.cn/share/share.php?title='+_t+'&appkey='+_appkey+'&pic='+_pic+'&site='+_site;
    window.open(_u,"_blank");
}

function copy_clip(txt) {  
    if(window.clipboardData) {   
        window.clipboardData.clearData();   
        window.clipboardData.setData("Text", txt);
        alert("复制成功");
    } else{
        alert("浏览器不支持，请选中文本然后按CTRL+C复制");  
    }   
}