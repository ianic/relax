  // this function is needed to work around 
  // a bug in IE related to element attributes
  function hasClass(obj) {
     var result = false;
     if (obj.getAttributeNode("class") != null) {
         result = obj.getAttributeNode("class").value;
     }
     return result;
  }   

 function stripe(id) {
   
    var table = $(id);
    if (! table) { return; }
   
    var even = false;
 
    var tbodies = table.getElementsByTagName("tbody");
    for (var h = 0; h < tbodies.length; h++) {            
      var trs = tbodies[h].getElementsByTagName("tr");
      for (var i = 0; i < trs.length; i++) {        
        tr = $(trs[i])
        if (even)
          tr.addClassName('odd')
        else
          tr.removeClassName('odd');                    
        even =  ! even;
      }
    }    
  }
