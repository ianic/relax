app.controller.RacunList = function(){
  relax.ControllerBase.call(this);
   
  this.lastId = null;  

  this.model = {totalRows:null, rows:0, hasMore : function() {return this.totalRows == null || this.rows < this.totalRows }};
  relax.ModelBase.call(this.model);
	 
  this.edit = function(event, params){
    new app.controller.Racun(params.object);    
  }                        

  this.more = function(){
    this.getChunk();
    this.bindChunk();                                                      
    this.model.changed();
  }                                                                        
	
  this.getChunk = function(){     
    if (this.model.hasMore()){		
      this.result = relax.db.query(function(doc) { emit(doc._id, doc); }, null, {limit: 50, startkey: this.lastId, skip: this.lastId ? 1 : 0});
      this.lastId = this.result.rows[this.result.rows.length - 1].value._id;
      this.model.totalRows = this.result.total_rows;
      this.model.offest = this.result.offset; 
      this.model.rows += this.result.rows.length;   
			
      if (!this.model.hasMore())
	this.findElement('[action=more]').hide();
			                  
    }else{
      alert("no more rows");
    }                                                  	
  }              
	
  this.bindChunk = function(){
    this.result.rows.each(function(row){                         
	var itemElement = this.createCollectionElement("racuni");
	new app.controller.Racun(row.value, itemElement);
      }.bind(this));
  } 
                                  	
  this.displayName = function(){
    return "svi Racuni";
  }
	 	
  this.initHtml(null, "templateRacuniList");
  this.bindObject();  
  this.more();
 
}
