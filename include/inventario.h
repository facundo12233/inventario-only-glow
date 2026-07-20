#ifndef INVENTARIO_H
#define INVENTARIO_H

//====================================================
// TIPOS
//====================================================

typedef struct rep_producto *Producto;
typedef struct rep_nodo *ListaProductos;

//====================================================
// CREAR Y LIBERAR
//====================================================

ListaProductos crearLista();
void liberarLista(ListaProductos &l);

//====================================================
// MENÚS
//====================================================

void menuPrincipal(ListaProductos &pestanas,
                   ListaProductos &cejas,
                   ListaProductos &unas);

void menuPestanas(ListaProductos &pestanas);
void menuCejas(ListaProductos &cejas);
void menuUnas(ListaProductos &unas);

//====================================================
// CARGA INICIAL
//====================================================

//====================================================
// MOSTRAR
//====================================================

void mostrarInventario(ListaProductos l);
void mostrarProducto(Producto p);
void mostrarCantidades(ListaProductos l);
int totalStock(ListaProductos l);

//====================================================
// ALTAS
//====================================================

void agregarProducto(ListaProductos &l, char nombre[], int cantidad);

//====================================================
// BAJAS
//====================================================

void eliminarProducto(ListaProductos &l, char nombre[]);

//====================================================
// MODIFICACIONES
//====================================================

void modificarCantidad(ListaProductos &l, char nombre[], int nuevaCantidad);
void aumentarStock(ListaProductos &l, char nombre[], int cantidad);
void disminuirStock(ListaProductos &l, char nombre[], int cantidad);

//====================================================
// BÚSQUEDAS
//====================================================

bool existeProducto(ListaProductos l, char nombre[]);
Producto buscarProducto(ListaProductos l, char nombre[]);

//====================================================
// CONSULTAS
//====================================================

void mostrarStockBajo(ListaProductos l, int minimo);
void guardarInventario(ListaProductos pestanas,
                       ListaProductos cejas,
                       ListaProductos unas);

void cargarInventario(ListaProductos &pestanas,
                      ListaProductos &cejas,
                      ListaProductos &unas);

#endif