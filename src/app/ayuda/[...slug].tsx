import Ionicons from '@expo/vector-icons/Ionicons';
import {
  Stack,
  useLocalSearchParams,
} from 'expo-router';

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import DondeEstoy from '@/components/DondeEstoy';
import { COLORES, SOMBRA } from '@/constants/theme';

export default function ArticuloAyudaScreen() {
  const { slug } =
    useLocalSearchParams<{
      slug?: string[];
    }>();

  const partes = slug ?? [];

  const ruta = partes.join('/');

  let titulo = 'Artículo de ayuda';
  let contenido = 'No hay información para este tema.';
  let icono:
    | 'cash-outline'
    | 'card-outline'
    | 'time-outline'
    | 'close-circle-outline'
    | 'help-circle-outline' =
    'help-circle-outline';

  if (ruta === 'pagos/efectivo') {
    titulo = 'Pagos en efectivo';
    contenido =
      'El pedido puede abonarse en efectivo al momento de retirarlo.';
    icono = 'cash-outline';
  }

  if (ruta === 'pagos/tarjeta') {
    titulo = 'Pagos con tarjeta';
    contenido =
      'Consultá en el comedor si el pago con tarjeta se encuentra disponible.';
    icono = 'card-outline';
  }

  if (ruta === 'horarios') {
    titulo = 'Horarios del comedor';
    contenido =
      'Los horarios del comedor pueden consultarse en el Instituto.';
    icono = 'time-outline';
  }

  if (ruta === 'pedidos/cancelacion') {
    titulo = 'Cancelación de pedidos';
    contenido =
      'Una vez confirmado el pedido, consultá con el personal de cocina para realizar una cancelación.';
    icono = 'close-circle-outline';
  }

  return (
    <ScrollView
      style={styles.pantalla}
      contentContainerStyle={styles.container}
    >
      <Stack.Screen
        options={{
          title: titulo,
          headerStyle: {
            backgroundColor: COLORES.azul,
          },
          headerTintColor: COLORES.crema,
        }}
      />

      <View style={styles.icono}>
        <Ionicons
          name={icono}
          size={42}
          color={COLORES.verde}
        />
      </View>

      <Text style={styles.titulo}>
        {titulo}
      </Text>

      <View style={styles.tarjeta}>
        <Text style={styles.contenido}>
          {contenido}
        </Text>
      </View>

      <View style={styles.rutaCard}>
        <Ionicons
          name="link-outline"
          size={18}
          color={COLORES.textoSecundario}
        />

        <View style={styles.rutaInfo}>
          <Text style={styles.rutaLabel}>
            Ruta recibida
          </Text>

          <Text style={styles.ruta}>
            /ayuda/{ruta}
          </Text>
        </View>
      </View>

      <DondeEstoy />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: COLORES.crema,
  },

  container: {
    padding: 22,
    alignItems: 'center',
  },

  icono: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORES.verdeClaro,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18,
  },

  titulo: {
    marginTop: 18,
    fontSize: 28,
    fontWeight: '800',
    color: COLORES.texto,
    textAlign: 'center',
  },

  tarjeta: {
    width: '100%',
    marginTop: 22,
    padding: 22,
    backgroundColor: COLORES.blanco,
    borderRadius: 20,
    ...SOMBRA,
  },

  contenido: {
    fontSize: 16,
    lineHeight: 25,
    color: COLORES.texto,
  },

  rutaCard: {
    width: '100%',
    marginTop: 16,
    padding: 15,
    backgroundColor: COLORES.cremaClaro,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  rutaInfo: {
    flex: 1,
  },

  rutaLabel: {
    fontSize: 11,
    color: COLORES.textoSecundario,
  },

  ruta: {
    marginTop: 2,
    color: COLORES.azul,
    fontWeight: '700',
  },
});