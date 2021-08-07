const express = require("express");

const app = express();
const routerProductos = express.Router();
const routerCarrito   = express.Router();
const puerto = 8080;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

/**
 *  producto: { 
 *      id: 1, 
 *      timestamp: '1628354136', 
 *      nombre: 'Ble', 
 *      descripcion 'Producto ble', 
 *      código '123456', 
 *      foto '/img/ble.png', 
 *      precio: 300, 
 *      stock: 10
 *  }
 */

let administrador = false;
let productos = [];
let producto;

routerProductos.get('/listar/:id?', (req, res) => {
    res.send( { ep: "productos/listar" });
});

routerProductos.post('/agregar', (req, res) => {
    res.send( { ep: "productos/agregar" });
});

routerProductos.put('/actualizar/:id', (req, res) => {  
    res.send( { ep: "productos/actualizar" });
});

routerProductos.delete('/borrar/:id', (req, res) => {
    res.send( { ep: "productos/borrar" });
});

routerCarrito.get('/listar/:id?', (req, res) => {
    res.send( { ep: "carrito/listar" });
});

routerCarrito.post('/agregar/:id_producto', (req, res) => {
    res.send( { ep: "carrito/agregar" });
});

routerCarrito.delete('/borrar/:id', (req, res) => {
    res.send( { ep: "carrito/borrar" });
});

app.use('/productos', routerProductos);
app.use('/carrito', routerCarrito);


app.listen(puerto, () => {
  console.log(`servidor escuchando en http://localhost:${puerto}`);
});

app.on("error", (error) => {
  console.log("error en el servidor:", error);
});