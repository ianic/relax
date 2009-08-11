relax.controller.StringFormatter = function(element){
	
	this.get = function(){
		return element.value;
	}        
	
	this.set = function(val){
		if (this.isInput()){
			element.value = val;            
		}else{
			element.innerHTML = val;
		}
	}     
	
	this.isInput = function(){ return element.tagName == 'INPUT'; }
	
}