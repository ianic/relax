relax.uiBinder.IntegerBinder = function(element, object, property){
  relax.uiBinder.BinderBase.call(this, element, object, property);
	
  this.elementValue = function(){                             
    var int = parseInt(this.element.value.toNumber());
    return isNaN(int) ? this.readPropertyValue() : int;
  }                                 
	
  this.propertyValue = function(){
    return this.readPropertyValue().toCurrency(0);
  }
	
  this.onModelChanged();
};
