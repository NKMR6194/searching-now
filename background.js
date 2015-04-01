var twitter = new Twitter();

var post = function(tabId, changeInfo, tab){
  var keyword = getParameterByName('q', tab.url);
  if(keyword != '' && localStorage['prev'] != keyword){
    localStorage['prev'] = keyword;
    twitter.status_update('「 ' + keyword + ' 」と調べています #searching_now');
  }
};

function addListener(){
  localStorage['auto'] = 'enable';
  chrome.tabs.onUpdated.addListener(post);
}

function removeListener(){
  localStorage['auto'] = 'disable';
  chrome.tabs.onUpdated.removeListener(post);
}

function getStorage(key){
  return localStorage[key];
}

if(!localStorage['auto']){
  localStorage['auto'] = 'disable';
}

if(localStorage['auto'] == 'enable'){
  addListener();
}
