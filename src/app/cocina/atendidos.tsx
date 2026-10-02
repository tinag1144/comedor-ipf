import { Stack } from 'expo-router';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useApp } from '@/context/AppContext';
import DondeEstoy from '@/components/DondeEstoy';

export default function AtendidosScreen() {
  const { pedidosAtendidos } = useApp();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen
        options={{
          title: 'Pedidos atendidos',
        }}
      />

      <Text style={styles.titulo}>
        Pedidos atendidos
      </Text>

      {pedidosAtendidos.length === 0 ? (
        <Text>
          Todavía no hay pedidos atendidos.
        </Text>
      ) : (
        pedidosAtendidos.map((pedido) => (
          <View
            key={pedido.numero}
            style={styles.pedido}
          >
            <Text style={styles.numero}>
              Pedido #{pedido.numero}
            </Text>

            {pedido.items.map((plato, indice) => (
              <Text key={`${plato.id}-${indice}`}>
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
  container: {
    padding: 20,
    gap: 15,
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
  },

  pedido: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 10,
  },

  numero: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});