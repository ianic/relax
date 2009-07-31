relax.uiBinder.create = function(element, object, property, type){     
  if (property.include(".")){   
    var parts = property.split('.');
    object = object[parts[0]]
    property = parts[1];
  }	
  if (!type){
    if (typeof object[property] == "function")
      type = relax.getType(object[property]());
    else
      type = relax.getType(object[property]);
  }
  if (type == "Date")
    return new relax.uiBinder.DateBinder(element, object, property);
  if (type == "number")                                             
    return new relax.uiBinder.CurrencyBinder(element, object, property);
  return new relax.uiBinder.StringBinder(element, object, property);
};

relax.uiBinder.BinderBase = function(htmlElement, model, modelProperty){
  this.element = $(htmlElement);                               
  this.model = model;
  this.property = modelProperty || this.element.name || this.element.id;
  
  this.onElementChanged = function(){  
    this.model[this.property] = this.elementValue();
    this.model.changed();  
		//relax.logger.debug('BinderBase:onElementChanged')
  }                       
  
  this.onModelChanged = function(){
    if (this.element.value == null){
      this.element.update(this.propertyValue());
		} else {
      this.element.value = this.propertyValue();
		}
		//relax.logger.debug('BinderBase:onModelChanged') 
  }    
  
	//jQuery('#' + this.element.id).bind('change', this.onBlur.bind(this));  
  Event.observe(this.element, 'change', this.onElementChanged.bindAsEventListener(this)); 
	//ne mogu u testovima dignuti change event, pa se stog slusa jos jedan custom (prototype book p.124)
	Event.observe(this.element, 'test:change', this.onElementChanged.bindAsEventListener(this)); 
  this.model.subscribe(this.onModelChanged.bind(this));
        
  this.propertyValue = function(){
    return this.readPropertyValue();
  }                                            
	
  this.elementValue = function(){   
		if (this.element.value == null){
			return this.element.innerHTML;
		} else {		
    	return this.element.value;
		}
  }                                     
	                   
	//TODO prebaci ovo u model base getProperyValue(propertyName) setPropertyValue(propertyName, value)
	//pa tamo mozes provjeriti da li postoji funkcija set[propertyName] pa ako postoji pozoves nju a ako ne odradis direktno
	//ako se pozove set i ne postji funkcija set[propertyName], a [propertyName] je funkcija a ne property onda digni error
	//naprvi test tako da postoji setFullName funkcija
  this.readPropertyValue = function(){
    if (typeof this.model[this.property] == "function")
      return this.model[this.property]();
    else
      return this.model[this.property];
  }     
	
  this.onModelChanged();    
};                 