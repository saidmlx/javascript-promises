# Promesas en JavaScript
En algunas ocasiones necesitamos llamar peticiones HTTP, y sabemos que para que la experiencia de usuario no sea desfavorable estas peticiones deben ser asíncronas, pero que pasa si estas peticiones dependen una de otra, lo que significaría anidar estas peticiones; para este caso necesitamos promesas.

Una promesa no es más que una respuesta que puede o no estar disponible; esto significa que si lanzamos una petición la respuesta puede ser devuelta al instante o tardar 1,2,3,... minutos o no responder nunca.

## La idea principal de una promesa 
El método siguiente no es más que una petición **_Ajax_** con **_Jquery_** que utiliza el objeto _**Defered_** que nos ayuda a registrar diferentes callbacks, este objeto lo que hace es regresar el objeto cuando se tiene una respuesta ya sea satisfactoria (**_resolve_**) o cuando falla (**_reject_**).

```javascript
var ajaxCall = function(url,data){
  var deferred = $.Deferred();
  $.ajax ({
    type: "GET",
    url: url,
    dataType: 'json', 
    data:data,
    success: function (data){
      deferred.resolve(data );
    },
    fail: function (data,status){  
      deferred.reject(data); 
    },
    error: function (data,status){ 
      deferred.reject(data); 
    }
  });
  return deferred.promise();
}
```

### Peticion básica

Un ejemplo de peticion basica seria la siguiente, el metodo **_getBooks()_** llama al servicio **http://localhost:4001/books** una vez responda el servicio se jecuta el metodo **_printBooks()_**


``` Javascript
getBooks = function(){
  return this.ajaxCall('http://localhost:4001/books',{});
}
printBooks = function(books){
  return books.forEach(this.printBook);		 
}

getBooks()
.then(this.printBooks.bind(this));
```

### Peticiones anidadas
Cuando necesitamos anidar peticiones podemos utilizar el método antes definido y utilizar el objeto **then**.

En este ejemplo tenemos la siguiente secuencia.
1. Con el método **_getBooks()_** se realiza la peticion al servicio **_http://localhost:4001/books_** que nos regresara un listado de libros. 
2. Con el método **_getMusic()_** construimos HTML de los libros.
3. Con el método **_getMusic()_** se realiza la petición al servicio **_http://localhost:4001/music_** que nos regresara un listado de los álbumes de música. 
4. Con el metodo **_printMusic()_** construimos HTML de los álbumes de música que nos regreso el servicio.

El código para hacer lo anterior es el siguiente.
```javascript
this.getBooks()
.then(this.printBooks.bind(this))
.then(this.getMusic.bind(this))
.then(this.printMusic.bind(this));
```

## Peticiones encadenadas
La sección anterior se muestra como llamar peticiones anidadas, pero no encadenadas, en etas la segunda peticion depende de la respuesta de la primer peticion para tomar uno de los valores devueltos. 

Imaginemos que tenemos:
Estructura de datos

Servicios publicados 

Para empezar veamos la siguiente estructura **reduce** que es una funcion acumulador que nos ayuda a recorrer un array.  
```javascript
var resultado = arr.reduce(funcion[, valorInicial]);
```
y qui tenemos una peticion 

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



## Conclusions
I have created two completed examples tha you can explore 



