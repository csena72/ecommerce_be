# Desafío: Primera Entrega del Proyecto Final

## >>Consigna: 
Deberás entregar el estado de avance de tu aplicación eCommerce Backend, que implemente un servidor de aplicación basado en la plataforma Node.js y el middleware express. El servidor implementará dos conjuntos de rutas agrupadas en routers, uno con la url base '/productos' y el otro con '/carrito'. El puerto de escucha será el 8080 para desarrollo y process.env.PORT para producción en glitch.com

## >>Aspectos a incluir en el entregable:

1. El **router base '/productos'** implementará cuatro rutas:
- '/listar/:id?' : Me permite listar todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores)

- '/agregar' : Para incorporar productos al listado (disponible para administradores)

- '/actualizar/:id' : Actualiza un producto por su id (disponible para administradores)

- '/borrar/:id' : Borra un producto por su id (disponible para administradores)

2. El **router base '/carrito'** implementará tres rutas:
'/listar/:id?' : Me permite listar todos los productos guardados en el carrito ó un producto por su id de carrito (disponible para usuarios y administradores)
'/agregar/:id_producto' : Para incorporar productos al carrito por su id de producto (disponible para usuarios y administradores)
'/borrar/:id' : Eliminar un producto del carrito por su id de carrito (disponible para usuarios y administradores)

3. Crear una variable booleana administrador, cuyo valor configuraremos más adelante con el sistema de login. Según su valor (true ó false) me permitirá alcanzar o no las rutas indicadas. En el caso de recibir un request a una ruta no permitida por el perfil, devolver un objeto de error.

Ejemplo:
``` 
{ error : -1, descripcion: ruta 'x' método 'y' no autorizada}
```
4. Un **producto** dispondrá de los siguientes campos:  id, timestamp, nombre, descripcion, código, foto (url), precio, stock.

5. El **carrito** de compras tendrá la siguiente estructura: 
id, timestamp(carrito), producto: { id, timestamp(producto), nombre, descripcion, código, foto (url), precio, stock }
6. El timestamp puede implementarse con Date.now()
7. Comenzar a trabajar con el listado de productos y el carrito de compras en memoria del servidor, luego persistirlos en el filesystem.

### >>A tener en cuenta:
1. Para realizar la **prueba de funcionalidad** hay dos opciones:
- Probar con postman cada uno de los endpoints (productos y carrito) y su operación en conjunto.

- Realizar una aplicación frontend sencilla, utilizando HTML/CSS/JS ó algún framework de preferencia, que represente el listado de productos en forma de cards. En cada card figuran los datos del producto, que, en el caso de ser administradores, podremos editar su información. Para este último caso incorporar los botones actualizar y eliminar. También tendremos un formulario de ingreso de productos nuevos con los campos correspondientes y un botón enviar. Asimismo, construir la vista del carrito donde se podrán ver los productos agregados e incorporar productos a comprar por su id de producto.

2. Esta aplicación de frontend debe enviar los requests get, post, put y delete al servidor utilizando fetch y debe estar ofrecida en su espacio público. En el caso de requerir una ruta no implementada en el servidor, este debe contestar un objeto de error: 
ej
``` 
{ error : -2, descripcion: ruta 'x' método 'y' no implementada}
```
3. En todos los casos, el diálogo entre el frontend y el backend debe ser en formato JSON. El servidor no debe generar ninguna vista.

4. La estructura de programación será ECMAScript, separada tres en módulos básicos (router, lógica de negocio/api y persistencia ). Más adelante implementaremos el desarrollo en capas. Utilizar preferentemente clases, constructores de variables let y const y arrow function.

5. Realizar la prueba de funcionalidad completa en el ámbito local (puerto 8080) y en glitch.com


### Ejemplo para consumir el EP que lista productos:

```
curl --location --request GET 'localhost:8080/productos/listar/' \
--data-raw ''
```

### Ejemplo para consumir el EP que incorpora un producto al listado:

```
curl --location --request POST 'localhost:8080/productos/agregar' \
--header 'Content-Type: application/json' \
--data-raw '{
    "nombre": "Micro Procesador Amd Ryzen 7 3800xt 4.7ghz",
    "descripcion": "Amd Ryzen 7 3800XT 4.7 Ghz - AM4 Sin Video Sin Cooler",
    "codigo": "bfgg55555666",
    "foto": "/assets/img/ryzen7.jpg",
    "precio": 49500,
    "stock": 23
}'
```

### Ejemplo para consumir el EP que actualiza un producto por su id:

```
curl --location --request PUT 'localhost:8080/productos/actualizar/1' \
--header 'Content-Type: application/json' \
--data-raw '{
    "nombre": "Perro",
    "descripcion": "fdwsfdsfsd",
    "codigo": "12sdfsd3456",
    "foto": "/img/ble.fsdfpng",
    "precio": 400,
    "stock": 50
}'
```

### Ejemplo para consumir el EP que borra un producto por su id:

```
curl --location --request DELETE 'localhost:8080/productos/borrar/1'
```

## Carrito:

### Ejemplo para consumir el EP que lista todos los productos guardados en el carrito:

```
curl --location --request GET 'localhost:8080/carrito/listar/'
```
### Ejemplo para consumir el EP que incorpora productos al carrito por su id de producto:

```
curl --location --request POST 'localhost:8080/carrito/agregar/3'
```
### Ejemplo para consumir el EP que elimina un producto del carrito:

```
curl --location --request DELETE 'localhost:8080/carrito/borrar/2'
```