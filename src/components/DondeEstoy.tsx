import {
  useLocalSearchParams,
  usePathname,
  useSegments,
} from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

// Si DEBUG es false, el componente no se muestra.
// Esto nos permite ocultarlo fácilmente al entregar la app.
const DEBUG = false;

export default function DondeEstoy() {
  // Devuelve la ruta actual.
  // Ejemplo: "/menu/3"
  const pathname = usePathname();

  // Devuelve los segmentos que Expo Router usa internamente.
  // Ejemplo aproximado:
  // ["(tabs)", "menu", "[id]"]
  const segments = useSegments();

  // Devuelve los parámetros locales de la pantalla.
  // Ejemplo:
  // { id: "3" }
  const params = useLocalSearchParams();

  // Si DEBUG está apagado, no mostramos nada.
  if (!DEBUG) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>¿Dónde estoy?</Text>

      <Text style={styles.texto}>
        Pathname: {pathname}
      </Text>

      <Text style={styles.texto}>
        Segments: {JSON.stringify(segments)}
      </Text>

      <Text style={styles.texto}>
        Params: {JSON.stringify(params)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    padding: 12,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
  },

  titulo: {
    fontWeight: 'bold',
    marginBottom: 8,
  },

  texto: {
    fontSize: 12,
    marginBottom: 4,
  },
});