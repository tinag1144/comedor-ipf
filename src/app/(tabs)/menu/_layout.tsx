import { Stack } from "expo-router";

export default function MenuLayout() {
  return (
    <Stack>
      {/*
        index representa la ruta /menu.
        Más adelante agregaremos [id].tsx
        para rutas como /menu/1, /menu/2, etc.
      */}
      <Stack.Screen
        name="index"
        options={{
          title: "Menú",
        }}
      />
    </Stack>
  );
}
