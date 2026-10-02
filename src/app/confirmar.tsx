import Ionicons from '@expo/vector-icons/Ionicons';
import { router, Stack } from 'expo-router';
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

export default function ConfirmarScreen() {
  const {
    carrito,
    nota,
    confirmarPedido,
  } = useApp();

  const total = carrito.reduce(
    (acumulador, plato) =>
      acumulador + plato.precio,
    0
  );

  function confirmar() {
    const numero = confirmarPedido();

    if (numero === null) {
      return;
    }

    router.replace({
      pathname: '/turno/[numero]',
      params: {
        numero: numero.toString(),
      },
    });
  }

  return (
    <ScrollView
      style={styles.pantalla}
      contentContainerStyle={styles.container}
    >
      <Stack.Screen
        options={{
          title: 'Confirmar pedido',
          headerStyle: {
            backgroundColor: COLORES.azul,
          },
          headerTintColor: COLORES.crema,
        }}
      />

      <Text style={styles.titulo}>
        Resumen del pedido
      </Text>

      {carrito.length === 0 ? (
        <View style={styles.vacio}>
          <Ionicons
            name="cart-outline"
            size={44}
            color={COLORES.textoSecundario}
          />

          <Text>No hay platos para confirmar.</Text>
        </View>
      ) : (
        <>
          <View style={styles.tarjeta}>
            {carrito.map((plato, indice) => (
              <View
                key={`${plato.id}-${indice}`}
                style={styles.item}
              >
                <Text style={styles.nombre}>
                  {plato.nombre}
                </Text>

                <Text style={styles.precio}>
                  ${plato.precio}
                </Text>
              </View>
            ))}
          </View>

          {nota ? (
            <View style={styles.notaContainer}>
              <Text style={styles.subtitulo}>
                Nota para cocina
              </Text>

              <Text style={styles.notaTexto}>
                {nota}
              </Text>
            </View>
          ) : null}

          <View style={styles.totalContainer}>
            <Text style={styles.totalTexto}>
              Total
            </Text>

            <Text style={styles.total}>
              ${total}
            </Text>
          </View>

          <Pressable
            style={styles.boton}
            onPress={confirmar}
          >
            <Ionicons
              name="checkmark-circle-outline"
              size={22}
              color={COLORES.blanco}
            />

            <Text style={styles.textoBoton}>
              Confirmar pedido
            </Text>
          </Pressable>
        </>
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
    fontSize: 28,
    fontWeight: '800',
    color: COLORES.texto,
  },

  tarjeta: {
    backgroundColor: COLORES.blanco,
    padding: 18,
    borderRadius: 20,
    ...SOMBRA,
  },

  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: COLORES.borde,
  },

  nombre: {
    fontWeight: '600',
    color: COLORES.texto,
  },

  precio: {
    fontWeight: '700',
    color: COLORES.verdeOscuro,
  },

  notaContainer: {
    padding: 16,
    backgroundColor: COLORES.verdeClaro,
    borderRadius: 16,
  },

  subtitulo: {
    fontWeight: '800',
    color: COLORES.verdeOscuro,
  },

  notaTexto: {
    marginTop: 5,
    color: COLORES.texto,
  },

  totalContainer: {
    backgroundColor: COLORES.blanco,
    padding: 18,
    borderRadius: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...SOMBRA,
  },

  totalTexto: {
    fontSize: 20,
    fontWeight: '700',
  },

  total: {
    fontSize: 23,
    fontWeight: '800',
    color: COLORES.verdeOscuro,
  },

  boton: {
    backgroundColor: COLORES.verde,
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textoBoton: {
    color: COLORES.blanco,
    fontWeight: '800',
    fontSize: 16,
  },

  vacio: {
    alignItems: 'center',
    padding: 30,
    backgroundColor: COLORES.blanco,
    borderRadius: 18,
  },
});