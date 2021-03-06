relax.ControllerBase = function(){   
	
	/************ building html from template */
	this.readTemplates = function(){ 
		this.templates = {};
		this.findElements('[collection]', this.view).each(function(e){ 
			collectionName = e.getAttribute("collection");
			this.templates[collectionName] = e.innerHTML;
			e.update('');
		}.bind(this));
	} 
		
	this.initHtml = function(view, template){
		this.view = view || relax.pageController.createForm(template, this.displayName());
	  this.readTemplates();	  
	}
	/***********/  
	
	/************ collection binding */
	this.bindCollection = function(collectionName){      
		this.model[collectionName].each(function(item){ this.bindCollectionItem(collectionName, item)}.bind(this) ); 
	}  
	
	this.createCollectionElement = function(collectionName){
		var rootElement = this.findElement('[collection=' + collectionName + ']');
		var template = this.templates[collectionName];  		
	 	rootElement.insert(template);  
		var itemElement = this.findLastChildNode(rootElement);
		return itemElement;	
	}
	
	this.bindCollectionItem = function(collectionName, item){
		if (!this.templates[collectionName])
			return;
 		var itemElement = this.createCollectionElement(collectionName);			
	  this.bindProperties(itemElement, item);
	  this.bindActions(itemElement, item); 
	}    
	
	this.findLastChildNode = function(e){
	  var nodes = e.childNodes; length = e.childNodes.length
		for(var i = length - 1; i>=0; i--){
			if (e.childNodes[i].nodeType == 1)
				return e.childNodes[i];
		} 
	}
	/***********/
	
	/*********** object binding*/
	this.bindObject = function(){   
		this.bindProperties();
		this.bindActions();
	}  
	
	this.bindProperties = function(rootElement, object){  
		rootElement = rootElement || this.view;
		object = object || this.model;
		
		this.findElements('[property]', rootElement).each(function(e) { 
			var property = e.getAttribute("property");
			relax.uiBinder.create(e, object, property, e.getAttribute("binderType"));
		}.bind(this));
	}  
	
	this.bindActions = function(rootElement, object){
		rootElement = rootElement || this.view;
		object = object || this.model;		
		var controller = this;
		 
	 	this.findElements('[action]', rootElement).each(function(e) {
		  var action = e.getAttribute('action');
		  var params = { object: object, element: rootElement }
			e.onclick = function(event) { controller[action](event, params); return false; };
	 	}); 
	}
	/***********/
	
	/*********** finding html elemtns with css query*/   
	this.findElement = function(cssQuery, root){
		return this.findElements(cssQuery, root)[0]
	}
	
	this.findElements = function(cssQuery, root){ 
		root = root || this.view;
		return Selector.findChildElements(root, [cssQuery]);
	}
	/***********/ 
	
	
	/*********** object persistance*/  
	this.save = function(){		
		relax.db.save(this.model);
	}
	
	this.open = function(model){
		if (relax.getType(model) == "string")
			return relax.db.open(model);
		else
			return model;
	}	
  /***********/

} 
