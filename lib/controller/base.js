relax.controller = {}; 

relax.controller.Base = function(templateSelector, containerSelector, model){
	
	this.model = model;
	this.template = new relax.controller.Template(templateSelector, containerSelector);
	this.template.append(containerSelector);

  //TODO formatters za string, date, currency, int	
	this.onElementChanged = function(event, p){
		relax.logger.debug('onElementChanged ' + p.name);
		this.model.setProperty(p.name, p.formatter.get());
	}                                                    
	                                                
	this.updateView = function(){
		relax.logger.debug('onModelChanged');
		this.template.properties.each(function(p){
			p.formatter.set(this.model.getProperty(p.name));
		}.bind(this));
	}   
	
	this.template.properties.each(function(p){
		//prototype dependency
		p.element.observe('change', this.onElementChanged.bindAsEventListener(this, p));
		p.formatter = new relax.controller.StringFormatter(p.element);
	}.bind(this));                       

	
	this.model.subscribe(this.updateView.bind(this));
	this.updateView();
	
	this.dipsose = function(){
		this.model.unsubscribe(this);
	}    
	
	this.updateElement = function(propName, value){                         
		var p = this.template.findProperty(propName);
		p.element.value = value;
		this.onElementChanged(null, p);
	}
	
}