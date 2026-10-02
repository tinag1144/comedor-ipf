import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { AppProvider, useApp } from '@/context/AppContext';

function NavegacionRaiz() {
  // Si usuario tiene un valor, hay una sesión iniciada.
  const { usuario } = useApp();

  const conSesion = usuario !== null;

  return (
    <Stack>
      {/* Navegación principal del alumno */}
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />

      {/* Modal para revisar el pedido antes de confirmarlo */}
      <Stack.Screen
        name="confirmar"
        options={{
          title: 'Confirmar pedido',
          presentation: 'modal',
        }}
      />

      {/* Pantalla dinámica del turno */}
      <Stack.Screen
        name="turno/[numero]"
        options={{
          title: 'Turno',
        }}
      />

      {/*
        Cocina solamente existe cuando
        hay una sesión iniciada.
      */}
      <Stack.Protected guard={conSesion}>
        <Stack.Screen
          name="cocina"
          options={{
            // Ocultamos el header del Stack raíz
            // porque el Drawer tendrá su propio header.
            headerShown: false,
          }}
        />
      </Stack.Protected>

      {/*
        Login solamente existe cuando
        NO hay una sesión iniciada.
      */}
      <Stack.Protected guard={!conSesion}>
        <Stack.Screen
          name="login"
          options={{
            title: 'Login cocina',
            presentation: 'modal',
          }}
        />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    /*
      GestureHandlerRootView permite que funcionen
      correctamente los gestos usados por el Drawer.
    */
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/*
        AppProvider envuelve toda la aplicación.

        De esta forma todas las pantallas pueden
        acceder al Context global.
      */}
      <AppProvider>
        <NavegacionRaiz />
      </AppProvider>
    </GestureHandlerRootView>
  );
}