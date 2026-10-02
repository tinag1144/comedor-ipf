import Ionicons from '@expo/vector-icons/Ionicons';
import { Stack } from 'expo-router';

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import DondeEstoy from '@/components/DondeEstoy';
import { COLORES, SOMBRA } from '@/constants/theme';
import { useApp } from '@/context/AppContext';

export default function AtendidosScreen() {
  const { pedidosAtendidos } = useApp();

  return (
    <ScrollView
      style={styles.pantalla}
      contentContainerStyle={styles.container}
    >
      <Stack.Screen
        options={{
          title: 'Pedidos atendidos',
        }}
      />

      <Text style={styles.titulo}>
        Pedidos atendidos
      </Text>

      <Text style={styles.descripcion}>
        Los últimos pedidos aparecen primero.
      </Text>

      {pedidosAtendidos.length === 0 ? (
        <View style={styles.vacio}>
          <Ionicons
            name="checkmark-done-outline"
            size={48}
            color={COLORES.textoSecundario}
          />

          <Text style={styles.vacioTexto}>
            Todavía no hay pedidos atendidos.
          </Text>
        </View>
      ) : (
        pedidosAtendidos.map((pedido) => (
          <View
            key={pedido.numero}
            style={styles.pedido}
          >
            <View style={styles.headerPedido}>
              <View>
                <Text style={styles.numero}>
                  Pedido #{pedido.numero}
                </Text>

                <Text style={styles.estado}>
                  Atendido
                </Text>
              </View>

              <Ionicons
                name="checkmark-circle"
                size={30}
                color={COLORES.verde}
              />
            </View>

            {pedido.items.map((plato, indice) => (
              <Text
                key={`${plato.id}-${indice}`}
                style={styles.item}
              >
                • {plato.nombre}
              </Text>
            ))}
          </View>
        ))
      )}

      <DondeEstoy />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pantalla: {
    backgroundColor: COLORES.crema,
  },

  container: {
    padding: 20,
    gap: 14,
  },

  titulo: {
    fontSize: 29,
    fontWeight: '800',
    color: COLORES.texto,
  },

  descripcion: {
    color: COLORES.textoSecundario,
    marginBottom: 5,
  },

  pedido: {
    padding: 18,
    borderRadius: 18,
    backgroundColor: COLORES.blanco,
    ...SOMBRA,
  },

  headerPedido: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  numero: {
    fontSize: 19,
    fontWeight: '800',
    color: COLORES.texto,
  },

  estado: {
    marginTop: 2,
    color: COLORES.verdeOscuro,
    fontWeight: '600',
  },

  item: {
    marginTop: 3,
    color: COLORES.textoSecundario,
  },

  vacio: {
    alignItems: 'center',
    padding: 35,
    borderRadius: 18,
    backgroundColor: COLORES.blanco,
  },

  vacioTexto: {
    marginTop: 12,
    color: COLORES.textoSecundario,
  },
});