app.controller.Racun = function(model, element){     
	
  relax.ControllerBase.call(this);   
	
  this.model = this.open(model); 
  app.model.Racun.apply(this.model);
        
  this.bind = function(){
    this.bindObject();   
    this.bindCollection('stavke');
  } 
  
  this.addStavka = function(){
    this.bindCollectionItem("stavke", this.model.createStavka());
  }
                                                                 
  this.removeStavka = function(event, params){	 
    this.model.removeStavka(params.object);             
    Element.remove(params.element);
  }    

  this.displayName = function(){
    return "Racun " + this.model.partner.naziv;
  }  
	
  this.edit = function(event, params){
    new app.controller.Racun(params.object);    
  }
  
  this.initHtml(element, 'templateRacunEdit');	
  this.bind();
}
