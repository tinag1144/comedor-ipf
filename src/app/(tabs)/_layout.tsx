import { Tabs } from 'expo-router';

import { useApp } from '@/context/AppContext';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabsLayout() {
  const { carrito } = useApp();

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
        }}
      />

      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menú',
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="carrito"
        options={{
          title: 'Carrito',
          headerShown: false,

          tabBarBadge:
            carrito.length > 0
              ? carrito.length
              : undefined,
        }}
      />
    </Tabs>
  );
}