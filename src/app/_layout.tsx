import { Stack } from "expo-router";

import { AppProvider } from "@/context/AppContext";

export default function RootLayout() {
  return (
    <AppProvider>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="confirmar"
          options={{
            title: "Confirmar pedido",
            presentation: "modal",
          }}
        />
      </Stack>
    </AppProvider>
  );
}
