var twitter = new Twitter();

function update(data){
    for( var i = 0; i < data.length; i++ ) {
        $("#test").append("<p>"+data[i].user.name + ' : ' + data[i].text+"</p>");
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var make = document.getElementById('make');
    make.addEventListener('click', function() {
      chrome.runtime.getBackgroundPage(function (page){ page.twitter.request_token(); });
    });
    var link = document.getElementById('send');
    link.addEventListener('click', function() {
      chrome.runtime.getBackgroundPage(function (page){ page.twitter.send_pin($('#pin').val()); });
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
        }
        else{
          page.removeListener();
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
  console.log(page.getStorage('auto'));
  if(page.getStorage('auto') == 'enable'){
    $('#auto').attr("checked", true );
  }
  else{
    $('#auto').attr("checked", false );
  }
});
