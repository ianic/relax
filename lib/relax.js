var relax = {     
	uiBinder: {}, 
	
  version: '0.0.1',

  require: function(libraryName) {
    // inserting via DOM fails in Safari 2.0, so brute force approach
    document.write('<script type="text/javascript" src="'+libraryName+'"><\/script>');
  },
 
  //TODO ovu load funkciju povuci u negdje da se moze reusat u app
  load: function() {
    
    $A(document.getElementsByTagName("script")).findAll( function(s) {
      return (s.src && s.src.match(/relax\.js(\?.*)?$/))
    }).each( function(s) {
      var path = s.src.replace(/relax\.js(\?.*)?$/,'');
      var includes = s.src.match(/\?.*load=([a-z,]*)/);
      (includes ? includes[1] : 'binder,controller_base,model_base,page_controller,gears_db,uuid').split(',').each(
       function(include) { Scriptaculous.require(path+include+'.js') });
    });
  }
}
    



relax.load();
  
document.observe('dom:loaded', function() { 
 relax.ControllerBase.call(relax.pageController);  
});


Number.prototype.toCurrency = function(decimalPlaces){  
  var nStr = (decimalPlaces != null) ? this.toFixed(decimalPlaces) : this.toString();
	var x = nStr.split('.');
	var x1 = x[0];
	var x2 = x.length > 1 ? ',' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + '.' + '$2');
	}
	return x1 + x2;
}

String.prototype.toNumber = function(){
	var str = this.replace(",", ".");
	var parts = str.split(".");
	if (parts.length > 1){               
		var res = '';
		for(var i=0; i<parts.length-1; i++)
			res = res + parts[i]
		return res + '.' + parts[parts.length - 1];
	}		
	else
		return parts[0];	
} 

Date.prototype.toString = function(){
	return this.getDate() + '.' + (this.getMonth() + 1) + '.' + this.getFullYear();
}      

//ianic slijedece dvije funkcije sam ja dodao
Date.fromJSON = function(json) {
	parts = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})Z$/.exec(json);					
	return new Date(Date.UTC(parts[1],parts[2]-1,parts[3],parts[4],parts[5],parts[6]));
}                                                                                 

String.prototype.isJSONDate = function(){
	return /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})Z$/.match(this);
}
  

relax.getType = function(x) {
    // If x is null, return "null"
    if (x == null) return "null";

    // Next try the typeof operator
    var t = typeof x;
    // If the result is not vague, return it
    if (t != "object")  return t;

    // Otherwise, x is an object. Use the default toString( ) method to
    // get the class value of the object.
    var c = Object.prototype.toString.apply(x);  // Returns "[object class]"
    c = c.substring(8, c.length-1);              // Strip off "[object" and "]"

    // If the class is not a vague one, return it.
    if (c != "Object") return c;

    // If we get here, c is "Object".  Check to see if
    // the value x is really just a generic object.
    if (x.constructor == Object) return c;  // Okay the type really is "Object"
    // For user-defined classes, look for a string-valued property named
    // classname, that is inherited from the object's prototype
    if ("classname" in x.constructor.prototype &&  // inherits classname
        typeof x.constructor.prototype.classname == "string") // its a string
        return x.constructor.prototype.classname;

    // If we really can't figure it out, say so.
    return "<unknown type>";
} 

relax.getValueType = function(x){
	var type = relax.getType(x);
	if (type == "function")
		return relax.getType(x());
	else
		return type;
}
