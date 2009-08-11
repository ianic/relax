relax.model = {}

relax.model.Base = function(parent){
	
  this.__parent = parent;
  this.__listeners = this.__listeners || [];    
                        
	this.setProperty = function(name, value){
		var setFunctionName = this.setPropertyFunctionName(name);
		if (typeof this[setFunctionName] == 'function'){
			this[setFunctionName](value);
		}else{
			this[name] = value;
		}
		this.changed();
	}                                                                 
	
	this.setPropertyFunctionName = function(name){
		return "set" + name[0].capitalize() + name.substring(1);
	}
	
	this.getProperty = function(name){
		if (typeof this[name] == 'function'){
			return this[name]();
		}else{
			return this[name];
		}
	}

  this.subscribe = function(listener){ 
    this.__listeners.push(listener);
  }
  
  this.notify = function(){
    for(var i=0; i<this.__listeners.length; i++){
      this.__listeners[i]();                     
    }
  }               
  
  this.childChanged = function(){ this.changed(); }
  
  this.changed = function(){  
    this.notify();
    if (this.__parent != null){
      this.__parent.childChanged();
		}
  }     

  this.decodeJsonDates = function(){
    for(prop in this){      
      if (relax.getType(prop) == "string"){
				if (prop.isJSONDate()){
				  prop =  Date.fromJSON(prop);     
				}
			}
    } 				
  } 
	
  this.save = function(){
    if (!this.__parent){
      relax.db.save(this);
		}
  }                       
		
  this.decodeJsonDates(this);                  

}