import DondeEstoy from '@/components/DondeEstoy';
import { Link, Stack } from 'expo-router';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function AyudaScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen
        options={{
          title: 'Ayuda',
        }}
      />

      <Text style={styles.titulo}>Centro de ayuda</Text>

      <Text style={styles.descripcion}>
        Elegí un tema para ver más información.
      </Text>

      <View style={styles.lista}>
        <Link
          href={{
            pathname: '/ayuda/[...slug]',
            params: {
              slug: ['pagos', 'efectivo'],
            },
          }}
          style={styles.link}
        >
          Pagos en efectivo
        </Link>

        <Link
          href={{
            pathname: '/ayuda/[...slug]',
            params: {
              slug: ['pagos', 'tarjeta'],
            },
          }}
          style={styles.link}
        >
          Pagos con tarjeta
        </Link>

        <Link
          href={{
            pathname: '/ayuda/[...slug]',
            params: {
              slug: ['horarios'],
            },
          }}
          style={styles.link}
        >
          Horarios del comedor
        </Link>

        <Link
          href={{
            pathname: '/ayuda/[...slug]',
            params: {
              slug: ['pedidos', 'cancelacion'],
            },
          }}
          style={styles.link}
        >
          Cancelación de pedidos
        </Link>
      </View>
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

  descripcion: {
    fontSize: 16,
    color: '#666666',
  },

  lista: {
    gap: 12,
  },

  link: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 10,
    color: '#118ab2',
    fontWeight: '600',
  },
});