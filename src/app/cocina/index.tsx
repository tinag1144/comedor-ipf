import { Link, Stack } from 'expo-router';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useApp } from '@/context/AppContext';

export default function CocinaScreen() {
  const {
    pedidoActual,
    pedidosEnEspera,
    atenderSiguiente,
    cerrarSesion,
  } = useApp();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen
        options={{
          title: 'Cocina',
        }}
      />

      <Text style={styles.titulo}>Cocina</Text>

      <Text style={styles.espera}>
        Pedidos en espera: {pedidosEnEspera.length}
      </Text>

      {!pedidoActual ? (
        <Text>No hay pedidos pendientes.</Text>
      ) : (
        <View style={styles.pedido}>
          <Text style={styles.numero}>
            Pedido #{pedidoActual.numero}
          </Text>

          <Text style={styles.subtitulo}>
            Productos
          </Text>

          {pedidoActual.items.map((plato, indice) => (
            <Text key={`${plato.id}-${indice}`}>
              • {plato.nombre}
            </Text>
          ))}

          {pedidoActual.nota ? (
            <View style={styles.nota}>
              <Text style={styles.subtitulo}>
                Nota
              </Text>

              <Text>{pedidoActual.nota}</Text>
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

  espera: {
    fontSize: 18,
  },

  pedido: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 10,
    gap: 8,
  },

  numero: {
    fontSize: 22,
    fontWeight: 'bold',
  },

  subtitulo: {
    fontWeight: 'bold',
  },

  nota: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
  },

  botonAtender: {
    backgroundColor: '#06d6a0',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },

  botonSalir: {
    backgroundColor: '#ef476f',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },

  textoBoton: {
    color: 'white',
    fontWeight: 'bold',
  },

  link: {
    color: '#118ab2',
    fontWeight: '600',
  },
});