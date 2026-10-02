import Ionicons from '@expo/vector-icons/Ionicons';
import {
  Link,
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
import { CategoriaPlato, platos } from '@/data/plato';

const categoriasValidas: CategoriaPlato[] = [
  'desayuno',
  'almuerzo',
  'bebidas',
  'kiosco',
];

export default function CategoriaScreen() {
  const { categoria } =
    useLocalSearchParams<{ categoria: string }>();

  const categoriaValida = categoriasValidas.find(
    (item) => item === categoria
  );

  if (!categoriaValida) {
    return (
      <View style={styles.errorContainer}>
        <Stack.Screen
          options={{
            title: 'Categoría no encontrada',
            headerStyle: {
              backgroundColor: COLORES.azul,
            },
            headerTintColor: COLORES.crema,
          }}
        />

        <View style={styles.iconoError}>
          <Ionicons
            name="alert-circle-outline"
            size={55}
            color={COLORES.error}
          />
        </View>

        <Text style={styles.tituloError}>
          Categoría no encontrada
        </Text>

        <Text style={styles.descripcionError}>
          La categoría "{categoria}" no existe.
        </Text>

        <Link href="/menu" style={styles.botonVolver}>
          Volver al menú
        </Link>

        <DondeEstoy />
      </View>
    );
  }

  const platosDeCategoria = platos.filter(
    (plato) => plato.categoria === categoriaValida
  );

  return (
    <ScrollView
      style={styles.pantalla}
      contentContainerStyle={styles.container}
    >
      <Stack.Screen
        options={{
          title: categoriaValida.toUpperCase(),
          headerStyle: {
            backgroundColor: COLORES.azul,
          },
          headerTintColor: COLORES.crema,
        }}
      />

      <View style={styles.header}>
        <Text style={styles.titulo}>
          {categoriaValida.toUpperCase()}
        </Text>

        <Text style={styles.descripcionHeader}>
          Platos disponibles en esta categoría
        </Text>
      </View>

      <View style={styles.lista}>
        {platosDeCategoria.map((plato) => (
          <Link
            key={plato.id}
            href={{
              pathname: '/menu/[id]',
              params: {
                id: plato.id.toString(),
              },
            }}
            style={styles.tarjeta}
          >
            <View style={styles.contenidoTarjeta}>
              <View style={styles.icono}>
                <Ionicons
                  name="restaurant-outline"
                  size={23}
                  color={COLORES.verde}
                />
              </View>

              <View style={styles.info}>
                <Text style={styles.nombre}>
                  {plato.nombre}
                </Text>

                <Text style={styles.descripcion}>
                  {plato.descripcion}
                </Text>

                <Text style={styles.precio}>
                  ${plato.precio}
                </Text>
              </View>

              <Ionicons
                name="chevron-forward"
                size={22}
                color={COLORES.textoSecundario}
              />
            </View>
          </Link>
        ))}
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
    paddingBottom: 30,
  },

  header: {
    backgroundColor: COLORES.azul,
    padding: 24,
    borderBottomLeftRadius: 26,
    borderBottomRightRadius: 26,
    marginBottom: 20,
  },

  titulo: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORES.crema,
  },

  descripcionHeader: {
    marginTop: 5,
    color: '#dbe2e5',
  },

  lista: {
    paddingHorizontal: 20,
    gap: 12,
  },

  tarjeta: {
    backgroundColor: COLORES.blanco,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORES.borde,
    overflow: 'hidden',
    ...SOMBRA,
  },

  contenidoTarjeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  icono: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORES.verdeClaro,
  },

  info: {
    flex: 1,
  },

  nombre: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORES.texto,
  },

  descripcion: {
    marginTop: 4,
    color: COLORES.textoSecundario,
  },

  precio: {
    marginTop: 7,
    fontWeight: '800',
    color: COLORES.verdeOscuro,
  },

  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: COLORES.crema,
  },

  iconoError: {
    marginBottom: 12,
  },

  tituloError: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORES.texto,
    textAlign: 'center',
  },

  descripcionError: {
    marginTop: 8,
    color: COLORES.textoSecundario,
    textAlign: 'center',
  },

  botonVolver: {
    marginTop: 24,
    backgroundColor: COLORES.verde,
    color: COLORES.blanco,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 14,
    overflow: 'hidden',
    fontWeight: '800',
  },
});