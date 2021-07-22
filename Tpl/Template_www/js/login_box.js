function lbgc (key) {
    var cookie_start = document.cookie.indexOf(key);
    var cookie_end = document.cookie.indexOf(";", cookie_start);
    return cookie_start == -1 ? '' : decodeURI(document.cookie.substring(cookie_start + key.length + 1, (cookie_end > cookie_start ? cookie_end : document.cookie.length)))
}
function lbgp (key) {
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return (r[2]);
    return null;
}
var paramurl = '?';
if (gameid != '') {
    paramurl += 'gameid=' + gameid + '&';
}
if (agent_id != '') {
    paramurl += 'agent_id=' + agent_id + '&';
}
if (placeid != '') {
    paramurl += 'placeid=' + placeid;
}
var lbagentid = lbgp('agent_id');
var lbplaceid = lbgp('placeid');
if (lbagentid) {
	if (lbplaceid) {
		paramurl = '?agent_id=' + lbagentid + '&placeid=' + lbplaceid + '&gameid=' + gameid;
		var anum = document.getElementsByTagName('a').length;
		var hurl = '';
		for(i=0;i<anum;i++){
			hurl = document.getElementsByTagName('a')[i].href
			if(hurl.indexOf('?')>0){
				document.getElementsByTagName('a')[i].href = hurl + '&agent_id=' + lbagentid + '&placeid=' + lbplaceid;
			}else{
				document.getElementsByTagName('a')[i].href = hurl + '?agent_id=' + lbagentid + '&placeid=' + lbplaceid;
			}
		}
	}
}