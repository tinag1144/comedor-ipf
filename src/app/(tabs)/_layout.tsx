import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';

import { COLORES } from '@/constants/theme';
import { useApp } from '@/context/AppContext';

export default function TabsLayout() {
  const { carrito } = useApp();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORES.verde,
        tabBarInactiveTintColor: COLORES.textoSecundario,

        tabBarStyle: {
          backgroundColor: COLORES.cremaClaro,
          borderTopColor: COLORES.borde,
          height: 68,
          paddingTop: 7,
          paddingBottom: 8,
        },

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },

        headerStyle: {
          backgroundColor: COLORES.azul,
        },

        headerTintColor: COLORES.crema,

        headerTitleStyle: {
          fontWeight: '700',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          headerShown: false,

          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="home"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menú',
          headerShown: false,

          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="restaurant"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="carrito"
        options={{
          title: 'Carrito',
          headerShown: false,

          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="cart"
              color={color}
              size={size}
            />
          ),

          tabBarBadge:
            carrito.length > 0
              ? carrito.length
              : undefined,

          tabBarBadgeStyle: {
            backgroundColor: COLORES.verde,
            color: COLORES.blanco,
          },
        }}
      />
    </Tabs>
  );
}