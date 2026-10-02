import Ionicons from '@expo/vector-icons/Ionicons';
import { Stack } from 'expo-router';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import DondeEstoy from '@/components/DondeEstoy';
import { COLORES, SOMBRA } from '@/constants/theme';
import { useApp } from '@/context/AppContext';

export default function NotaCarritoScreen() {
  const { nota, setNota } = useApp();

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Nota para cocina',
          headerStyle: {
            backgroundColor: COLORES.azul,
          },
          headerTintColor: COLORES.crema,
        }}
      />

      <View style={styles.icono}>
        <Ionicons
          name="create-outline"
          size={38}
          color={COLORES.verde}
        />
      </View>

      <Text style={styles.titulo}>
        Aclaración para cocina
      </Text>

      <Text style={styles.descripcion}>
        Podés agregar una nota opcional para tu pedido.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Ejemplo: sin sal, sin cebolla..."
        placeholderTextColor={COLORES.textoSecundario}
        value={nota}
        onChangeText={setNota}
        multiline
      />

      <Text style={styles.info}>
        La nota se guardará automáticamente.
      </Text>

      <DondeEstoy />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORES.crema,
  },

  icono: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORES.verdeClaro,
    marginTop: 20,
  },

  titulo: {
    marginTop: 18,
    fontSize: 27,
    fontWeight: '800',
    color: COLORES.texto,
    textAlign: 'center',
  },

  descripcion: {
    marginTop: 8,
    color: COLORES.textoSecundario,
    textAlign: 'center',
  },

  input: {
    minHeight: 140,
    marginTop: 24,
    padding: 15,
    borderRadius: 18,
    backgroundColor: COLORES.blanco,
    color: COLORES.texto,
    textAlignVertical: 'top',
    ...SOMBRA,
  },

  info: {
    marginTop: 10,
    color: COLORES.textoSecundario,
    fontSize: 12,
  },
});