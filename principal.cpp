#include <iostream>
#include "inventario.h"

using namespace std;

int main() {

    ListaProductos pestanas = crearLista();
    ListaProductos cejas = crearLista();
    ListaProductos unas = crearLista();

    cargarInventario(pestanas, cejas, unas);

    menuPrincipal(pestanas, cejas, unas);

    guardarInventario(pestanas, cejas, unas);

    liberarLista(pestanas);
    liberarLista(cejas);
    liberarLista(unas);

    return 0;
}