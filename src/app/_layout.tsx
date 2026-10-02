import { Stack } from 'expo-router';

import { AppProvider, useApp } from '@/context/AppContext';

function NavegacionRaiz() {
  // Leemos el usuario desde el Context global.
  const { usuario } = useApp();

  // Si usuario no es null, hay sesión iniciada.
  const conSesion = usuario !== null;

  return (
    <Stack>
      {/* La navegación principal siempre existe */}
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />

      {/* Confirmar pedido se presenta como modal */}
      <Stack.Screen
        name="confirmar"
        options={{
          title: 'Confirmar pedido',
          presentation: 'modal',
        }}
      />

      {/* Turno pertenece al Stack raíz */}
      <Stack.Screen
        name="turno/[numero]"
        options={{
          title: 'Turno',
        }}
      />

      {/*
        Estas rutas SOLO existen cuando hay sesión.

        Si conSesion es false, Expo Router las elimina
        de la navegación.
      */}
      <Stack.Protected guard={conSesion}>
        <Stack.Screen
          name="cocina"
          options={{
            headerShown: false,
          }}
        />
      </Stack.Protected>

      {/*
        Login SOLO existe cuando NO hay sesión.

        El signo ! significa "negación".
        !conSesion = no hay sesión.
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
    <AppProvider>
      <NavegacionRaiz />
    </AppProvider>
  );
}