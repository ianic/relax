relax.controller = {}; 

relax.controller.Base = function(templateSelector, containerSelector, model){
	
	this.model = model;
	var template = new relax.controller.Template(templateSelector, containerSelector);

  //TODO formatters za string, date, currency, int	
	this.onElementChanged = function(event, p){
		//relax.logger.debug('element changed: ' + p.name);
		// relax.logger.debug(e);
		this.model.setProperty(p.name, p.formatter.get());
	}                                                    
	                                                
	//TODO 
	this.updateView = function(){
		relax.logger.debug('onModelChanged');
		template.properties.each(function(p){
			p.formatter.set(this.model.getProperty(p.name));
			
			// var val = this.model.getProperty(p.name);
			//       if (p.element.tagName == 'INPUT'){
			// 	p.element.value = val;            
			// }else{
			// 	p.element.innerHTML = val;
			// }
		}.bind(this));
	}   
	
	template.properties.each(function(p){
		//prototype dependency
		p.element.observe('change', this.onElementChanged.bindAsEventListener(this, p));
		p.formatter = new relax.controller.StringFormatter(p.element);
	}.bind(this));                       

	
	this.model.subscribe(this.updateView.bind(this));
	this.updateView();
	
	this.dipsose = function(){
		this.model.unsubscribe(this);
	}
	
}