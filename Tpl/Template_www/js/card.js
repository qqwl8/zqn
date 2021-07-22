  var page   = 1;
  var length = 5;
  var k = $('#search_game_ipt').val();
  $(function(){
    $.ajax({
      type:'post',
      data:'',
      url:"/Hall/history/",
      cache: false,
      dataType:'json',
      success:function(data){
        if(data.state==1 && data.username != ""){     
          $('.login').css('display','none');
          $('.logined').css('display','block');  
        }
      }
    });
    show_cards();
    $('#search_game_ipt').focus(function(){  
        $('#search_game_ipt').keyup(function(){
            var n = $('#search_game_ipt').val();
            if(n != k){
                searchgame();
                k = n;
            }            
        });
    });
    $('#search_tip1').on('click', 'li', function(){
      $('#search_game_ipt').val($(this).find('.gname').html());
      $('#search_tip1').hide();
      var gid = $(this).attr('tar').replace('game_','');
      $('#search_gid').val(gid);
      $.ajax({
        url: '/ajax/game_servers',
        type: 'POST',
        dataType: 'json',
        data: {
          gid: gid,
          is_open: 1
        },
        async:false,
        success:function(data){
          var li_list = '';
          $.each(data, function(index, val) {
            li_list += '<li tar="server_'+val.sid+'"><div class="stip1_con"><span class="sel_result"><strong class="green1">'+(index+1)+'. <font class="sname">'+val.servername+'</font></strong></span></div></li>';            
          });
          $('#search_tip2 ul').html(li_list);
        }
      }); 
    });
    $('#search_tip2').on('click', 'li', function(){
      $('#search_server_ipt').val($(this).find('.sname').html());
      $('#search_tip2').hide();
      var sid = $(this).attr('tar').replace('server_','');
      $('#search_sid').val(sid);
    });
  })
  //搜索相关
$('input#search_game_ipt').focus(function(){
  $('#search_tip1').show();
});
$('input#search_server_ipt').focus(function(){
  $('#search_tip2').show();
});
$('body').click(function(e){
  var curele = e.srcElement||e.target;
  var handle0 = $('.search_box').find(curele).length;
  var handle1 = $('.search_tip').find(curele).length;

  if( !handle0 && !handle1){
    $('#search_tip1').hide();
    $('#search_tip2').hide();
  }
});

$('.search_btn').on('click', function(){
  page = 1;
  clear_cards();
  show_search_cards();
});
  function show_cards(){
    $.ajax({
      url: '/ajax/cards',
      type: 'POST',
      dataType: 'json',
      data: {
        limit: length,
        page: page,
        with_game_info: 1,
        with_server_info: 1
      },
      error:function(){
        alert("error");
      },
      success:function(data){
        if(data==null){
          $('.listpage').html('<a href="javascript:alert(\'没有了\');">没有了...</a>');
          return false;
        }
        $('.listpage').html('<a href="javascript:show_cards();">更多...</a>');
        out_put_cards(data);
        page++;
      }
    });
  }
  function show_search_cards(){
    var gid = $('#search_gid').val();
    var sid = $('#search_sid').val();
    if(gid=='' || sid == ''){
      $.dialog.alert("选择游戏或区服错误");
    }
    $.ajax({
      url: '/ajax/server_cards',
      type: 'POST',
      dataType: 'json',
      data: {
        gid: gid,
        sid: sid,
        limit: length,
        page: page,
        with_game_info: 1,
        with_server_info: 1
      },
      error:function(){
        alert("error");
      },
      success:function(data){
        if(data==null){
          $('.listpage').html('<a href="javascript:alert(\'没有了\');">没有了...</a>');
          return false;
        }
        $('.listpage').html('<a href="javascript:show_search_cards();">更多...</a>');
        out_put_cards(data);
        page++;
      }
    });
  }
  function select_servers(gid,is_open,style){
    $.ajax({
      url: '/ajax/game_servers',
      type: 'POST',
      dataType: 'html',
      data: {
        gid: gid,
        is_open: is_open,
        style: style
      },
      async:false,
      success:function(html){
        return html;
      }
    }); 
  }
  function clear_cards(){
    $('.table_tbody').html('');
  }
  function out_put_cards(data){
        var content = '';
        $.each(data,function(index, el) {
          var game_td = '<td><a href="http://'+el.game_info.game_web+'" title="'+el.game_info.gamename+'官网" target="_blank">'+el.game_info.gamename+'</a></td>';
          var server_td = '';
          if(el.sid==0){
            server_td = '<td>全服通用</td>';
          } 
          else server_td = '<td><a href="/game/login/game/'+el.gid+'/server/'+el.sid+'" title="点击进游戏" target="_blank">'+el.server_info.servername+'</a></td>';
          var card_td = '<td><a href="javascript:void(0);" onclick="show_card_info(\''+el.id+'\');">'+el.name+'</a></td>';
          if(el.total==0)
            var left_td = '<td><div class="progress"><div class="bar" style="width:0px"></div></div></td>';
          else
            var left_td = '<td><div class="progress"><div class="bar" style="width:'+Math.round(el.total*100/(el.total+el.got))+'%;"></div></div></td>';
          var btn_td = '';
          if(el.start_time>(new Date()).valueOf()) btn_td = '<td><a class="wait_card" title="敬请期待" onclick="show_opentime(\'##date##\');">敬请期待</a></td>';
          else btn_td = '<td><a class="get_card" title="点击领取" href="javascript:void(0);" onclick="get_card(this,\''+el.card_type+'\',\''+el.gid+'\',\''+el.sid+'\',\''+el.id+'\');">点击领取</a></td>';
          content += '<tr>'+game_td+server_td+card_td+left_td+btn_td+'</tr>';
        });
        $('.table_tbody').append(content);
  }

function searchgame(){
    var kwords = $('#search_game_ipt').val();
    $.ajax({
        'type':'GET',
        'url':'/card/search/kwords/'+kwords,
        'dataType':'json',
        'success':function(d){
            if(d.k){
                $('#search_tip1').show();
                var listli = '#search_tip1 .stip_con ul.stip1 li';
                $(listli).hide();
                for(var i = 0; i < d.data.length; i++){
                    $(listli).eq(i).show();
                    $(listli).eq(i).find('.gname').html(d.data[i].gamename);
                    $(listli).eq(i).find('.stip1_con .gname').html(d.data[i].gamename);
                    $(listli).eq(i).find('.stip1_con').children('a').attr('href','');
                }
            }else{
              $('#search_tip1').hide();
            }
        }
    })
}

function get_card(element,card_type,gid,sid,id,type){
  $.ajax({
    url: '/card/card_check',
    data:{
      'card_type':card_type,
      'gid':gid,
      'sid':sid,
      'id':id,
      'type':type
    },
    type: 'GET',
    dataType: 'json',
  })
  .done(function(data) {
      $.dialog.alert(data.msg);
  })
  .fail(function() {
    $.dialog.tips('系统发生错误,请稍候重试!');
  });
}
function show_opentime(date){
  $.dialog.tips('开始领取时间：'+date);
}
function show_card_info(card_id){

}
