window.jQuery = window.$ = require("jquery");


$(document).ready(function() {
	
	console.info('Load app with dynamic tree');

	var Services   = require('./services');
	var Table   = require('./tableDynamicTree');
	
	var App = function(){
		console.info('App::Constructor()');
		this.services = new Services();
		this.table 		= new Table('tableContent');

		//--events
		this.btnAction=$('#btn-1');
		this.btnAction.on('click',this.call.bind(this));

	}
	
	App.prototype.call = function(){
		console.info('App::Call()');
		this.table.clean()
		this.services.load()
		.then(this.log,this.error)
		.done(this.printTable.bind(this));
	}
	App.prototype.printTable= function (){
		console.info('App::printTable()');
		this.table.setData(this.services.data);
		this.table.build();
	}

	App.prototype.log= function (message){
		console.info('log: ', message);
	}
	App.prototype.error= function (data){
		console.info('error: ', data);
		alert(data.statusText);
	}

	var app= new App();



	//app.call();
	
});