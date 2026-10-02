import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { useApp } from "@/context/AppContext";

export default function CarritoScreen() {
  const { carrito, deshacerUltimo, puedeDeshacer } = useApp();

  // Calculamos el total sumando el precio de todos los platos.
  const total = carrito.reduce(
    (acumulador, plato) => acumulador + plato.precio,
    0,
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Carrito</Text>

      {/* Si no hay platos mostramos un mensaje */}
      {carrito.length === 0 ? (
        <Text>El carrito está vacío.</Text>
      ) : (
        <>
          {/* Recorremos los platos agregados */}
          {carrito.map((plato, indice) => (
            <View key={`${plato.id}-${indice}`} style={styles.item}>
              <View>
                <Text style={styles.nombre}>{plato.nombre}</Text>

                <Text style={styles.descripcion}>{plato.descripcion}</Text>
              </View>

              <Text style={styles.precio}>${plato.precio}</Text>
            </View>
          ))}

          <View style={styles.totalContainer}>
            <Text style={styles.totalTexto}>Total</Text>
            <Text style={styles.totalPrecio}>${total}</Text>
          </View>
        </>
      )}

      <Pressable
        style={[
          styles.botonDeshacer,
          !puedeDeshacer && styles.botonDeshabilitado,
        ]}
        onPress={deshacerUltimo}
        disabled={!puedeDeshacer}
      >
        <Text style={styles.textoBoton}>Deshacer último</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 15,
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
  },

  item: {
    borderWidth: 1,
    borderColor: "#dddddd",
    borderRadius: 10,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 15,
  },

  nombre: {
    fontSize: 18,
    fontWeight: "600",
  },

  descripcion: {
    marginTop: 4,
    color: "#666666",
  },

  precio: {
    fontWeight: "bold",
  },

  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#dddddd",
  },

  totalTexto: {
    fontSize: 20,
    fontWeight: "bold",
  },

  totalPrecio: {
    fontSize: 20,
    fontWeight: "bold",
  },

  botonDeshacer: {
    backgroundColor: "#ef476f",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  botonDeshabilitado: {
    opacity: 0.4,
  },

  textoBoton: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
