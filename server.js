const express = require("express");

const app = express();
const routerProductos = express.Router();
const routerCarrito   = express.Router();
const puerto = 8080;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Configurar cabeceras y cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

const {Producto} = require('./Producto');
const {Carrito} = require('./Carrito');

let administrador = false;
let productos = [
  {
    "id": 1,
    "timestamp": 1628548996431,
    "nombre": "Bicicleta Rodado 28 Sunny Comet",
    "descripcion": "Bicicleta Rodado 28” Sunny Comet",
    "codigo": "200445566",
    "foto": "bici.jpeg",
    "precio": 54990,
    "stock": 16
},
{
    "id": 2,
    "timestamp": 1628548997319,
    "nombre": "Campera Nylon Ultraliviana Kappa",
    "descripcion": "Campera Nylon ultraliviana marca kappa.",
    "codigo": "Rs20033366",
    "foto": "campera.jpeg",
    "precio": 11000,
    "stock": 12
},
{
    "id": 3,
    "timestamp": 1628548998333,
    "nombre": "Gimnasio Multifunción",
    "descripcion": "Gimnasio Multifunción C/ Polea Dorsalera Remo",
    "codigo": "12sdfsd3456",
    "foto": "gym.jpeg",
    "precio": 31500,
    "stock": 14
},
{
    "id": 4,
    "timestamp": 1628548999124,
    "nombre": "Kit Caja Set Herramientas Llave 72 Piezas",
    "descripcion": "Caja herramientas 72 piezas.Importada de excelente calidad",
    "codigo": "25886333",
    "foto": "herramientas.jpeg",
    "precio": 14300,
    "stock": 26
},
{
    "id": 5,
    "timestamp": 1628548999880,
    "nombre": "Cafetera Nespresso Modelo Inissia",
    "descripcion": "Empezá tu día con energía y de la mejor manera, disfrutando de la textura y calidad de un buen café en la comodidad de tu casa.",
    "codigo": "ne5556663315",
    "foto": "nespresso.jpg",
    "precio": 14000,
    "stock": 12
}
];
let carritos = [];

let carrito = new Carrito(
  carritos.length + 1,
  Date.now()        
);


routerProductos.get("/listar/:id?", (req, res) => {
  if (req.params.id) {
    let producto = productos.filter( producto => {
      return producto.id == req.params.id;
    });

    let response = producto.length > 0 ? producto : { error: "producto no encontrado" };

    res.send(response);
  }

  res.send(productos);
});

routerProductos.post('/agregar', (req, res) => {
    let nuevoProducto = req.body;
    let timestamp = Date.now();
    
    let producto = new Producto(
        productos.length + 1,
        timestamp,
        nuevoProducto.nombre,
        nuevoProducto.descripcion,
        nuevoProducto.codigo,
        nuevoProducto.foto,
        nuevoProducto.precio,
        nuevoProducto.stock
    );

    productos.push(producto);

    
    res.send( producto );
});

routerProductos.put('/actualizar/:id', (req, res) => {
    
    const id = parseInt(req.params.id);

    const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
    let timestamp = Date.now();    
  
    const producto = productos.filter(function (producto) {
      return producto.id === id;
    });
  
    if (!producto.length) {
      res.send({ error: "No existe el producto" });
    }
  
    productos.splice(id - 1, 1, { id, timestamp, nombre, descripcion, codigo, foto, precio, stock });
  
    res.send({ id, timestamp, nombre, descripcion, codigo, foto, precio, stock });    
});

routerProductos.delete('/borrar/:id', (req, res) => {
  const id = parseInt(req.params.id);  
  const producto = productos.filter( producto => {
    return producto.id == id;
  });
  
  if(!producto.length){
    res.send( { error: "No existe el producto" });
  }
    
  productos = productos.filter( producto => {
    return producto.id != id;
  });

  res.send(producto);
});

routerCarrito.get('/listar/:id?', (req, res) => {
  let productoId = req.params.id;

  if (productoId) {
    let producto = carrito.getProductoById(productoId);
    let response = producto.length > 0 ? producto : { error: "producto no encontrado" };
    res.send(response);
  }

  res.send( carrito.getProductos() );
});

routerCarrito.post('/agregar/:id_producto', (req, res) => {
  
  let nuevoProducto = productos.filter( producto => {
    return producto.id == req.params.id_producto;
  });

  if(!nuevoProducto.length){
    res.send({ error: "producto no encontrado" });
  } else {

    carrito.agregarProducto(nuevoProducto[0]);  
    res.send( carrito.getProductos() );
  }  
});

routerCarrito.delete('/borrar/:id', (req, res) => {
    let id = req.params.id;

    if(id){    
      let producto = carrito.getProductoById(id);  

      if(!producto){
        res.send({ error: "producto no encontrado" });
      }      
      carrito.borrarProducto(id);
    } else {
      res.send({ error: "producto no encontrado" });
    }
    res.send({ succes: "producto borrado correctamente"});
});

app.use('/productos', routerProductos);
app.use('/carrito', routerCarrito);


app.listen(puerto, () => {
  console.log(`servidor escuchando en http://localhost:${puerto}`);
});

app.on("error", (error) => {
  console.log("error en el servidor:", error);
});