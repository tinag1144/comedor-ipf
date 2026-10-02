import { Stack } from "expo-router";

export default function CarritoLayout() {
  return (
    <Stack>
      {/*
        index representa /carrito.
        Después agregaremos nota.tsx
        para crear /carrito/nota.
      */}
      <Stack.Screen
        name="index"
        options={{
          title: "Carrito",
        }}
      />
    </Stack>
  );
}
