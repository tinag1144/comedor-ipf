import Ionicons from '@expo/vector-icons/Ionicons';
import {
  Link,
  Stack,
  usePathname,
} from 'expo-router';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import DondeEstoy from '@/components/DondeEstoy';
import { COLORES, SOMBRA } from '@/constants/theme';

export default function NotFoundScreen() {
  const pathname = usePathname();

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Página no encontrada',
          headerStyle: {
            backgroundColor: COLORES.azul,
          },
          headerTintColor: COLORES.crema,
        }}
      />

      <View style={styles.icono}>
        <Ionicons
          name="compass-outline"
          size={65}
          color={COLORES.error}
        />
      </View>

      <Text style={styles.codigo}>
        404
      </Text>

      <Text style={styles.titulo}>
        Ruta no encontrada
      </Text>

      <Text style={styles.descripcion}>
        La dirección que intentaste abrir no existe.
      </Text>

      <View style={styles.rutaCard}>
        <Text style={styles.rutaLabel}>
          Ruta solicitada
        </Text>

        <Text style={styles.ruta}>
          {pathname}
        </Text>
      </View>

      <Link
        href="/"
        style={styles.link}
      >
        Volver al inicio
      </Link>

      <DondeEstoy />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORES.crema,
  },

  icono: {
    marginBottom: 5,
  },

  codigo: {
    fontSize: 70,
    fontWeight: '900',
    color: COLORES.azul,
  },

  titulo: {
    fontSize: 27,
    fontWeight: '800',
    color: COLORES.texto,
  },

  descripcion: {
    marginTop: 10,
    textAlign: 'center',
    color: COLORES.textoSecundario,
  },

  rutaCard: {
    width: '100%',
    marginTop: 25,
    backgroundColor: COLORES.blanco,
    borderRadius: 16,
    padding: 17,
    ...SOMBRA,
  },

  rutaLabel: {
    fontSize: 12,
    color: COLORES.textoSecundario,
  },

  ruta: {
    marginTop: 4,
    fontWeight: '700',
    color: COLORES.texto,
  },

  link: {
    width: '100%',
    marginTop: 16,
    backgroundColor: COLORES.verde,
    color: COLORES.blanco,
    padding: 15,
    borderRadius: 15,
    overflow: 'hidden',
    textAlign: 'center',
    fontWeight: '800',
  },
});