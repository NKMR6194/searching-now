var twitter = new Twitter();

function update(data){
    for( var i = 0; i < data.length; i++ ) {
        $("#test").append("<p>"+data[i].user.name + ' : ' + data[i].text+"</p>");
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var make = document.getElementById('make');
    make.addEventListener('click', function() {
      console.log(localStorage['oauth_token']);
      twitter.request_token();
    });
    var link = document.getElementById('send');
    link.addEventListener('click', function() {
      console.log(localStorage['oauth_token']);
      twitter.send_pin();
    });
    var post = document.getElementById('tweet');
    post.addEventListener('click', function() {
      console.log('post');
      twitter.status_update($('#tweet-text').val());
    });
});

chrome.tabs.getSelected(function (tab){
  var keyword = getParameterByName('q', tab.url);
  $('#tweet-text').val('「 ' + keyword + ' 」と調べています #searching_now');
});
