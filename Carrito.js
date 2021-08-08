class Carrito {
  constructor(id, timestamp) {
    this.id = id;
    this.timestamp = timestamp;
    this.productos = [];
  }

  agregarProducto(nuevoProducto) {    
    this.productos.push(nuevoProducto);
  }

  getProductoById(id) {    
    let producto = this.productos.filter( producto => {
      return producto.id == id;
    });    
    return producto;    
  }

  getProductos(){
    return this.productos;
  }

  borrarProducto(id){
    this.productos = this.productos.filter( producto => {
        return producto.id != id;
      });
  }
}

module.exports = { Carrito };
