import DondeEstoy from '@/components/DondeEstoy';
import { Stack, useLocalSearchParams } from 'expo-router';
import {
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';

export default function ArticuloAyudaScreen() {
  /*
    [...slug] es una ruta catch-all.

    Puede recibir una o varias partes.

    Ejemplos:
    /ayuda/horarios

    slug = ["horarios"]

    /ayuda/pagos/efectivo

    slug = ["pagos", "efectivo"]
  */
  const { slug } = useLocalSearchParams<{
    slug?: string[];
  }>();

  const partes = slug ?? [];

  const ruta = partes.join('/');

  let titulo = 'Artículo de ayuda';
  let contenido = 'No hay información para este tema.';

  /*
    Según la ruta recibida elegimos
    qué información mostrar.
  */
  if (ruta === 'pagos/efectivo') {
    titulo = 'Pagos en efectivo';
    contenido =
      'El pedido puede abonarse en efectivo al momento de retirarlo.';
  }

  if (ruta === 'pagos/tarjeta') {
    titulo = 'Pagos con tarjeta';
    contenido =
      'Consultá en el comedor si el pago con tarjeta se encuentra disponible.';
  }

  if (ruta === 'horarios') {
    titulo = 'Horarios del comedor';
    contenido =
      'Los horarios del comedor pueden consultarse en el Instituto.';
  }

  if (ruta === 'pedidos/cancelacion') {
    titulo = 'Cancelación de pedidos';
    contenido =
      'Una vez confirmado el pedido, consultá con el personal de cocina para realizar una cancelación.';
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
<Stack.Screen
  options={{
    title: titulo,
  }}
/>

      <Text style={styles.titulo}>{titulo}</Text>

      <Text style={styles.contenido}>
        {contenido}
      </Text>

      <Text style={styles.ruta}>
        Ruta recibida: {ruta}
      </Text>
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

  contenido: {
    fontSize: 16,
    lineHeight: 24,
  },

  ruta: {
    marginTop: 20,
    color: '#666666',
  },
});