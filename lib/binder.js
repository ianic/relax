//binder za select
//binder za radio i check box-ove      
//uvesti default-e

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

relax.uiBinder.BinderBase = function(element, object, property){
  this.element = $(element);
  this.model = object;
  this.property = property || element;
                  
  this.onBlur = function(){  
    this.model[this.property] = this.elementValue();
    this.model.changed();
  }                       
  
  this.onChanged = function(){
    if (this.element.value == null)
      this.element.update(this.propertyValue());
    else
      this.element.value = this.propertyValue();
  }    
    
  Event.observe(this.element, 'change', this.onBlur.bindAsEventListener(this)); 
  this.model.subscribe(this.onChanged.bind(this));
        
  this.propertyValue = function(){
    return this.readPropertyValue();
  }                                            
	
  this.elementValue = function(){
    return this.element.value;
  }                                     
	
  this.readPropertyValue = function(){
    if (typeof this.model[this.property] == "function")
      return this.model[this.property]();
    else
      return this.model[this.property];
  }     
	
  this.onChanged();    
};                 
  
relax.uiBinder.StringBinder = function(element, object, property){	
  relax.uiBinder.BinderBase.call(this, element, object, property);
};

relax.uiBinder.CurrencyBinder = function(element, object, property){
  relax.uiBinder.BinderBase.call(this, element, object, property);
	
  this.elementValue = function(){
    var float = parseFloat(this.element.value.toNumber());
    return isNaN(float) ? this.readPropertyValue() : float;		
  }                                 
	
  this.propertyValue = function(){
    return this.readPropertyValue().toCurrency(2);
  }
	
  this.onChanged();
}; 

relax.uiBinder.IntegerBinder = function(element, object, property){
  relax.uiBinder.BinderBase.call(this, element, object, property);
	
  this.elementValue = function(){                             
    var int = parseInt(this.element.value.toNumber());
    return isNaN(int) ? this.readPropertyValue() : int;
  }                                 
	
  this.propertyValue = function(){
    return this.readPropertyValue().toCurrency(0);
  }
	
  this.onChanged();
};

relax.uiBinder.DateBinder = function(element, object, property){
  relax.uiBinder.BinderBase.call(this, element, object, property);
	
  this.elementValue = function(){
    var parts = this.element.value.split('.');
    var defaultDate = new Date();
    var day = parts[0] || defaultDate.getDate();
    var month = parts[1] || defaultDate.getMonth() + 1;
    var year = parts[2] || defaultDate.getFullYear();
    var date = new Date(year, month - 1, day);                         		
    return isNaN(date.valueOf()) ? this.readPropertyValue() : date;
  }                                 
	
  this.propertyValue = function(){  
    var date = this.readPropertyValue();
    return date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
  }
	
  this.onChanged();
};
