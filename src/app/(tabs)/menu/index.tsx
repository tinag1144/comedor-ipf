import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import DondeEstoy from '@/components/DondeEstoy';
import { COLORES, SOMBRA } from '@/constants/theme';
import { CategoriaPlato, platos } from '@/data/plato';

const categorias: CategoriaPlato[] = [
  'desayuno',
  'almuerzo',
  'bebidas',
  'kiosco',
];

export default function MenuScreen() {
  return (
    <ScrollView
      style={styles.pantalla}
      contentContainerStyle={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.titulo}>Menú</Text>

        <Text style={styles.descripcionHeader}>
          Elegí lo que más te guste
        </Text>
      </View>

      {categorias.map((categoria) => {
        const platosDeCategoria = platos.filter(
          (plato) => plato.categoria === categoria
        );

        return (
          <View key={categoria} style={styles.seccion}>
            <Text style={styles.categoria}>
              {categoria.toUpperCase()}
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
                <View style={styles.contenidoTarjeta}>
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

                  <Ionicons
                    name="chevron-forward"
                    size={22}
                    color={COLORES.textoSecundario}
                  />
                </View>
              </Link>
            ))}
          </View>
        );
      })}

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
    paddingTop: 30,
    borderBottomLeftRadius: 26,
    borderBottomRightRadius: 26,
    marginBottom: 24,
  },

  titulo: {
    fontSize: 30,
    fontWeight: '800',
    color: COLORES.crema,
  },

  descripcionHeader: {
    color: '#dbe2e5',
    marginTop: 5,
  },

  seccion: {
    paddingHorizontal: 20,
    marginBottom: 25,
    gap: 10,
  },

  categoria: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORES.azulOscuro,
    letterSpacing: 1,
    marginBottom: 4,
  },

  tarjeta: {
    backgroundColor: COLORES.blanco,
    padding: 16,
    borderRadius: 18,
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
    backgroundColor: COLORES.verdeClaro,
    alignItems: 'center',
    justifyContent: 'center',
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
    marginTop: 3,
    color: COLORES.textoSecundario,
  },

  precio: {
    marginTop: 7,
    fontWeight: '800',
    color: COLORES.verdeOscuro,
  },
});