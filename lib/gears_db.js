relax.db = { 
  db: null, 

	init: function(dbName, recreate){    
		this.db = google.gears.factory.create('beta.database');
	  this.db.open(dbName);                  
		if (recreate)
			  this.db.execute('drop table if exists documents;');
	  this.db.execute('create table if not exists documents (id text, value text, class text)');
	},                                               

	save: function(obj){	    		                 
		if (obj._id)
			if (this.update(obj))
				return;
						
		this.insert(obj);		
	},  
	
	update: function(obj){
		this.db.execute('update documents set value = ? where id = ?', [Object.toJSON(obj), obj._id]);
		var rs = this.db.execute('select id from documents where id = ?', [obj._id]);
		return rs.isValidRow();
	}, 
	
	insert: function(obj){
		if (!obj._id)
			obj._id = (new UUID()).id;
		this.db.execute('insert into documents (id, value, class) values (?, ?, ?)', [obj._id, Object.toJSON(obj), obj.class]);	 		
	},
	
	read: function(id){
		var rs = this.db.execute('select value from documents where id = ?', [id]);
		if (rs.isValidRow())
			return this.jsonToObject(rs.field(0));
	},      

	readAll: function(class, limit, offset){
		var objects = [];
		var rs = this.db.execute('select value from documents where class = ? limit ? offset ?', [class, limit, offset]);
		while(rs.isValidRow()){
		  objects.push(this.jsonToObject(rs.field(0))); 
		  rs.next();
		}
		return objects;
	},   

	jsonToObject: function(json){
		var obj = json.evalJSON();      
		if (obj.class){
			var constructor = eval(obj.class)  
			constructor.call(obj, parent);
		}
		return obj;	
	},
		
} 

relax.db.Paginator = function(class, perPage){
	this.class = class;
	this.perPage = perPage;
	this.db = relax.db.db;    
	this.page = 0;     
	
	this.count = this.db.execute('select count(*) from documents where class = ?', [this.class]).field(0);
	
	this.hasMore = function(){    
		return this.page * this.perPage < this.count;			
	}
	
	this.nextPage = function(){
		this.objects = relax.db.readAll(this.class, this.perPage, this.page * this.perPage);
		this.page = this.page + 1;
		return this.objects;
	}
}