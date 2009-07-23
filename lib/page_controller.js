relax.pageController = {
	
	forms : [],
	
	createForm : function(template, name){
		name = name || "-----------";      
		var rootElement =  $('forms')
		rootElement.insert('<div>' + $(template).innerHTML + '</div>'); 
		var element = this.findLastChildNode(rootElement)
		this.forms.push({ name: name, element: element});     
		this.updateIndex();
		this.selectPage(element);
		return element;
	}, 
    
	selectPage : function(element){
		this.forms.each(function(form) { form.element.hide(); });
		element.show();
	},	                             
	
	updateIndex : function(){
		$("formsIndex").update();
		this.forms.each(function(form) {
			$("formsIndex").insert("<a href='#'>" + form.name + "</a>");
			var a = $$('#formsIndex a:last-child')[0]; 
			a.onclick = function() { this.selectPage(form.element); }.bind(this); 
		}.bind(this));
	}
	
}