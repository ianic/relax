relax.uiBinder.CurrencyBinder = function(element, object, property){
  relax.uiBinder.BinderBase.call(this, element, object, property);
	
  this.elementValue = function(){
    var float = parseFloat(this.element.value.toNumber());
    return isNaN(float) ? this.readPropertyValue() : float;		
  }                                 
	
  this.propertyValue = function(){
    return this.readPropertyValue().toCurrency(2);
  }
	
  this.onModelChanged();
}; 
