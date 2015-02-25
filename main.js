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
    var param = {};
    var array = data.split('&');
    $.each(array, function(index, item) {
      var keyval = item.split('=');
      param[keyval[0]] = keyval[1];
    });
    console.log(param);

    oauth_token_glb = param['oauth_token'];
    $('#token').attr('value', param['oauth_token']);
    $('a#link').attr('href', 'https://twitter.com/oauth/authorize?oauth_token=' + param['oauth_token']);
  });
}

Twitter.prototype.send_pin = function(){
  var accessor = {
      consumerSecret: this.consumerSecret,
      tokenSecret: this.tokenSecret
  };

  var message = {
      method: 'GET',
      action: 'https://api.twitter.com/oauth/access_token',
      header: {
        Authorization: 'OAuth'
      },
      parameters: {
          oauth_version: "1.0",
          oauth_verifier: $('#pin').val(),
          oauth_signature_method: "HMAC-SHA1",
          oauth_consumer_key: this.consumerKey,
          oauth_token: oath_token_glb
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
    console.log('OK');
    console.log(data);
  })
  .fail(function(){
    console.log('fail');
  });
}

var twitter = new Twitter();
var oauth_token_glb;

function update(data){
    for( var i = 0; i < data.length; i++ ) {
        $("#test").append("<p>"+data[i].user.name + ' : ' + data[i].text+"</p>");
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var make = document.getElementById('make');
    link.addEventListener('click', function() {
      console.log(oauth_token_glb);
      twitter.request_token();
    });
});