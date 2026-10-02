import { router, Stack } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { useApp } from "@/context/AppContext";
import DondeEstoy from "@/components/DondeEstoy";

export default function ConfirmarScreen() {
  const { carrito, nota, confirmarPedido } = useApp();

  const total = carrito.reduce(
    (acumulador, plato) => acumulador + plato.precio,
    0,
  );

  function confirmar() {
    const numero = confirmarPedido();

    if (numero === null) {
      return;
    }

    router.replace({
      pathname: "/turno/[numero]",
      params: {
        numero: numero.toString(),
      },
    });
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen
        options={{
          title: "Confirmar pedido",
        }}
      />

      <Text style={styles.titulo}>Resumen del pedido</Text>

      {carrito.length === 0 ? (
        <Text>No hay platos para confirmar.</Text>
      ) : (
        <>
          {carrito.map((plato, indice) => (
            <View key={`${plato.id}-${indice}`} style={styles.item}>
              <Text style={styles.nombre}>{plato.nombre}</Text>
              <Text>${plato.precio}</Text>
            </View>
            
          ))}
          

          {nota ? (
            <View style={styles.notaContainer}>
              <Text style={styles.subtitulo}>Nota</Text>
              <Text>{nota}</Text>
            </View>
          ) : null}

          <View style={styles.totalContainer}>
            <Text style={styles.total}>Total</Text>
            <Text style={styles.total}>${total}</Text>
          </View>

          <Pressable style={styles.boton} onPress={confirmar}>
            <Text style={styles.textoBoton}>Confirmar</Text>
          </Pressable>
        </>
        
      )}
      <DondeEstoy />
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
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#dddddd",
    paddingVertical: 10,
  },

  nombre: {
    fontWeight: "600",
  },

  notaContainer: {
    padding: 15,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
  },

  subtitulo: {
    fontWeight: "bold",
    marginBottom: 5,
  },

  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  total: {
    fontSize: 20,
    fontWeight: "bold",
  },

  boton: {
    backgroundColor: "#06d6a0",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  textoBoton: {
    color: "#073b4c",
    fontWeight: "bold",
    fontSize: 16,
  },
});
