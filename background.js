var twitter = new Twitter();

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
  var keyword = getParameterByName('q', tab.url);
  if(keyword != ''){
    twitter.status_update('「 ' + keyword + ' 」と調べています #searching_now');
  }
});
