import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import DondeEstoy from '@/components/DondeEstoy';
import { COLORES, SOMBRA } from '@/constants/theme';
import { useApp } from '@/context/AppContext';

export default function CarritoScreen() {
  const {
    carrito,
    deshacerUltimo,
    puedeDeshacer,
    nota,
  } = useApp();

  const total = carrito.reduce(
    (acumulador, plato) =>
      acumulador + plato.precio,
    0
  );

  return (
    <ScrollView
      style={styles.pantalla}
      contentContainerStyle={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.titulo}>Carrito</Text>

        <Text style={styles.headerTexto}>
          Revisá tu pedido antes de confirmar
        </Text>
      </View>

      <View style={styles.contenido}>
        {carrito.length === 0 ? (
          <View style={styles.vacio}>
            <Ionicons
              name="cart-outline"
              size={50}
              color={COLORES.textoSecundario}
            />

            <Text style={styles.vacioTitulo}>
              Tu carrito está vacío
            </Text>

            <Text style={styles.vacioTexto}>
              Agregá platos desde el menú.
            </Text>
          </View>
        ) : (
          <>
            {carrito.map((plato, indice) => (
              <View
                key={`${plato.id}-${indice}`}
                style={styles.item}
              >
                <View style={styles.iconoItem}>
                  <Ionicons
                    name="fast-food-outline"
                    size={22}
                    color={COLORES.verde}
                  />
                </View>

                <View style={styles.infoItem}>
                  <Text style={styles.nombre}>
                    {plato.nombre}
                  </Text>

                  <Text style={styles.descripcion}>
                    {plato.descripcion}
                  </Text>
                </View>

                <Text style={styles.precio}>
                  ${plato.precio}
                </Text>
              </View>
            ))}

            <View style={styles.totalContainer}>
              <Text style={styles.totalTexto}>
                Total
              </Text>

              <Text style={styles.totalPrecio}>
                ${total}
              </Text>
            </View>
          </>
        )}

        <Pressable
          style={[
            styles.botonDeshacer,
            !puedeDeshacer &&
              styles.deshabilitado,
          ]}
          onPress={deshacerUltimo}
          disabled={!puedeDeshacer}
        >
          <Ionicons
            name="arrow-undo"
            size={21}
            color={COLORES.verdeOscuro}
          />

          <Text style={styles.textoDeshacer}>
            Deshacer último
          </Text>
        </Pressable>

        <Link
          href="/carrito/nota"
          style={styles.nota}
        >
          {nota
            ? `Editar nota: ${nota}`
            : 'Agregar nota para cocina'}
        </Link>

        <Link
          href="/confirmar"
          style={[
            styles.botonConfirmar,
            carrito.length === 0 &&
              styles.deshabilitado,
          ]}
        >
          Confirmar pedido
        </Link>

        <DondeEstoy />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pantalla: {
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
  },

  titulo: {
    color: COLORES.crema,
    fontSize: 30,
    fontWeight: '800',
  },

  headerTexto: {
    color: '#dbe2e5',
    marginTop: 5,
  },

  contenido: {
    padding: 20,
    gap: 13,
  },

  item: {
    padding: 15,
    backgroundColor: COLORES.blanco,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    ...SOMBRA,
  },

  iconoItem: {
    width: 45,
    height: 45,
    borderRadius: 22,
    backgroundColor: COLORES.verdeClaro,
    alignItems: 'center',
    justifyContent: 'center',
  },

  infoItem: {
    flex: 1,
  },

  nombre: {
    fontWeight: '700',
    color: COLORES.texto,
    fontSize: 16,
  },

  descripcion: {
    color: COLORES.textoSecundario,
    marginTop: 3,
  },

  precio: {
    fontWeight: '800',
    color: COLORES.texto,
  },

  totalContainer: {
    backgroundColor: COLORES.blanco,
    borderRadius: 18,
    padding: 19,
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...SOMBRA,
  },

  totalTexto: {
    fontSize: 20,
    fontWeight: '700',
  },

  totalPrecio: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORES.verdeOscuro,
  },

  botonDeshacer: {
    backgroundColor: COLORES.verdeClaro,
    padding: 15,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },

  textoDeshacer: {
    color: COLORES.verdeOscuro,
    fontWeight: '700',
  },

  nota: {
    padding: 15,
    color: COLORES.azul,
    fontWeight: '700',
    backgroundColor: COLORES.blanco,
    borderRadius: 15,
    overflow: 'hidden',
  },

  botonConfirmar: {
    backgroundColor: COLORES.verde,
    color: COLORES.blanco,
    textAlign: 'center',
    padding: 16,
    borderRadius: 16,
    overflow: 'hidden',
    fontSize: 16,
    fontWeight: '800',
  },

  deshabilitado: {
    opacity: 0.4,
  },

  vacio: {
    alignItems: 'center',
    backgroundColor: COLORES.blanco,
    padding: 35,
    borderRadius: 20,
  },

  vacioTitulo: {
    marginTop: 12,
    fontSize: 19,
    fontWeight: '700',
    color: COLORES.texto,
  },

  vacioTexto: {
    color: COLORES.textoSecundario,
    marginTop: 4,
  },
});