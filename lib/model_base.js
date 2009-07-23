//TODO : prodji kroz sve properije i ako je tipa string provjeri je li mozada unutra datum
relax.ModelBase = function(parent, class){
	                                      
	this.class = class;
  this.__parent = parent;
  this.__listeners = this.__listeners || [];    

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
    if (this.__parent != null)
      this.__parent.childChanged();
  }     

	this.decodeJsonDates = function(){
		for(prop in this){      
			if (relax.getType(prop) == "string")
				if (prop.isJSONDate())
					prop =  Date.fromJSON(prop); 
	  } 				
	} 
	
	this.save = function(){
	  if (!this.__parent)
			relax.db.save(this);
	}                       
		
	this.decodeJsonDates(this);                  

}                                 