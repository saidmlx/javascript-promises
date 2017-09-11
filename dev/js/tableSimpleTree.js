var TableSimpleTree = function(selectorById){
	console.info('TableSimpleTree::Constructor()');
	this.element = document.getElementById(selectorById.replace('#',''));
	this.data= undefined;
	this.colspan=1
}
TableSimpleTree.prototype.setData = function(data){
	this.data = data;
}
TableSimpleTree.prototype.setColspan = function(colspan){
	this.colspan = colspan;

	console.info('this.colspan'+this.colspan)
}
TableSimpleTree.prototype.build = function(){
	if(this.data!=undefined){
		$(this.element).children().remove();
		this.element.innerHTML=this.buildRow(this.data,'-',0);
	}
}
TableSimpleTree.prototype.buildRow = function(value,deep,name){
	console.info('buildRow '+deep+'> ('+name+') ', value);
	deep=deep+'-';
	var result ="";
	if( $.isArray(value) ) {
		if(value.length>0){
			for (var i=0 ;i < value.length; i++ ){
				result = result+''+  this.buildRow( value[i],deep,'array' );	
			}
			var keys = Object.keys(value[0])
			var columns="<tr>" 
			for (var i=0 ;i < keys.length;i++){
				columns=columns+'<td>'+keys[i]+'</td>';
			}
			columns=columns+'</tr>';
			if(name==''){
				return '<table class="table table-bordered table-striped a">'+columns+result+'</table>'; 
			} else if(name=='subobject'){
				return '<td colspan="'+this.colspan+'"><table class="table table-bordered table-striped b">'+columns+result+'</table></td>'; 
			}else{
				return '<td><table class="table table-bordered table-striped b">'+columns+result+'</table></td>'; 
			}
		}else{
			return ""
		}
	}else if ( typeof value =="object"){
		var keys = Object.keys(value)
		var columns='<tr class="a">'
		var arrays=[] 
		for (var i=0 ;i < keys.length;i++){
			columns=columns+'<td>'+keys[i]+'</td>';
			if($.isArray(value[keys[i]])){
				arrays.push(value[keys[i]]);
			}else{
				result = result+''+ this.buildRow(value[keys[i]],deep, 'object' );	
			}
		}
		var result2 ="";
		if(arrays.length>0){
			for (var i=0 ;i < arrays.length;i++){
				result2 = result2+''+ this.buildRow(arrays[i],deep, 'subobject' );	
			}
		}
		columns=columns+'</tr>'
		if(name=="array"){
		  return '<tr class="tr1">'+result+'</tr> <tr class="tr1-a">'+result2+"</tr>";	
		}else{
			return '<td><table class="table table-bordered table-striped"> '+columns+' <tr class="tr2">'+result+'</tr> </table></td>';	
		}
	}else{
		return '<td class="td2">'+value+'</td>';
	}	
}
TableSimpleTree.prototype.clean = function(){
	$(this.element).children().remove();
}

module.exports = TableSimpleTree; 