relax.controller.Template = function(templateElement){
	
	this.
	
	this.readTemplates = function(){ 
		this.templates = {};
		this.findElements('[collection]', this.view).each(function(e){ 
			collectionName = e.getAttribute("collection");
			this.templates[collectionName] = e.innerHTML;
			e.update('');
		}.bind(this));
	}
	
}