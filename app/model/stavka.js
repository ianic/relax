app.model.Stavka = function(parent){
  relax.ModelBase.call(this, parent, "app.model.Stavka");   
  
  this.naziv = this.naziv || '';
  this.jedinicaMjere = this.jedinicaMjere || 'kom';
  this.kolicina = this.kolicina || 1;
  this.cijena = this.cijena || 0;
  
  this.iznos = function(){ 
    return this.kolicina * this.cijena; 
  }
}      
