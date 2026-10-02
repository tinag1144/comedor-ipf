import { router, Stack, useLocalSearchParams } from 'expo-router';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  View,
} from 'react-native';

import { CategoriaPlato, platos } from '@/data/plato';

const categorias: CategoriaPlato[] = [
  'desayuno',
  'almuerzo',
  'bebidas',
  'kiosco',
];

export default function BuscarScreen() {
  /*
    Leemos los parámetros de búsqueda de la URL.

    Ejemplo:
    /buscar?q=chipa&categoria=desayuno
  */
  const { q = '', categoria = '' } =
    useLocalSearchParams<{
      q?: string;
      categoria?: string;
    }>();

  /*
    Filtramos los platos según:
    - texto
    - categoría
  */
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
    /*
      setParams modifica los parámetros de la URL actual
      sin agregar una nueva pantalla al Stack.
    */
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
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen
        options={{
          title: 'Buscar',
        }}
      />

      <Text style={styles.titulo}>
        Buscar platos
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Buscar por nombre..."
        value={q}
        onChangeText={cambiarTexto}
      />

      <Text style={styles.subtitulo}>
        Categoría
      </Text>

      <View style={styles.categorias}>
        <Pressable
          style={[
            styles.botonCategoria,
            categoria === '' && styles.botonSeleccionado,
          ]}
          onPress={() => cambiarCategoria('')}
        >
          <Text>Todos</Text>
        </Pressable>

        {categorias.map((item) => (
          <Pressable
            key={item}
            style={[
              styles.botonCategoria,
              categoria === item &&
                styles.botonSeleccionado,
            ]}
            onPress={() => cambiarCategoria(item)}
          >
            <Text>{item}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.subtitulo}>
        Resultados
      </Text>

      {resultados.length === 0 ? (
        <Text>No se encontraron platos.</Text>
      ) : (
        resultados.map((plato) => (
          <View
            key={plato.id}
            style={styles.tarjeta}
          >
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
        ))
      )}
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

  subtitulo: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 10,
    padding: 12,
  },

  categorias: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  botonCategoria: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#cccccc',
  },

  botonSeleccionado: {
    backgroundColor: '#ffd166',
  },

  tarjeta: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 10,
  },

  nombre: {
    fontSize: 18,
    fontWeight: '600',
  },

  descripcion: {
    marginTop: 4,
    color: '#666666',
  },

  precio: {
    marginTop: 8,
    fontWeight: 'bold',
  },
});