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
				case 2: return [30, 215];
				case 3: return [100, 200];
				case 4: return [170, 185];
				case 5: return [240, 175];
				case 6: return [310, 150];
				case 7: return [380, 100];
				case 8: return [450, 70];
				case 9: return [520, 20];
				case 10: return [590, -10];
				case 11: return [660, -50];
				case 12: return [730, -90];
				case 13: return [800, -130];
				default: return [870, -160];
			}
		};
		
		var getLevel = function(x, y) {
			if(x >= 20 && x < 40) return 1;
			else if(x >= 90 && x < 110) return 2;
			
			else if(x >= 160 && x < 180) return 3;
			else if(x >= 230 && x < 250) return 4;
			else if(x >= 300 && x < 320) return 5;
			else if(x >= 370 && x < 390) return 6;
			else if(x >= 440 && x < 460) return 7;
			else if(x >= 510 && x < 530) return 8;	
			else if(x >= 580 && x < 600) return 9;
			else if(x >= 650 && x < 670) return 10;
			else if(x >= 720 && x < 740) return 11;
			else if(x >= 790 && x < 810) return 12;
			else if(x >= 860 && x < 880) return 13;	
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