
var ServicesStore = function(){
	console.info('ServicesStore::Constructor()');
	this.root = 'http://localhost:3000';
}

ServicesStore.prototype.load = function(){
	console.info("ServicesStore::load()");
	return this.loadStores().then( this.setRetrievedValues.bind(this) );
}

ServicesStore.prototype.setRetrievedValues = function(users){
	console.info("ServicesStore::setRetrievedValues()");
	this.data= users; 
	return users;
}

ServicesStore.prototype.loadStores = function(){
	console.info("ServicesStore::loadStores()");
	return this.ajaxCall(this.root + '/stores/').then(this.loadProducts());
}

ServicesStore.prototype.loadProducts = function(){
var self= this;
	return function(stores){
		console.info('stores:  ',stores);
	   	return stores.reduce(function(previousStore, store) {
	  		return previousStore.then(
	  			function() {
	          		return self.ajaxCall(self.root + '/products', {referenceStore: store.reference });
	      		}
	      	)
	  		.then(self.accumulate(store,'products'))
	  		.then(function() {
	            return stores;
	        });
	  	},$.when());
  	}
}


ServicesStore.prototype.ajaxCall = function(url,data){
	console.info("ServicesStore::ajaxCall() ");
	var deferred = $.Deferred();
	$.ajax ({
	   	type: "GET",
	   	url: url,
	   	dataType: 'json', 
	   	data:data,
	   	success: function (data){deferred.resolve(data );},
	   	fail: function (data,status){ 
	   		console.info('fail: ',data,status);
	   		deferred.reject(data); 
	   	},
	   	error: function (data,status){ 
	   		console.info('error: ',data,status)
	   		deferred.reject(data); 
	   	}
	});
	return deferred.promise();
}

ServicesStore.prototype.accumulate = function(object, key) {
    return function(value) {
      object[key] = value;
      return object;
    }
}

module.exports = ServicesStore; 