function Twitter() {}
Twitter.prototype = {
        consumerKey:    "Ezaq06wnvTNqB52Shdp29oBVG",
        consumerSecret: "xPbfqcPvYQN2rcLvpSLLXwVPKO8XnjrcGBCtB28pOHZhfkqr0Y"
};

Twitter.prototype.request_token = function(){
  var accessor = {
      consumerSecret: this.consumerSecret,
      tokenSecret: this.tokenSecret
  };

  var message = {
      method: 'GET',
      action: 'https://api.twitter.com/oauth/request_token',
      parameters: {
          oauth_version: "1.0",
          oauth_signature_method: "HMAC-SHA1",
          oauth_consumer_key: this.consumerKey,
      }
  };

  OAuth.setTimestampAndNonce(message);
  OAuth.SignatureMethod.sign(message, accessor);

  var target = OAuth.addToURL(message.action, message.parameters);

  var options = {
      type: message.method,
      url: target
  };
  $.ajax(options)
  .done(function(data){
    console.log(data);
  });
}

var twitter = new Twitter();

function update(data){
    for( var i = 0; i < data.length; i++ ) {
        $("#test").append("<p>"+data[i].user.name + ' : ' + data[i].text+"</p>");
    }
}

$(function(){
    twitter.request_token();
});
