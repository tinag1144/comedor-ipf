import { Link, Stack, useLocalSearchParams } from 'expo-router';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { CategoriaPlato, platos } from '@/data/plato';
import DondeEstoy from '@/components/DondeEstoy';

const categoriasValidas: CategoriaPlato[] = [
  'desayuno',
  'almuerzo',
  'bebidas',
  'kiosco',
];

export default function CategoriaScreen() {
  /*
    Leemos la categoría desde la URL.

    Ejemplo:
    /categorias/bebidas

    categoria = "bebidas"
  */
  const { categoria } =
    useLocalSearchParams<{ categoria: string }>();

  /*
    Validamos que la categoría recibida
    realmente exista dentro de las categorías permitidas.
  */
  const categoriaValida = categoriasValidas.find(
    (item) => item === categoria
  );

  /*
    Si la categoría no existe,
    mostramos un mensaje de error.
  */
  if (!categoriaValida) {
    return (
      <View style={styles.container}>
        <Stack.Screen
          options={{
            title: 'Categoría no encontrada',
          }}
        />

        <Text style={styles.titulo}>
          Categoría no encontrada
        </Text>

        <Text>
          La categoría "{categoria}" no existe.
        </Text>
        <DondeEstoy />
      </View>
    );
  }

  /*
    Filtramos todos los platos
    y nos quedamos solamente con los
    que pertenecen a la categoría actual.
  */
  const platosDeCategoria = platos.filter(
    (plato) => plato.categoria === categoriaValida
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen
        options={{
          title: categoriaValida.toUpperCase(),
        }}
      />

      <Text style={styles.titulo}>
        {categoriaValida.toUpperCase()}
      </Text>

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
          <View>
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
        </Link>
      ))}
      <DondeEstoy />
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