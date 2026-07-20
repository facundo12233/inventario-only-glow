const MAXC = 50;


//==================== ESTRUCTURAS ====================

class Producto {

    constructor(nombre, cantidad){
        this.nombre = nombre;
        this.cantidad = cantidad;
    }

}



class Nodo {

    constructor(producto){

        this.producto = producto;
        this.ant = null;
        this.sig = null;

    }

}



//==================== CREAR ====================

function crearLista(){

    return null;

}



//==================== MOSTRAR ====================

function mostrarInventario(lista,id){

    let div = document.getElementById(id);

    div.style.display = "block";

    div.innerHTML = "";


    if(lista == null){

        div.innerHTML = "<p>Inventario vacío</p>";
        return;

    }


    let aux = lista;


    while(aux != null){

        div.innerHTML += 
        "<p>" +
        aux.producto.nombre +
        " - Cantidad: " +
        aux.producto.cantidad +
        "</p>";


        aux = aux.sig;

    }

}



//==================== AGREGAR ====================

function agregarProducto(lista,nombre,cantidad){


    let nuevo = new Nodo(
        new Producto(nombre,cantidad)
    );


    nuevo.sig = lista;

    nuevo.ant = null;


    if(lista != null){

        lista.ant = nuevo;

    }


    return nuevo;

}




//==================== ELIMINAR ====================

function eliminarProducto(lista,nombre){


    let aux = lista;


    while(aux != null){


        if(aux.producto.nombre == nombre){


            if(aux.ant == null){

                lista = aux.sig;


                if(lista != null)
                    lista.ant = null;


                return lista;

            }


            else if(aux.sig == null){

                aux.ant.sig = null;

                return lista;

            }


            else{

                aux.ant.sig = aux.sig;

                aux.sig.ant = aux.ant;


                return lista;

            }

        }


        aux = aux.sig;

    }


    return lista;

}



//==================== MODIFICAR ====================

function modificarCantidad(lista,nombre,cantidad){


    let aux = lista;


    while(aux != null){


        if(aux.producto.nombre == nombre){

            aux.producto.cantidad = cantidad;

            return;

        }


        aux = aux.sig;

    }

}



//==================== STOCK ====================

function aumentarStock(lista,nombre,cantidad){


    let aux = lista;


    while(aux != null){


        if(aux.producto.nombre == nombre){

            aux.producto.cantidad += cantidad;

            return;

        }


        aux = aux.sig;

    }

}



function disminuirStock(lista,nombre,cantidad){


    let aux = lista;


    while(aux != null){


        if(aux.producto.nombre == nombre){

            aux.producto.cantidad -= cantidad;

            return;

        }


        aux = aux.sig;

    }

}




//==================== GUARDAR ====================

function guardarInventario(pestanas,cejas,unas){


    let datos = {

        pestanas: convertirArray(pestanas),

        cejas: convertirArray(cejas),

        unas: convertirArray(unas)

    };


    localStorage.setItem(
        "inventario",
        JSON.stringify(datos)
    );

}



function convertirArray(lista){


    let array=[];


    let aux=lista;


    while(aux != null){


        array.push({

            nombre: aux.producto.nombre,

            cantidad: aux.producto.cantidad

        });


        aux = aux.sig;

    }


    return array;

}