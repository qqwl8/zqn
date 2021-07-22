var 
    OBJ_quick_enter = $(".quickEnter").find("a.play"),//快速选服
    OBJ_diji        = $(".quickEnter").find("input#snum"),
    server_str      = '<li><a href="#slink#">#sname#</a><span>#status#</span></li>';
$(function(){
    //server quick enter    
    OBJ_quick_enter.on('click',function(){  
       var diji = OBJ_diji.val();
        $.getJSON("http://www.97time.com/hall/server_quick?gid="+gid+"&diji="+diji+"&callback=?",
        function(data){ 
            if(data == null){
                $.dialog.alert('该服务器不存在或已关闭!');
                return;
            }
            window.open("http://www.97time.com/game/login/game/"+data['gid']+"/server/"+data['sid']);
        }); 
    }); 
 
})