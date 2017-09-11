window.jQuery = window.$ = require("jquery");


$(document).ready(function() {
	
	console.info('Load app');	
	
	var App = function(){
		console.info('App::Constructor()');
	}
	
	var app= new App();

});