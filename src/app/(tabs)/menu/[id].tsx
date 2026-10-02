import Ionicons from '@expo/vector-icons/Ionicons';
import {
  Stack,
  useLocalSearchParams,
} from 'expo-router';

import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import DondeEstoy from '@/components/DondeEstoy';
import { COLORES, SOMBRA } from '@/constants/theme';
import { useApp } from '@/context/AppContext';
import { platos } from '@/data/plato';

export default function DetallePlatoScreen() {
  const { id } =
    useLocalSearchParams<{ id: string }>();

  const idNumerico = Number(id);

  const plato = platos.find(
    (p) => p.id === idNumerico
  );

  const { agregarAlCarrito } = useApp();

  if (!plato) {
    return (
      <View style={styles.container}>
        <Stack.Screen
          options={{
            title: 'Plato no encontrado',
          }}
        />

        <Ionicons
          name="alert-circle-outline"
          size={60}
          color={COLORES.error}
        />

        <Text style={styles.titulo}>
          Plato no encontrado
        </Text>

        <Text style={styles.descripcion}>
          No existe un plato con el id {id}.
        </Text>

        <DondeEstoy />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: plato.nombre,
          headerStyle: {
            backgroundColor: COLORES.azul,
          },
          headerTintColor: COLORES.crema,
        }}
      />

      <View style={styles.iconoGrande}>
        <Ionicons
          name="restaurant"
          size={50}
          color={COLORES.verde}
        />
      </View>

      <Text style={styles.titulo}>
        {plato.nombre}
      </Text>

      <Text style={styles.categoria}>
        {plato.categoria.toUpperCase()}
      </Text>

      <Text style={styles.descripcion}>
        {plato.descripcion}
      </Text>

      <View style={styles.precioCard}>
        <Text style={styles.precioLabel}>
          Precio
        </Text>

        <Text style={styles.precio}>
          ${plato.precio}
        </Text>
      </View>

      <Pressable
        style={styles.boton}
        onPress={() =>
          agregarAlCarrito(plato)
        }
      >
        <Ionicons
          name="cart-outline"
          size={21}
          color={COLORES.blanco}
        />

        <Text style={styles.textoBoton}>
          Agregar al carrito
        </Text>
      </Pressable>

      <DondeEstoy />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: COLORES.crema,
  },

  iconoGrande: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: COLORES.verdeClaro,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },

  titulo: {
    fontSize: 29,
    fontWeight: '800',
    color: COLORES.texto,
    textAlign: 'center',
  },

  categoria: {
    marginTop: 8,
    color: COLORES.verdeOscuro,
    fontWeight: '800',
    letterSpacing: 1,
  },

  descripcion: {
    fontSize: 16,
    lineHeight: 23,
    color: COLORES.textoSecundario,
    textAlign: 'center',
    marginTop: 14,
  },

  precioCard: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORES.blanco,
    padding: 18,
    borderRadius: 18,
    marginTop: 25,
    ...SOMBRA,
  },

  precioLabel: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORES.texto,
  },

  precio: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORES.verdeOscuro,
  },

  boton: {
    width: '100%',
    marginTop: 15,
    backgroundColor: COLORES.verde,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },

  textoBoton: {
    color: COLORES.blanco,
    fontWeight: '800',
    fontSize: 16,
  },
});