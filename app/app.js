var app = {     
	model : {}, 
	controller : {},
	
  version: '0.0.1',

  require: function(libraryName) {
    // inserting via DOM fails in Safari 2.0, so brute force approach
    document.write('<script type="text/javascript" src="'+libraryName+'"><\/script>');
  },

  load: function() {
    
    $A(document.getElementsByTagName("script")).findAll( function(s) {
      return (s.src && s.src.match(/app\.js(\?.*)?$/))
    }).each( function(s) {
      var path = s.src.replace(/app\.js(\?.*)?$/,'');
      var includes = s.src.match(/\?.*load=([a-z,]*)/);
      (includes ? includes[1] : 'model/racun,model/stavka,model/partner,controller/racun,controller/racun_list').split(',').each(
       function(include) { Scriptaculous.require(path+include+'.js') });
    });
  }
}

app.load();