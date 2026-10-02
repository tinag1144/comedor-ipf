import Ionicons from '@expo/vector-icons/Ionicons';
import {
  Stack,
  useLocalSearchParams,
} from 'expo-router';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import DondeEstoy from '@/components/DondeEstoy';
import { COLORES, SOMBRA } from '@/constants/theme';
import { useApp } from '@/context/AppContext';

export default function TurnoScreen() {
  const { numero } =
    useLocalSearchParams<{ numero: string }>();

  const numeroTurno = Number(numero);

  const { pedidosEnEspera } = useApp();

  const posicion = pedidosEnEspera.findIndex(
    (pedido) =>
      pedido.numero === numeroTurno
  );

  const pedidosAdelante =
    posicion >= 0 ? posicion : 0;

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: `Turno ${numeroTurno}`,
          headerStyle: {
            backgroundColor: COLORES.azul,
          },
          headerTintColor: COLORES.crema,
        }}
      />

      <View style={styles.icono}>
        <Ionicons
          name="checkmark-circle"
          size={65}
          color={COLORES.verde}
        />
      </View>

      <Text style={styles.titulo}>
        ¡Pedido confirmado!
      </Text>

      <Text style={styles.subtitulo}>
        Tu número de turno es
      </Text>

      <View style={styles.turnoCard}>
        <Text style={styles.numero}>
          {numeroTurno}
        </Text>
      </View>

      <View style={styles.infoCard}>
        <Ionicons
          name="people-outline"
          size={24}
          color={COLORES.azul}
        />

        <Text style={styles.info}>
          Tenés {pedidosAdelante}{' '}
          {pedidosAdelante === 1
            ? 'pedido'
            : 'pedidos'}{' '}
          adelante.
        </Text>
      </View>

      <Text style={styles.espera}>
        Te avisaremos cuando sea tu turno.
      </Text>

      <DondeEstoy />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORES.crema,
  },

  icono: {
    marginBottom: 15,
  },

  titulo: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORES.texto,
  },

  subtitulo: {
    fontSize: 17,
    marginTop: 12,
    color: COLORES.textoSecundario,
  },

  turnoCard: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: COLORES.azul,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 24,
    ...SOMBRA,
  },

  numero: {
    fontSize: 68,
    fontWeight: '900',
    color: COLORES.crema,
  },

  infoCard: {
    width: '100%',
    backgroundColor: COLORES.blanco,
    padding: 17,
    borderRadius: 17,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    ...SOMBRA,
  },

  info: {
    fontSize: 17,
    color: COLORES.texto,
  },

  espera: {
    marginTop: 15,
    color: COLORES.textoSecundario,
  },
});