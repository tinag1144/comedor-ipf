import { Stack, useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useApp } from "@/context/AppContext";
import { platos } from "@/data/plato";
export default function DetallePlatoScreen() {
  // Lee el parámetro dinámico de la URL.
  // Ejemplo: /menu/4 -> id = "4"
  const { id } = useLocalSearchParams<{ id: string }>();

  // Los parámetros llegan como texto, por eso lo convertimos a number.
  const idNumerico = Number(id);

  // Buscamos el plato cuyo id coincida.
  const plato = platos.find((p) => p.id === idNumerico);

  // Traemos la función global del Context.
  const { agregarAlCarrito } = useApp();

  // Si el plato no existe, mostramos un mensaje.
  if (!plato) {
    return (
      <View style={styles.container}>
        <Stack.Screen
          options={{
            title: "Plato no encontrado",
          }}
        />

        <Text style={styles.titulo}>Plato no encontrado</Text>
        <Text>No existe un plato con el id {id}.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Cambiamos el título del header según el plato */}
      <Stack.Screen
        options={{
          title: plato.nombre,
        }}
      />

      <Text style={styles.titulo}>{plato.nombre}</Text>

      <Text style={styles.categoria}>Categoría: {plato.categoria}</Text>

      <Text style={styles.descripcion}>{plato.descripcion}</Text>

      <Text style={styles.precio}>${plato.precio}</Text>

      {/* Al tocar el botón llamamos a la función global */}
      <Pressable style={styles.boton} onPress={() => agregarAlCarrito(plato)}>
        <Text style={styles.textoBoton}>Agregar al carrito</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },

  categoria: {
    fontSize: 16,
    marginBottom: 10,
  },

  descripcion: {
    fontSize: 16,
    marginBottom: 20,
  },

  precio: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 30,
  },

  boton: {
    backgroundColor: "#118ab2",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
  },

  textoBoton: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
