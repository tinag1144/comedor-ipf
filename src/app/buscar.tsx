import Ionicons from '@expo/vector-icons/Ionicons';
import {
  router,
  Stack,
  useLocalSearchParams,
} from 'expo-router';

import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import DondeEstoy from '@/components/DondeEstoy';
import { COLORES, SOMBRA } from '@/constants/theme'
import { CategoriaPlato, platos } from '@/data/plato';

const categorias: CategoriaPlato[] = [
  'desayuno',
  'almuerzo',
  'bebidas',
  'kiosco',
];

export default function BuscarScreen() {
  const { q = '', categoria = '' } =
    useLocalSearchParams<{
      q?: string;
      categoria?: string;
    }>();

  const resultados = platos.filter((plato) => {
    const coincideTexto = plato.nombre
      .toLowerCase()
      .includes(q.toLowerCase());

    const coincideCategoria =
      categoria === '' ||
      plato.categoria === categoria;

    return coincideTexto && coincideCategoria;
  });

  function cambiarTexto(texto: string) {
    router.setParams({
      q: texto,
    });
  }

  function cambiarCategoria(categoriaNueva: string) {
    router.setParams({
      categoria: categoriaNueva,
    });
  }

  return (
    <ScrollView
      style={styles.pantalla}
      contentContainerStyle={styles.container}
    >
      <Stack.Screen
        options={{
          title: 'Buscar',
          headerStyle: {
            backgroundColor: COLORES.azul,
          },
          headerTintColor: COLORES.crema,
        }}
      />

      <Text style={styles.titulo}>
        Buscar platos
      </Text>

      <View style={styles.buscador}>
        <Ionicons
          name="search"
          size={21}
          color={COLORES.textoSecundario}
        />

        <TextInput
          style={styles.input}
          placeholder="Buscar por nombre..."
          placeholderTextColor={COLORES.textoSecundario}
          value={q}
          onChangeText={cambiarTexto}
        />
      </View>

      <Text style={styles.subtitulo}>
        Categorías
      </Text>

      <View style={styles.categorias}>
        <Pressable
          style={[
            styles.chip,
            categoria === '' && styles.chipActivo,
          ]}
          onPress={() => cambiarCategoria('')}
        >
          <Text
            style={[
              styles.textoChip,
              categoria === '' && styles.textoChipActivo,
            ]}
          >
            Todos
          </Text>
        </Pressable>

        {categorias.map((item) => (
          <Pressable
            key={item}
            style={[
              styles.chip,
              categoria === item && styles.chipActivo,
            ]}
            onPress={() => cambiarCategoria(item)}
          >
            <Text
              style={[
                styles.textoChip,
                categoria === item &&
                  styles.textoChipActivo,
              ]}
            >
              {item}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.subtitulo}>
        Resultados ({resultados.length})
      </Text>

      {resultados.length === 0 ? (
        <View style={styles.vacio}>
          <Ionicons
            name="search-outline"
            size={42}
            color={COLORES.textoSecundario}
          />

          <Text style={styles.vacioTitulo}>
            No encontramos resultados
          </Text>
        </View>
      ) : (
        resultados.map((plato) => (
          <View
            key={plato.id}
            style={styles.tarjeta}
          >
            <View style={styles.icono}>
              <Ionicons
                name="restaurant-outline"
                size={22}
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
          </View>
        ))
      )}

      <DondeEstoy />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pantalla: {
    backgroundColor: COLORES.crema,
  },

  container: {
    padding: 20,
    gap: 15,
  },

  titulo: {
    fontSize: 29,
    fontWeight: '800',
    color: COLORES.texto,
  },

  subtitulo: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORES.texto,
    marginTop: 8,
  },

  buscador: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORES.blanco,
    paddingHorizontal: 14,
    borderRadius: 16,
    ...SOMBRA,
  },

  input: {
    flex: 1,
    paddingVertical: 14,
    marginLeft: 8,
    color: COLORES.texto,
  },

  categorias: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  chip: {
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: COLORES.blanco,
    borderWidth: 1,
    borderColor: COLORES.borde,
  },

  chipActivo: {
    backgroundColor: COLORES.verde,
    borderColor: COLORES.verde,
  },

  textoChip: {
    color: COLORES.texto,
    textTransform: 'capitalize',
  },

  textoChipActivo: {
    color: COLORES.blanco,
    fontWeight: '700',
  },

  tarjeta: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 18,
    backgroundColor: COLORES.blanco,
    gap: 12,
    ...SOMBRA,
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
    color: COLORES.verdeOscuro,
    fontWeight: '800',
  },

  vacio: {
    alignItems: 'center',
    padding: 30,
    borderRadius: 20,
    backgroundColor: COLORES.blanco,
  },

  vacioTitulo: {
    marginTop: 10,
    fontWeight: '700',
    color: COLORES.texto,
  },
});