import Ionicons from '@expo/vector-icons/Ionicons';
import { Link, Stack } from 'expo-router';

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import DondeEstoy from '@/components/DondeEstoy';
import { COLORES, SOMBRA } from '@/constants/theme';

export default function AyudaScreen() {
  return (
    <ScrollView
      style={styles.pantalla}
      contentContainerStyle={styles.container}
    >
      <Stack.Screen
        options={{
          title: 'Ayuda',
          headerStyle: {
            backgroundColor: COLORES.azul,
          },
          headerTintColor: COLORES.crema,
        }}
      />

      <View style={styles.header}>
        <View style={styles.iconoHeader}>
          <Ionicons
            name="help-circle-outline"
            size={42}
            color={COLORES.verde}
          />
        </View>

        <Text style={styles.titulo}>
          Centro de ayuda
        </Text>

        <Text style={styles.descripcion}>
          Elegí un tema para encontrar la información que necesitás.
        </Text>
      </View>

      <View style={styles.lista}>
        <Link
          href={{
            pathname: '/ayuda/[...slug]',
            params: {
              slug: ['pagos', 'efectivo'],
            },
          }}
          style={styles.tarjeta}
        >
          <View style={styles.fila}>
            <View style={styles.icono}>
              <Ionicons
                name="cash-outline"
                size={24}
                color={COLORES.verde}
              />
            </View>

            <View style={styles.info}>
              <Text style={styles.tituloTarjeta}>
                Pagos en efectivo
              </Text>

              <Text style={styles.textoTarjeta}>
                Información sobre pagos en efectivo.
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={21}
              color={COLORES.textoSecundario}
            />
          </View>
        </Link>

        <Link
          href={{
            pathname: '/ayuda/[...slug]',
            params: {
              slug: ['pagos', 'tarjeta'],
            },
          }}
          style={styles.tarjeta}
        >
          <View style={styles.fila}>
            <View style={styles.icono}>
              <Ionicons
                name="card-outline"
                size={24}
                color={COLORES.verde}
              />
            </View>

            <View style={styles.info}>
              <Text style={styles.tituloTarjeta}>
                Pagos con tarjeta
              </Text>

              <Text style={styles.textoTarjeta}>
                Consultá cómo pagar con tarjeta.
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={21}
              color={COLORES.textoSecundario}
            />
          </View>
        </Link>

        <Link
          href={{
            pathname: '/ayuda/[...slug]',
            params: {
              slug: ['horarios'],
            },
          }}
          style={styles.tarjeta}
        >
          <View style={styles.fila}>
            <View style={styles.icono}>
              <Ionicons
                name="time-outline"
                size={24}
                color={COLORES.verde}
              />
            </View>

            <View style={styles.info}>
              <Text style={styles.tituloTarjeta}>
                Horarios del comedor
              </Text>

              <Text style={styles.textoTarjeta}>
                Consultá los horarios de atención.
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={21}
              color={COLORES.textoSecundario}
            />
          </View>
        </Link>

        <Link
          href={{
            pathname: '/ayuda/[...slug]',
            params: {
              slug: ['pedidos', 'cancelacion'],
            },
          }}
          style={styles.tarjeta}
        >
          <View style={styles.fila}>
            <View style={styles.icono}>
              <Ionicons
                name="close-circle-outline"
                size={24}
                color={COLORES.verde}
              />
            </View>

            <View style={styles.info}>
              <Text style={styles.tituloTarjeta}>
                Cancelación de pedidos
              </Text>

              <Text style={styles.textoTarjeta}>
                Qué hacer si necesitás cancelar.
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={21}
              color={COLORES.textoSecundario}
            />
          </View>
        </Link>
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
    padding: 20,
    gap: 20,
  },

  header: {
    alignItems: 'center',
    paddingVertical: 14,
  },

  iconoHeader: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: COLORES.verdeClaro,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },

  titulo: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORES.texto,
  },

  descripcion: {
    marginTop: 7,
    textAlign: 'center',
    lineHeight: 21,
    color: COLORES.textoSecundario,
  },

  lista: {
    gap: 12,
  },

  tarjeta: {
    backgroundColor: COLORES.blanco,
    padding: 16,
    borderRadius: 18,
    overflow: 'hidden',
    ...SOMBRA,
  },

  fila: {
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

  tituloTarjeta: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORES.texto,
  },

  textoTarjeta: {
    marginTop: 3,
    color: COLORES.textoSecundario,
    fontSize: 13,
  },
});