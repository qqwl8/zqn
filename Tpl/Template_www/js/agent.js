var agentIDArray = Array(
    "1129^baidu.com^1284","1130^google.com.hk^1285","1131^hao123.com^1286","1132^vs^1287","1133^114la.com^1288","1134^dh818.com^1289","1135^2345.com^1290","1136^go2000.cn^1291","1137^365j.com^1292","1138^qq5.com^1293","1139^1616.net^1294","1140^uusee.net^1295","1141^9991.com^1296","1142^v2233.com^1297","1143^kzdh.com^1298","1144^46.com^1299","1145^345ba.com^1300","1146^zhaodao123.com^1301","1147^duote.com^1302","1148^91danji.com^1303","1149^quxiu.com^1304","1150^duotegame.com^1305","1151^360.cn^1306","1152^haouc.com^1307","1153^17173.com^1308","1154^86wan.com^1309","1155^966.com^1310","1156^yzz.cn^1311","1157^07073.com^1312","1158^cwebgame.com^1313","1159^2366.com^1314","1160^766.com^1315","1161^e3ol.com^1316","1162^reyoo.net^1317","1163^ccjoy.com^1318","1164^265g.com^1319","1165^duowan.com^1320","1166^pcgames.com.cn^1321","1167^maituan.com^1322","1168^6dan.com^1323","1169^9u8u.com^1324","1170^92pk.com^1325","1171^kkpk.com^1326","1172^wangye2.com^1327","1173^popwan.com^1328","1174^5068.com^1329","1175^521g.com^1330","1176^juxia.com^1331","1177^52kl.net^1332","1178^131.com^1333","1179^game.163.com^1334","1180^e004.com^1335","1181^173eg.com^1336","1182^uuu9.com^1337","1183^games.sina.com.cn^1338","1184^fm4399.com^1339"
);
function getAgentID(){
    lastUrl = document.referrer;
    var agent_id =0 ;  //渠道id
    var placeid =0 ;  //广告位id
    agent_id = getQueryString("agent_id");
    placeid = getQueryString("site_id");
    var cplaceid = getQueryString("cplaceid");
    if (!agent_id){
        /*var agenttmp = "";
         for(var i = 0 ;i<agentIDArray.length;i++){
         agenttmp = agentIDArray[i].split("^");
         if (lastUrl.indexOf(agenttmp[1])!= -1){
         agent_id = agenttmp[0];
         placeid = agenttmp[2];
         }
         }*/
    }
    if (agent_id>0){
        setCookie("pt_agent_id",agent_id,3600);
        setCookie("pt_placeid",placeid,3600);
        setCookie("pt_cplaceid",cplaceid,3600);
    }
    return agent_id;
}
getAgentID();