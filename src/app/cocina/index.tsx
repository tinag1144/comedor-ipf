import { Link, Stack } from 'expo-router';

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

export default function CocinaScreen() {
  const {
    pedidoActual,
    pedidosEnEspera,
    atenderSiguiente,
    cerrarSesion,
  } = useApp();

  return (
    <ScrollView
      style={styles.pantalla}
      contentContainerStyle={styles.container}
    >
      <Stack.Screen
        options={{
          title: 'Cocina',
        }}
      />

      <Text style={styles.titulo}>
        Cocina
      </Text>

      <Text style={styles.espera}>
        Pedidos en espera: {pedidosEnEspera.length}
      </Text>

      {!pedidoActual ? (
        <View style={styles.sinPedidos}>
          <Text style={styles.sinPedidosTitulo}>
            No hay pedidos pendientes
          </Text>

          <Text style={styles.sinPedidosTexto}>
            Los nuevos pedidos aparecerán acá.
          </Text>
        </View>
      ) : (
        <View style={styles.pedido}>
          <Text style={styles.numero}>
            Pedido #{pedidoActual.numero}
          </Text>

          <Text style={styles.subtitulo}>
            Productos
          </Text>

          {pedidoActual.items.map((plato, indice) => (
            <Text
              key={`${plato.id}-${indice}`}
              style={styles.producto}
            >
              • {plato.nombre}
            </Text>
          ))}

          {pedidoActual.nota ? (
            <View style={styles.nota}>
              <Text style={styles.subtitulo}>
                Nota
              </Text>

              <Text style={styles.notaTexto}>
                {pedidoActual.nota}
              </Text>
            </View>
          ) : null}

          <Pressable
            style={styles.botonAtender}
            onPress={atenderSiguiente}
          >
            <Text style={styles.textoBoton}>
              Atender siguiente
            </Text>
          </Pressable>
        </View>
      )}

      <Link
        href="/cocina/atendidos"
        style={styles.link}
      >
        Ver pedidos atendidos
      </Link>

      <Pressable
        style={styles.botonSalir}
        onPress={cerrarSesion}
      >
        <Text style={styles.textoBoton}>
          Cerrar sesión
        </Text>
      </Pressable>

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
    gap: 15,
    flexGrow: 1,
  },

  titulo: {
    fontSize: 30,
    fontWeight: '800',
    color: COLORES.azulOscuro,
  },

  espera: {
    backgroundColor: COLORES.verdeClaro,
    color: COLORES.verdeOscuro,
    padding: 12,
    borderRadius: 12,
    fontWeight: '700',
  },

  pedido: {
    padding: 20,
    backgroundColor: COLORES.azul,
    borderRadius: 20,
    gap: 10,
    ...SOMBRA,
  },

  numero: {
    color: COLORES.crema,
    fontSize: 24,
    fontWeight: '800',
  },

  subtitulo: {
    color: COLORES.crema,
    fontWeight: '700',
  },

  producto: {
    color: COLORES.blanco,
    fontSize: 15,
  },

  nota: {
    marginTop: 10,
    padding: 12,
    backgroundColor: COLORES.azulClaro,
    borderRadius: 12,
  },

  notaTexto: {
    color: COLORES.blanco,
    marginTop: 4,
  },

  botonAtender: {
    backgroundColor: COLORES.verde,
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 10,
  },

  botonSalir: {
    backgroundColor: COLORES.error,
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
  },

  textoBoton: {
    color: COLORES.blanco,
    fontWeight: '800',
  },

  link: {
    backgroundColor: COLORES.blanco,
    padding: 15,
    borderRadius: 14,
    color: COLORES.azul,
    fontWeight: '700',
    overflow: 'hidden',
  },

  sinPedidos: {
    padding: 30,
    backgroundColor: COLORES.blanco,
    borderRadius: 20,
    alignItems: 'center',
    ...SOMBRA,
  },

  sinPedidosTitulo: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORES.texto,
  },

  sinPedidosTexto: {
    marginTop: 5,
    color: COLORES.textoSecundario,
    textAlign: 'center',
  },
});