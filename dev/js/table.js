
var Table = function(selectorById){
	console.info('Table::Constructor()');
	this.element = document.getElementById(selectorById.replace('#',''));
	this.data= undefined;
}

Table.prototype.setData = function(data){
	this.data = data;
}

Table.prototype.build = function(){
	if(this.data!=undefined){
		this.element.innerHTML=this.buildRow(this.data,'-',0);;
	}
}

Table.prototype.buildRow = function(value,deep,name){
	console.info('buildRow '+deep+'> ('+name+') ', value);
	deep=deep+'-';
	var result ="";
	if( $.isArray(value) ) {


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
			return '<table class="table table-bordered table-striped">'+columns+result+'</table>'; 
		}else{
			return '<td><table class="table table-bordered table-striped">'+columns+result+'</table></td>'; 
		}

	}else if ( typeof value =="object"){
		var keys = Object.keys(value)
		var columns="<tr>" 
		for (var i=0 ;i < keys.length;i++){
			columns=columns+'<td>'+keys[i]+'</td>';
			result = result+''+ this.buildRow(value[keys[i]],deep, 'object' );	
		} 
		columns=columns+'</tr>'
		if(name=="array"){
		  return '<tr class="tr1">'+result+'</tr>';	
		}else{
			return '<td><table class="table table-bordered table-striped"> '+columns+' <tr class="tr2">'+result+'</tr> </table></td>';	
		}
	}else{
		return '<td class="td2">'+value+'</td>';
	}	
}


module.exports = Table; 