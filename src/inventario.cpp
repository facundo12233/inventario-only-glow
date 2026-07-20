#include <fstream>
#include "inventario.h"
#include <iostream>
#include <cstring>

using namespace std;
//====================================================
// ESTRUCTURAS
//====================================================

const int MAXC = 50;

struct rep_producto{
    char nombre[MAXC];
    int cantidad;
};

struct rep_nodo{
    Producto producto;
    ListaProductos ant;
    ListaProductos sig;
};
//==================== MENÚS ====================

void menuPrincipal(ListaProductos &pestanas,
                   ListaProductos &cejas,
                   ListaProductos &unas)
{
    int opcion;

    do{
        printf("\n===== INVENTARIO =====\n");
        printf("1. Pestañas\n");
        printf("2. Cejas\n");
        printf("3. Uñas\n");
        printf("4. Salir\n");
        printf("Opcion: ");
        scanf("%d", &opcion);

        switch(opcion){
            case 1:
                menuPestanas(pestanas);
                break;

            case 2:
                menuCejas(cejas);
                break;

            case 3:
                menuUnas(unas);
                break;

            case 4:
                printf("Saliendo...\n");
                break;

            default:
                printf("Opcion invalida.\n");
        }

    }while(opcion != 4);
}

void menuPestanas(ListaProductos &pestanas)
{
    int opcion;

    do{
        printf("\n===== PESTAÑAS =====\n");
        printf("1. Mostrar inventario\n");
        printf("2. Agregar producto\n");
        printf("3. Eliminar producto\n");
        printf("4. Modificar cantidad\n");
        printf("5. Aumentar stock\n");
        printf("6. Disminuir stock\n");
        printf("7. Volver\n");
        printf("Opcion: ");
        scanf("%d", &opcion);

        switch(opcion){

            case 1:
                mostrarInventario(pestanas);
                break;

            case 2:{
                char nombre[MAXC];
                int cantidad;

                printf("Nombre: ");
                scanf("%s", nombre);

                printf("Cantidad: ");
                scanf("%d", &cantidad);

                agregarProducto(pestanas, nombre, cantidad);
                break;
            }

            case 3:{
                char nombre[MAXC];

                printf("Nombre a eliminar: ");
                scanf("%s", nombre);

                eliminarProducto(pestanas, nombre);
                break;
            }

            case 4:{
                char nombre[MAXC];
                int cantidad;

                printf("Nombre: ");
                scanf("%s", nombre);

                printf("Nueva cantidad: ");
                scanf("%d", &cantidad);

                modificarCantidad(pestanas, nombre, cantidad);
                break;
            }

            case 5:{
                char nombre[MAXC];
                int cantidad;

                printf("Nombre: ");
                scanf("%s", nombre);

                printf("Cantidad a aumentar: ");
                scanf("%d", &cantidad);

                aumentarStock(pestanas, nombre, cantidad);
                break;
            }

            case 6:{
                char nombre[MAXC];
                int cantidad;

                printf("Nombre: ");
                scanf("%s", nombre);

                printf("Cantidad a disminuir: ");
                scanf("%d", &cantidad);

                disminuirStock(pestanas, nombre, cantidad);
                break;
            }

            case 7:
                break;

            default:
                printf("Opcion invalida.\n");
        }

    }while(opcion != 7);
}



void menuCejas(ListaProductos &cejas)
{
    int opcion;

    do{
        printf("\n===== CEJAS =====\n");
        printf("1. Mostrar inventario\n");
        printf("2. Agregar producto\n");
        printf("3. Eliminar producto\n");
        printf("4. Modificar cantidad\n");
        printf("5. Aumentar stock\n");
        printf("6. Disminuir stock\n");
        printf("7. Volver\n");
        printf("Opcion: ");
        scanf("%d", &opcion);

        switch(opcion){

            case 1:
                mostrarInventario(cejas);
                break;

            case 2:{
                char nombre[MAXC];
                int cantidad;

                printf("Nombre: ");
                scanf("%s", nombre);

                printf("Cantidad: ");
                scanf("%d", &cantidad);

                agregarProducto(cejas, nombre, cantidad);
                break;
            }

            case 3:{
                char nombre[MAXC];

                printf("Nombre a eliminar: ");
                scanf("%s", nombre);

                eliminarProducto(cejas, nombre);
                break;
            }

            case 4:{
                char nombre[MAXC];
                int cantidad;

                printf("Nombre: ");
                scanf("%s", nombre);

                printf("Nueva cantidad: ");
                scanf("%d", &cantidad);

                modificarCantidad(cejas, nombre, cantidad);
                break;
            }

            case 5:{
                char nombre[MAXC];
                int cantidad;

                printf("Nombre: ");
                scanf("%s", nombre);

                printf("Cantidad a aumentar: ");
                scanf("%d", &cantidad);

                aumentarStock(cejas, nombre, cantidad);
                break;
            }

            case 6:{
                char nombre[MAXC];
                int cantidad;

                printf("Nombre: ");
                scanf("%s", nombre);

                printf("Cantidad a disminuir: ");
                scanf("%d", &cantidad);

                disminuirStock(cejas, nombre, cantidad);
                break;
            }

            case 7:
                break;

            default:
                printf("Opcion invalida.\n");
        }

    }while(opcion != 7);
}



void menuUnas(ListaProductos &unas)
{
    int opcion;

    do{
        printf("\n===== UÑAS =====\n");
        printf("1. Mostrar inventario\n");
        printf("2. Agregar producto\n");
        printf("3. Eliminar producto\n");
        printf("4. Modificar cantidad\n");
        printf("5. Aumentar stock\n");
        printf("6. Disminuir stock\n");
        printf("7. Volver\n");
        printf("Opcion: ");
        scanf("%d", &opcion);

        switch(opcion){

            case 1:
                mostrarInventario(unas);
                break;

            case 2:{
                char nombre[MAXC];
                int cantidad;

                printf("Nombre: ");
                scanf("%s", nombre);

                printf("Cantidad: ");
                scanf("%d", &cantidad);

                agregarProducto(unas, nombre, cantidad);
                break;
            }

            case 3:{
                char nombre[MAXC];

                printf("Nombre a eliminar: ");
                scanf("%s", nombre);

                eliminarProducto(unas, nombre);
                break;
            }

            case 4:{
                char nombre[MAXC];
                int cantidad;

                printf("Nombre: ");
                scanf("%s", nombre);

                printf("Nueva cantidad: ");
                scanf("%d", &cantidad);

                modificarCantidad(unas, nombre, cantidad);
                break;
            }

            case 5:{
                char nombre[MAXC];
                int cantidad;

                printf("Nombre: ");
                scanf("%s", nombre);

                printf("Cantidad a aumentar: ");
                scanf("%d", &cantidad);

                aumentarStock(unas, nombre, cantidad);
                break;
            }

            case 6:{
                char nombre[MAXC];
                int cantidad;

                printf("Nombre: ");
                scanf("%s", nombre);

                printf("Cantidad a disminuir: ");
                scanf("%d", &cantidad);

                disminuirStock(unas, nombre, cantidad);
                break;
            }

            case 7:
                break;

            default:
                printf("Opcion invalida.\n");
        }

    }while(opcion != 7);
}


//==================== CREAR / LIBERAR ====================

ListaProductos crearLista(){
return NULL;
}

void liberarLista(ListaProductos &l){

ListaProductos  aux=l;

while(aux!=NULL){
ListaProductos  aux1=aux;
aux=aux->sig;
delete aux1;}
l = NULL;
}


//==================== MOSTRAR ====================

void mostrarInventario(ListaProductos l){
ListaProductos aux=l;
while (aux != NULL){
    mostrarProducto(aux->producto);
    aux = aux->sig;
}
}
void mostrarProducto(Producto p){
printf("%s  ", p->nombre);
printf("%d\n", p->cantidad);
}

void mostrarCantidades(ListaProductos l){
    ListaProductos aux = l;

    while(aux != NULL){
        mostrarProducto(aux->producto);
        aux = aux->sig;
    }
}


int totalStock(ListaProductos l){
ListaProductos aux = l;
int suma=0;
while (aux!= NULL){
suma=suma+aux->producto->cantidad;
aux=aux->sig;}
return suma;
}


//==================== ALTAS ====================

void agregarProducto(ListaProductos &l, char nombre[MAXC], int cantidad){
    ListaProductos nuevo = new rep_nodo;
    nuevo->producto = new rep_producto;

    strcpy(nuevo->producto->nombre, nombre);
    nuevo->producto->cantidad = cantidad;

    nuevo->ant = NULL;
    nuevo->sig = l;

    if (l != NULL)
        l->ant = nuevo;

    l = nuevo;
}
//==================== BAJAS ====================
void eliminarProducto(ListaProductos &l, char nombre[MAXC]){
    ListaProductos aux = l;

    while (aux != NULL){

        if (strcmp(aux->producto->nombre, nombre) == 0){

            // Primer nodo
            if (aux->ant == NULL){
                l = aux->sig;

                if (l != NULL)
                    l->ant = NULL;

                delete aux;
                return;
            }

            // Último nodo
            else if (aux->sig == NULL){
                aux->ant->sig = NULL;
                delete aux;
                return;
            }

            // Nodo del medio
            else{
                aux->ant->sig = aux->sig;
                aux->sig->ant = aux->ant;
                delete aux;
                return;
            }
        }

        aux = aux->sig;
    }
}


//==================== MODIFICACIONES ====================


void modificarCantidad(ListaProductos &l, char nombre[MAXC],int nuevaCantidad){
ListaProductos aux = l;
while (aux!= NULL){

//caso en el que sea igual
if (strcmp(aux->producto->nombre, nombre) == 0) {
    aux->producto->cantidad=nuevaCantidad;
    return ;
    }


else 
aux=aux->sig;
}
}

void aumentarStock(ListaProductos &l,char nombre[MAXC],int cantidad){
ListaProductos aux = l;
while (aux!= NULL){

//caso en el que sea igual
if (strcmp(aux->producto->nombre, nombre) == 0) {
    aux->producto->cantidad=aux->producto->cantidad+cantidad;
    return ;
    }


else 
aux=aux->sig;
}
}


void disminuirStock(ListaProductos &l,char nombre[MAXC],int cantidad){
ListaProductos aux = l;
while (aux!= NULL){

//caso en el que sea igual
if (strcmp(aux->producto->nombre, nombre) == 0) {
    aux->producto->cantidad=aux->producto->cantidad-cantidad;
    return ;
    }


else 
aux=aux->sig;
}
}



//==================== BÚSQUEDAS ====================

bool existeProducto(ListaProductos l,char nombre[MAXC]){
ListaProductos aux = l;
while (aux!= NULL){

//caso en el que sea igual
if (strcmp(aux->producto->nombre, nombre) == 0) {
    return true;
    }


else 
aux=aux->sig;
}

return false;

}

Producto buscarProducto(ListaProductos l,char nombre[MAXC]){
ListaProductos aux = l;
while (aux!= NULL){

//caso en el que sea igual
if (strcmp(aux->producto->nombre, nombre) == 0) {
    return aux->producto;
    }
else 
aux=aux->sig;
  }
return NULL;
  }

//==================== CONSULTAS ====================

void mostrarStockBajo(ListaProductos l,int minimo){
    ListaProductos aux = l;
while (aux!= NULL){
    if(aux->producto->cantidad<minimo)
    mostrarProducto(aux->producto);
    
    aux=aux->sig;
 }
 return;
 }
void guardarInventario(ListaProductos pestanas,
                       ListaProductos cejas,
                       ListaProductos unas)
{
    ofstream arch("inventario.txt");

    ListaProductos aux;

    arch << "PESTANAS" << endl;
    aux = pestanas;
    while(aux != NULL){
        arch << aux->producto->nombre << " "
             << aux->producto->cantidad << endl;
        aux = aux->sig;
    }

    arch << "#" << endl;

    arch << "CEJAS" << endl;
    aux = cejas;
    while(aux != NULL){
        arch << aux->producto->nombre << " "
             << aux->producto->cantidad << endl;
        aux = aux->sig;
    }

    arch << "#" << endl;

    arch << "UNAS" << endl;
    aux = unas;
    while(aux != NULL){
        arch << aux->producto->nombre << " "
             << aux->producto->cantidad << endl;
        aux = aux->sig;
    }

    arch.close();
}

void cargarInventario(ListaProductos &pestanas,
                      ListaProductos &cejas,
                      ListaProductos &unas)
{
    ifstream arch("inventario.txt");

    if(!arch.is_open())
        return;

    char palabra[50];
    char nombre[50];
    int cantidad;

    ListaProductos *listaActual = NULL;

    while(arch >> palabra){

        if(strcmp(palabra,"PESTANAS")==0){
            listaActual=&pestanas;
        }
        else if(strcmp(palabra,"CEJAS")==0){
            listaActual=&cejas;
        }
        else if(strcmp(palabra,"UNAS")==0){
            listaActual=&unas;
        }
        else if(strcmp(palabra,"#")==0){
        }
        else{
            strcpy(nombre,palabra);
            arch>>cantidad;

            agregarProducto(*listaActual,nombre,cantidad);
        }
    }

    arch.close();
}