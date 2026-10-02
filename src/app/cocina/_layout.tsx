import Ionicons from '@expo/vector-icons/Ionicons';
import { Drawer } from 'expo-router/drawer';

import { COLORES } from '@/constants/theme';

export default function CocinaLayout() {
  return (
    <Drawer
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORES.azul,
        },

        headerTintColor: COLORES.crema,

        drawerActiveTintColor: COLORES.verde,
        drawerInactiveTintColor: COLORES.texto,

        drawerActiveBackgroundColor:
          COLORES.verdeClaro,

        drawerStyle: {
          backgroundColor: COLORES.cremaClaro,
        },
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          title: 'Cocina',
          drawerLabel: 'Pedido actual',

          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="restaurant"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="atendidos"
        options={{
          title: 'Pedidos atendidos',
          drawerLabel: 'Pedidos atendidos',

          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="checkmark-circle"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Drawer>
  );
}