import { Stack, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { platos } from "@/data/plato";
export default function DetallePlatoScreen() {
  // Leemos el parámetro dinámico de la URL.
  // Ejemplo: /menu/4  ->  id = "4"
  const { id } = useLocalSearchParams<{ id: string }>();

  // Los parámetros de URL llegan como texto.
  // Como nuestros platos tienen id numérico, lo convertimos.
  const idNumerico = Number(id);

  // find() busca el primer plato cuyo id coincida.
  // Si no encuentra ninguno, devuelve undefined.
  const plato = platos.find((p) => p.id === idNumerico);

  // Validamos si el plato existe.
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
      {/* Cambiamos dinámicamente el título del header */}
      <Stack.Screen
        options={{
          title: plato.nombre,
        }}
      />

      <Text style={styles.titulo}>{plato.nombre}</Text>

      <Text style={styles.categoria}>Categoría: {plato.categoria}</Text>

      <Text style={styles.descripcion}>{plato.descripcion}</Text>

      <Text style={styles.precio}>${plato.precio}</Text>

      {/* El botón "Agregar al carrito" lo hacemos después,
          cuando creemos el estado global. */}
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
  },
});
