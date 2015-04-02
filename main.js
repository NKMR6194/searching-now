function update(data){
    for( var i = 0; i < data.length; i++ ) {
        $("#test").append("<p>"+data[i].user.name + ' : ' + data[i].text+"</p>");
    }
}

var badge_on = '<i class="glyphicon glyphicon-ok-circle"></i> ON'
var badge_off = '<i class="glyphicon glyphicon-remove-circle"></i> OFF'

document.addEventListener('DOMContentLoaded', function() {
    var make = document.getElementById('make');
    make.addEventListener('click', function() {
      chrome.runtime.getBackgroundPage(function (page){ page.twitter.request_token(); });
    });
    var link = document.getElementById('send');
    link.addEventListener('click', function() {
      chrome.runtime.getBackgroundPage(function (page){
        page.twitter.send_pin($('#pin').val(), $('#screen-name'));
      });
    });
    var post = document.getElementById('tweet');
    post.addEventListener('click', function() {
      chrome.runtime.getBackgroundPage(function (page){ page.twitter.status_update($('#tweet-text').val()); });
    });
    var auto = document.getElementById('auto');
    auto.addEventListener('click', function() {
      chrome.runtime.getBackgroundPage(function (page){
        if(auto.checked){
          page.addListener();
          $('#status').removeClass('badge-danger');
          $('#status').addClass('badge-success');
          $('#status').empty();
          $('#status').append(badge_on);
        }
        else{
          page.removeListener();
          $('#status').removeClass('badge-success');
          $('#status').addClass('badge-danger');
          $('#status').empty();
          $('#status').append(badge_off);
        }
      });
    });
});

chrome.tabs.getSelected(function (tab){
  var keyword = getParameterByName('q', tab.url);
  if(keyword != ''){
    $('#tweet-text').val('「 ' + keyword + ' 」と調べています #searching_now');
  }
});

chrome.runtime.getBackgroundPage(function (page){
  if(page.getStorage('auto') == 'enable'){
    $('#auto').attr("checked", true );
    $('#status').addClass('badge-success');
    $('#status').append(badge_on);
  }
  else{
    $('#auto').attr("checked", false );
    $('#status').addClass('badge-danger');
    $('#status').append(badge_off);
  }

  var account = page.getStorage('screen_name')
  $("#screen-name").append(account ? '@' + account : 'アカウントが未認証です');
});
