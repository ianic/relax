relax.controller.Template = function(templateSelector){
  this.properties = []; 
  this.actions = [];
  
  //jQuery dependency
  this.rootElement = jQuery(jQuery(templateSelector).html()); 
  
  //jQuery dependency
  this.rootElement.find("[property]").each(function(index, e){   
    this.properties.push({element: e, name: e.getAttribute('property')});
  }.bind(this));
  
	//jQuery dependency
  this.rootElement.find("[action]").each(function(index, e){
		this.actions.push({element: e, name: e.getAttribute('action')});
  }.bind(this));

  this.findProperty = function(name){                          
		return this.properties.find(function(p){ return p.name == name; });
	}

  this.findAction = function(name){
		return this.actions.find(function(a){ return a.name == name; });
	}
                   
	this.append = function(containerSelector){
		//jQuery dependency
  	jQuery(containerSelector).append(this.rootElement); 
	}
}