/**
 * 
 * @param boolean login
 * @param object userinfo
 * @param object configs
 */
function initVip(login, userinfo, configs) {

	this.login = false;
	this.userinfo = [];
	this.configs = [];
	
	this.init = function () {
		this.login = login;
		this.userinfo = userinfo ? userinfo : [];
		this.configs = configs;
		

		
		this.initIntro();
	};
	



	
	this.getVpoint = function(level) {
		if(level >= 14) return 100000000;
		for(var i = 0; i < this.configs.length; i++) {
			if(parseInt(this.configs[i].vip) == parseInt(level)) {
				return parseInt(this.configs[i].vpoint);
			}
		}
		return 0;
	};
	
	this.getRebate = function(level) {
		if(level >= 14) return 100000000;
		for(var i = 0; i < this.configs.length; i++) {
			if(parseInt(this.configs[i].vip) == parseInt(level)) {
				return this.configs[i].rebate;
			}
		}
		return 0;
	};
	
	this.getLevel = function(vpoint) {
		var level = 0;
		for(var i = 0; i < this.configs.length; i++) {
			if(parseInt(this.configs[i].vpoint) <= parseInt(vpoint)) {
				level = parseInt(this.configs[i].vip);
			}
		}
		return level;
	};

	


	
	this.extract = function(response) {
		try {
			var data = eval('(' + response + ')');
			return data;
		} catch(e) {
			return {'status' : 0, 'info' : response};
		}
	};
	
	this.initIntro = function() {
		var self = this;
		var current_level = 1;
		var timer_id;
		var state = '0:0';
		
		var getPosition = function(level) {
			switch(level) {
				case 1: return [-40, 220];
				case 2: return [20, 215];
				case 3: return [80, 200];
				case 4: return [140, 185];
				case 5: return [200, 175];
				case 6: return [260, 150];
				case 7: return [320, 100];
				case 8: return [380, 70];
				case 9: return [440, 20];
				case 10: return [500, -10];
				case 11: return [560, -50];
				case 12: return [620, -90];
				case 13: return [680, -130];
				default: return [740, -160];
			}
		};
		
		var getLevel = function(x, y) {
			if(x >= 10 && x < 30) return 1;
			else if(x >= 70 && x < 90) return 2;
			
			else if(x >= 130 && x < 150) return 3;
			else if(x >= 190 && x < 210) return 4;
			else if(x >= 250 && x < 270) return 5;
			else if(x >= 310 && x < 330) return 6;
			else if(x >= 370 && x < 390) return 7;
			else if(x >= 430 && x < 450) return 8;	
			else if(x >= 490 && x < 510) return 9;
			else if(x >= 550 && x < 570) return 10;
			else if(x >= 610 && x < 630) return 11;
			else if(x >= 670 && x < 690) return 12;
			else if(x >= 730 && x < 750) return 13;	
			else return 0;
		};
		
		var showTips = function(level) {
			var position = getPosition(level);
			$('#vip_rebate_info').fadeOut(function() {
				$(this).css({'left' : position[0], 'top' : position[1]})
				.html('<p><span>充值返利：</span>'+parseInt(self.getRebate(level)*100)+'%</p><p><span>升级条件:</span>充值满'+self.getVpoint(level)+'平台币</p>').fadeIn();
			})
		}
		
		var run = function(level) {
			current_level = level > 13 ? 1 : level;
			showTips(current_level);
			clearTimeout(timer_id);
			
			timer_id = setTimeout(function() {
				run(++current_level);
			}, 2000);
		};
		
		var listener = function() {
			var _state = state.split(':');
			var _level = parseInt(_state[0]);
			var _time = parseInt(_state[1]);
			if(_level && getTime(true) - _time > 100) {
				state = _level+':'+(getTime(true)+1000000);
				clearTimeout(timer_id);
				run(_level);
			}
			setTimeout(function() { listener(); }, 80);
		};
		
		var getTime = function(get_as_float) {
			var now = new Date().getTime();
			var s = parseInt(now, 13);
			return (get_as_float) ? now : (Math.round((now - s) * 1000) / 1000) + ' ' + s;
		};
		
		$('#vip_rebate_intro').html('<div id="vip_rebate_info" class="gr_value_tips" style="display:none;">\
			<p><span>充值返利：</span></p>\
			<p><span>升级条件:</span></p>\
		</div>');
		$('#vip_rebate_intro').mousemove(function(e) {
			var x = e.pageX - $(this).offset().left;

			//var y = e.pageY - $(this).position().top;
			

			var level = getLevel(x);
			var _state = state.split(':');
			var _level = _state[0];
			var _time = _state[1];
			if(_level != level) {
				state = level + ':' + getTime(true);
			}
			
			//$('#xxx').text('y: '+parseInt(476 - e.pageY + 279+170));
		}).mouseout(function() {
			state = '0:0';
		});
		
		timer_id = setTimeout(function() { run(current_level); }, 200);
		listener();
	};
	
	this.init();
}