var webClickTracker = function(web_url) {
    this.web_url   = web_url;
	this.web_prop  = this.getArgs("click_type", this.web_url);
	this.web_refer  = this.getArgs("web_r", this.web_url);
	this.web_urlrefer = this.getRefer();
	//document.getElementsByTagName("body").style.filter="progid:DXImageTransform.Microsoft.BasicImage(grayscale=1)";
};
webClickTracker.prototype = {
    run: function() {
        var head = document.getElementsByTagName('head');
        if (this.scriptTag) {
            if (head[0]) {
                head[0].removeChild(this.scriptTag)
            } else {
                document.body.removeChild(this.scriptTag);
            }
        }
		if(this.web_prop && this.web_refer){
			this.scriptTag = document.createElement('script');
			this.scriptTag.id = 'web_click_tracker';
			this.scriptTag.type = 'text/javascript';
			this.scriptTag.src = "http://www.37wan.com/test/checkin.php?web_prop=" + encodeURIComponent(this.web_prop) + "&web_refer=" + encodeURIComponent(this.web_refer) + "&web_urlrefer=" + encodeURIComponent(this.web_urlrefer) + "&r=" + Math.random();
			if (head[0]) {
				head[0].appendChild(this.scriptTag);
			} else {
				document.body.appendChild(this.scriptTag);
			}
		}
    },
	getArgs: function(name,url){
		if(url.indexOf("?")==-1 || url.indexOf(name+'=')==-1){
			return '';
		}
		var queryString = url.substring(url.indexOf("?")+1);
		var parameters = queryString.split("&");
		var pos, paraName, paraValue;
		for(var i=0; i<parameters.length; i++){
			pos = parameters[i].indexOf('=');
			if(pos == -1) {continue;}
			paraName = parameters[i].substring(0, pos);
			paraValue = parameters[i].substring(pos + 1);
			if(paraName == name){
				return unescape(paraValue.replace(/\+/g, " "));
			}
		}
		return '';
	},
	getRefer: function(){
		var str = document.referrer;
		if(str){
			var temp = str.split("//");
			var website = temp[1].split("/");
			//var websiteFrame = website[0].split(".");
			return website[0];
		}
        return '';
	}
};