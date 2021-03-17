class Producto {
    constructor (id, nombre, descripcion, codigo, foto, precio, stock){
        this.id = id,
        this.nombre = nombre, 
        this.descripcion = descripcion,
        this.codigo = codigo;
        this.foto = foto;
        this.precio = precio;
        this.stock = stock;
    }

    setTimestamp(){
        let date = new Date();

        let d = date.getDate();
        let mo = date.getMonth() + 1;
        let y = date.getFullYear();
        let h = date.getHours();
        let mi = date.getMinutes();
        let s = date.getSeconds();

        let today = d + '/' + mo + '/' + y + ' ' + h + ':' + mi + ':' + s;

        this.timestamp = today;
    }

    update(nombre, descripcion, codigo, foto, precio, stock){
        this.nombre = nombre, 
        this.descripcion = descripcion,
        this.codigo = codigo;
        this.foto = foto;
        this.precio = precio;
        this.stock = stock;
    }
}

module.exports = Producto;
