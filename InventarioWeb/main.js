let pestanas = null;
let unas = null;
let cejas = null;


//================ MENU =================

function ocultarMenus(){

    document.getElementById("principal").style.display = "none";
    document.getElementById("Menupestanas").style.display = "none";
    document.getElementById("Menuunas").style.display = "none";
    document.getElementById("Menucejas").style.display = "none";

}


function abrirPestanas(){

    ocultarMenus();

    document.getElementById("Menupestanas").style.display = "block";

}


function abrirUnas(){

    ocultarMenus();

    document.getElementById("Menuunas").style.display = "block";

}


function abrirCejas(){

    ocultarMenus();

    document.getElementById("Menucejas").style.display = "block";

}


function volver(){

    ocultarMenus();

    document.getElementById("principal").style.display = "block";

}


function salir(){

    alert("Saliendo del sistema");

}



//================ PESTAÑAS =================


function agregarPestana(){

    let nombre = prompt("Nombre:");

    let cantidad = Number(prompt("Cantidad:"));


    pestanas = agregarProducto(
        pestanas,
        nombre,
        cantidad
    );


    guardarInventario(pestanas,cejas,unas);


    alert("Producto agregado");

}



function mostrarPestanas(){

    mostrarInventario(
        pestanas,
        "listaPestanas"
    );

}



function eliminarPestana(){

    let nombre = prompt("Producto a eliminar:");

    pestanas = eliminarProducto(
        pestanas,
        nombre
    );


    guardarInventario(pestanas,cejas,unas);


    mostrarInventario(
        pestanas,
        "listaPestanas"
    );

}



function modificarPestana(){

    let nombre = prompt("Producto:");

    let cantidad = Number(prompt("Nueva cantidad:"));


    modificarCantidad(
        pestanas,
        nombre,
        cantidad
    );


    guardarInventario(pestanas,cejas,unas);


    mostrarInventario(
        pestanas,
        "listaPestanas"
    );

}



function aumentarPestana(){

    let nombre = prompt("Producto:");

    let cantidad = Number(prompt("Cantidad:"));


    aumentarStock(
        pestanas,
        nombre,
        cantidad
    );


    guardarInventario(pestanas,cejas,unas);


    mostrarInventario(
        pestanas,
        "listaPestanas"
    );

}



function disminuirPestana(){

    let nombre = prompt("Producto:");

    let cantidad = Number(prompt("Cantidad:"));


    disminuirStock(
        pestanas,
        nombre,
        cantidad
    );


    guardarInventario(pestanas,cejas,unas);


    mostrarInventario(
        pestanas,
        "listaPestanas"
    );

}



//================ UÑAS =================


function agregarUna(){

    let nombre = prompt("Nombre:");

    let cantidad = Number(prompt("Cantidad:"));


    unas = agregarProducto(
        unas,
        nombre,
        cantidad
    );


    guardarInventario(pestanas,cejas,unas);


    alert("Producto agregado");

}



function mostrarUnas(){

    mostrarInventario(
        unas,
        "listaUnas"
    );

}



function eliminarUna(){

    let nombre = prompt("Eliminar:");

    unas = eliminarProducto(
        unas,
        nombre
    );


    guardarInventario(pestanas,cejas,unas);


    mostrarInventario(unas,"listaUnas");

}



function modificarUna(){

    let nombre = prompt("Producto:");

    let cantidad = Number(prompt("Cantidad:"));


    modificarCantidad(
        unas,
        nombre,
        cantidad
    );


    guardarInventario(pestanas,cejas,unas);


    mostrarInventario(unas,"listaUnas");

}



function aumentarUna(){

    let nombre = prompt("Producto:");

    let cantidad = Number(prompt("Cantidad:"));


    aumentarStock(
        unas,
        nombre,
        cantidad
    );


    guardarInventario(pestanas,cejas,unas);


    mostrarInventario(unas,"listaUnas");

}



function disminuirUna(){

    let nombre = prompt("Producto:");

    let cantidad = Number(prompt("Cantidad:"));


    disminuirStock(
        unas,
        nombre,
        cantidad
    );


    guardarInventario(pestanas,cejas,unas);


    mostrarInventario(unas,"listaUnas");

}



//================ CEJAS =================


function agregarCeja(){

    let nombre = prompt("Nombre:");

    let cantidad = Number(prompt("Cantidad:"));


    cejas = agregarProducto(
        cejas,
        nombre,
        cantidad
    );


    guardarInventario(pestanas,cejas,unas);


    alert("Producto agregado");

}



function mostrarCejas(){

    mostrarInventario(
        cejas,
        "listaCejas"
    );

}



function eliminarCeja(){

    let nombre = prompt("Eliminar:");

    cejas = eliminarProducto(
        cejas,
        nombre
    );


    guardarInventario(pestanas,cejas,unas);


    mostrarInventario(cejas,"listaCejas");

}



function modificarCeja(){

    let nombre = prompt("Producto:");

    let cantidad = Number(prompt("Cantidad:"));


    modificarCantidad(
        cejas,
        nombre,
        cantidad
    );


    guardarInventario(pestanas,cejas,unas);


    mostrarInventario(cejas,"listaCejas");

}



function aumentarCeja(){

    let nombre = prompt("Producto:");

    let cantidad = Number(prompt("Cantidad:"));


    aumentarStock(
        cejas,
        nombre,
        cantidad
    );


    guardarInventario(pestanas,cejas,unas);


    mostrarInventario(cejas,"listaCejas");

}



function disminuirCeja(){

    let nombre = prompt("Producto:");

    let cantidad = Number(prompt("Cantidad:"));


    disminuirStock(
        cejas,
        nombre,
        cantidad
    );


    guardarInventario(pestanas,cejas,unas);


    mostrarInventario(cejas,"listaCejas");

}



//================ CARGAR AL INICIAR =================


window.onload = function(){

    cargarDatos();

};




function cargarDatos(){

    let datos = localStorage.getItem("inventario");


    if(datos == null)
        return;


    datos = JSON.parse(datos);


    pestanas = arrayALista(datos.pestanas);

    unas = arrayALista(datos.unas);

    cejas = arrayALista(datos.cejas);

}




function arrayALista(array){

    let lista = null;


    if(array == null)
        return null;


    for(let i = 0; i < array.length; i++){

        lista = agregarProducto(
            lista,
            array[i].nombre,
            array[i].cantidad
        );

    }


    return lista;

}