# Promesas en JavaScript
En algunas ocaciones necesitamos llamar peticiones HTTP, y sabemos que para que la expertiencia de uaurio no sea desfaforable estas peticiones deben ser asincronas, pero que pasa si estas peticiones dependen una de otra, lo que significaria anidar estas peticiones; para este caso necesitamos promesas.

Una promesa no es mas que una respuesta que puede o no estar disponible; esto significa que si lanzamos una peticion la respuesta puede ser devuelta al instante o tardar 1,2,3,... minutos o no responder nunca; pero la interaccion con la aplicacion no se puede detener.

## La idea principal de una promesa 
El metodo siguiente no es mas que una peticion Ajax con Jquery que utiliza el objeto Defered que nos ayuda a registrar diferentes callbacks, este ojeto lo que hace es regresar el objeto cuando se tiene una respuesta ya sea satisfactoria **(resolve)** o cuando falla **(reject)**.

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
### Peticion básica

Una peticion basica es la siguiente propuesta, se solicita el servicio **http://localhost:4001/books** una vez responda el servicio se jecuta el metodo **_printList()_**
``` Javascript
this.ajaxCall('http://localhost:4001/books',{}).then(this.printList.bind(this));
```

### Peticiones anidadas
Cuando necesitamos anidar peticiones podemos utilizar el metodo definido antes y utulizar el objeto **then** que nos ayuda a llamar la siguiente peticion hasta que la peticion actual termina.

Para este ejemplo se manda a llamar el servicio REST **http://localhost:3000/getOne** y hasta que el servicio responda y sea satisfactoria se manda a llamar el servicio **http://localhost:3000/getTwo** y una vez este termine se mandara a llamr el tercer servicio  **http://localhost:3000/getLast**  

```javascript
ajaxCall('http://localhost:3000/getOne','{}')
.then(ajaxCall('http://localhost:3000/getTwo','{}'),error())
.then(ajaxCall('http://localhost:3000/getLast','{}'),error())
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



