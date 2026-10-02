import { Link } from 'expo-router';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function InicioScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Comedor IPF</Text>

      <Text style={styles.saludo}>
        Bienvenido/a al sistema de pedidos.
      </Text>

      <Text style={styles.subtitulo}>
        Accesos rápidos
      </Text>

      <View style={styles.grid}>
        <Link href="/menu" style={styles.tarjeta}>
          <View>
            <Text style={styles.tarjetaTitulo}>Menú</Text>
            <Text style={styles.tarjetaTexto}>
              Ver los platos disponibles.
            </Text>
          </View>
        </Link>

        <Link href="/buscar" style={styles.tarjeta}>
          <View>
            <Text style={styles.tarjetaTitulo}>Buscar</Text>
            <Text style={styles.tarjetaTexto}>
              Buscar platos por nombre o categoría.
            </Text>
          </View>
        </Link>

        <Link href="/login" style={styles.tarjeta}>
          <View>
            <Text style={styles.tarjetaTitulo}>Cocina</Text>
            <Text style={styles.tarjetaTexto}>
              Ingreso del personal de cocina.
            </Text>
          </View>
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
  },

  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#073b4c',
  },

  saludo: {
    fontSize: 16,
    color: '#666666',
  },

  subtitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },

  grid: {
    gap: 12,
  },

  tarjeta: {
    padding: 18,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#dddddd',
    backgroundColor: '#ffffff',
  },

  tarjetaTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#118ab2',
  },

  tarjetaTexto: {
    marginTop: 5,
    color: '#666666',
  },
});