import { Link, Stack, usePathname } from 'expo-router';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function NotFoundScreen() {
  /*
    usePathname() nos devuelve la ruta actual.

    Ejemplo:
    si alguien entra a /algo-que-no-existe

    pathname = "/algo-que-no-existe"
  */
  const pathname = usePathname();

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Página no encontrada',
        }}
      />

      <Text style={styles.codigo}>404</Text>

      <Text style={styles.titulo}>
        Ruta no encontrada
      </Text>

      <Text style={styles.descripcion}>
        La ruta que intentaste abrir no existe.
      </Text>

      <Text style={styles.ruta}>
        Ruta: {pathname}
      </Text>

      <Link
        href="/"
        style={styles.link}
      >
        Volver al inicio
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  codigo: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#ef476f',
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 10,
  },

  descripcion: {
    fontSize: 16,
    color: '#666666',
    marginTop: 10,
    textAlign: 'center',
  },

  ruta: {
    marginTop: 20,
    fontWeight: '600',
  },

  link: {
    marginTop: 30,
    color: '#118ab2',
    fontWeight: 'bold',
  },
});