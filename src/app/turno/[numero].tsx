import { Stack, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { useApp } from "@/context/AppContext";

export default function TurnoScreen() {
  /*
    Leemos el parámetro dinámico de la URL.

    Ejemplo:
    /turno/3

    entonces:
    numero = "3"
  */
  const { numero } = useLocalSearchParams<{ numero: string }>();

  /*
    Los parámetros de URL llegan como texto,
    por eso lo convertimos a number.
  */
  const numeroTurno = Number(numero);

  /*
    Obtenemos todos los pedidos que siguen
    esperando en la cola.
  */
  const { pedidosEnEspera } = useApp();

  /*
    Buscamos en qué posición está este pedido.

    findIndex devuelve:
    0 si está primero
    1 si está segundo
    2 si está tercero
    etc.
  */
  const posicion = pedidosEnEspera.findIndex(
    (pedido) => pedido.numero === numeroTurno,
  );

  /*
    La cantidad de pedidos que hay adelante
    coincide con su posición dentro de la cola.

    Ejemplo:
    posición 0 -> 0 adelante
    posición 1 -> 1 adelante
    posición 2 -> 2 adelante
  */
  const pedidosAdelante = posicion >= 0 ? posicion : 0;

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: `Turno ${numeroTurno}`,
        }}
      />

      <Text style={styles.titulo}>Pedido confirmado</Text>

      <Text style={styles.subtitulo}>Tu número de turno es:</Text>

      <Text style={styles.numero}>{numeroTurno}</Text>

      <Text style={styles.info}>
        Tenés {pedidosAdelante} {pedidosAdelante === 1 ? "pedido" : "pedidos"}{" "}
        adelante.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  subtitulo: {
    fontSize: 18,
    marginBottom: 10,
  },

  numero: {
    fontSize: 64,
    fontWeight: "bold",
    color: "#118ab2",
    marginBottom: 20,
  },

  info: {
    fontSize: 18,
    textAlign: "center",
  },
});
