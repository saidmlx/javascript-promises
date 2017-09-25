# Promises
In some cases we need call nested http request, these examples is a effort who try help you understand how manage nested request in javascript.

## What you need
1. npm
2. http-server

## How run the example

1. Clone The repo
```
git clone https://github.com/saidmlx/promises.git
```
2. Setup the mock services 
```
cd promises
http-server --watch db.json
```
3. Install dependencies
```
npm install
```
4. Run de project
```
gulp
```
## The main ideas from promises

The next javascript function is the way how you can implement a http request through promises, this code you cand find anywhere.

If you want to know more about promises you can find many examples search in google
```javascript
var ajaxCall = function(url,data){
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
```

The next javascript function is the way how you can implement a http request through promises, this code you cand find anywhere.

It's a basic example nested request but not chained

If you want to know more about promises you can find many examples search in google.

```javascript
ajaxCall('http://localhost:3000/','{}')
.then(ajaxCall('http://localhost:3000/','{}'),error())
.then(ajaxCall('http://localhost:3000/','{}'),error())
```

If you want nested request chained then you need the Reduce method

```javascript
var resultado = arr.reduce(funcion[, valorInicial]);
```
I propose the next code 
```
array.reduce(function(previousItem, Item) {
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
```

### Conclusions
i have created two completed examples tha you can explore 



