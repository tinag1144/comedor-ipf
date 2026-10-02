import { Drawer } from 'expo-router/drawer';

export default function CocinaLayout() {
  return (
    <Drawer>
      {/*
        index.tsx representa la ruta /cocina.

        Esta va a ser la pantalla principal
        donde vemos el pedido que está al frente
        de la cola.
      */}
      <Drawer.Screen
        name="index"
        options={{
          title: 'Cocina',
          drawerLabel: 'Pedido actual',
        }}
      />

      {/*
        atendidos.tsx representa:

        /cocina/atendidos

        Aparece como otra opción dentro
        del menú lateral.
      */}
      <Drawer.Screen
        name="atendidos"
        options={{
          title: 'Pedidos atendidos',
          drawerLabel: 'Pedidos atendidos',
        }}
      />
    </Drawer>
  );
}