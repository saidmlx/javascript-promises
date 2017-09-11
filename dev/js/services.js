
var Services = function(){
	console.info('Services::Constructor()');
	this.root='http://localhost:3000';
	this.data=undefined;

}
Services.prototype.load = function(){
	console.info("Services::load()");
	return this.loadUsers().then( this.setRetrievedValues.bind(this) );
}
Services.prototype.setRetrievedValues = function(users){
	console.info("Services::setRetrievedValues()");
	this.data= users; 
	return users;
}

Services.prototype.loadUsers = function(){
	console.info("Services::loadUsers()");
	return this.ajaxCall(this.root + '/users/').then(this.loadAlbums());
}
Services.prototype.loadAlbums = function(users) {
	console.info("Services::loadAlbums()");
	var self= this;
	return function(users){
		console.info('users:  ',users);
	   	return users.reduce(function(previousUser, user) {
	  		return previousUser.then(
	  			function() {
	          		return self.ajaxCall(self.root + '/albums', {userId: user.id});
	      		}
	      	)
	      	.then(self.loadPhotos())	
	  		.then(self.accumulate(user,'albums'))

	  		.then(function() {
	            return users;
	        });
	  	},$.when());
  	}
};

Services.prototype.loadPhotos = function(albums) {
	console.info("Services::loadPhotos()");
	var self = this
	return function(albums){
		return albums.reduce(function(previousAlbum, album) {
			return previousAlbum.then(
	  			function() {
	          		return self.ajaxCall(self.root + '/photos', {albumId: album.id});
	      		},self)
			.then(self.accumulate(album,'photos'))
			.then(function() {
	            return albums;
	        });
		},$.when());
	}
}

Services.prototype.ajaxCall = function(url,data){
	console.info("Services::ajaxCall() ");
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

Services.prototype.accumulate = function(object, key) {
    return function(value) {
      object[key] = value;
      return object;
    }
}


module.exports = Services; 