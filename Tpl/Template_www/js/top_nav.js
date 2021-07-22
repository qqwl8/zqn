function showAllGame(){
	var allgame=document.getElementById("all_game");
  	allgame.style.display='block';
}
function hiddenAllGame(){
  	var allgame=document.getElementById("all_game");
  	allgame.style.display='none';
}
var nav = "";
nav += "<link href=\"http://www.97time.com/Tpl/Template_www/css/top_nav.css\" rel=\"stylesheet\" type=\"text/css\" />";
nav += "<div class=\"nav_header\"> ";
nav += "  <div class=\"nav_dh1 zz_nav\"> ";
nav += "    <div class=\"fl\"><a href=\"http://www.97time.com/\"><img src=\"http://www.97time.com/Tpl/Template_www/images/public_logo.png\" alt=\"97time网页游戏\" /></a></div>";
nav += "    <div class=\"nav_dh11 fl\"><span class=\"nav_zhs_col1\"><strong>推荐游戏：</strong></span><span id=\"gg\">";

nav += "    <script language=\"javascript\" src=\"http://www.97time.com/hall/game_all/num/5\"></script"+"> ";
//nav += "<a href=\"http://aszt.97time.com\" target=\"_blank\">傲视遮天</a>";
//nav += "<a href=\"http://wz.97time.com\" target=\"_blank\">武尊</a>";
//nav += "<a href=\"http://lc.97time.com\" target=\"_blank\">龙城</a>";
//nav += "<a href=\"http://jzwc.97time.com\" target=\"_blank\">决战王城</a>";
//nav += "<a href=\"http://rxhzw.97time.com\" target=\"_blank\">热血海贼王</a>";


nav += "    </span></div>  ";
nav += "    <div class=\"nav_dh12 fr\"> ";
nav += "       <p><a href=\"http://www.97time.com/\" target=\"_blank\">97time网页游戏</a>&nbsp;| &nbsp;</p> ";
nav += "       <p><a href=\"http://www.97time.com/accounts/register/\" target=\"_blank\">注册</a>&nbsp;| &nbsp;</p> ";
nav += "       <p><a href=\"http://www.97time.com/pay/\" target=\"_blank\">充值中心</a>&nbsp; &nbsp;</p> ";
nav += "       <p class=\"nav_zhs_col1\" style=\"padding-left:15px;\">&nbsp;&nbsp;&nbsp;</p> ";
nav += "       <a onmouseover=\"showAllGame();\" onmouseout=\"hiddenAllGame();\" style=\"text-decoration:none !important;\"><div class=\"nav_yx_2918 fl cur\" style=\"color:#000000 !important;\">97time游戏 </div></a>";
nav += "    </div> ";
nav += "  </div> ";
nav += "</div>";
nav += "<div class=\"allgame_97time\" style=\"width:980px; margin:0 auto; z-index:100000000;  position:relative; \" onmouseover=\"showAllGame();\" onmouseout=\"hiddenAllGame();\">";
nav += "  <div class=\"nav_yer_1\">";
nav += "    <div class=\"nav_navBox\" style=\"display: none;\" id=\"all_game\">";
nav += "      <div class=\"nav_nav\">";
nav += "        <h2>欢迎来到97time，现在就开始您的游戏之旅吧!</h2>";
nav += "        <div class=\"nav_lst nav_clear\" id=\"allgame\">";
nav += "          <script language=\"javascript\" src=\"http://www.97time.com/hall/game_all/num/1000\"></script"+">";
nav += "          <a target=\"_blank\" class=\"nav_lnk nav_apic\" href=\"http://www.97time.com/hall\">更多</a>";
nav += "        </div>";
nav += "      </div>";
nav += "      <div class=\"cl\"></div>";
nav += "    </div>";
nav += "  </div>";
nav += "</div>";

document.write(nav);



