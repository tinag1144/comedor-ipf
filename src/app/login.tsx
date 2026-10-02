import Ionicons from '@expo/vector-icons/Ionicons';
import { router, Stack } from 'expo-router';
import { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import DondeEstoy from '@/components/DondeEstoy';
import { COLORES, SOMBRA } from '@/constants/theme';
import { useApp } from '@/context/AppContext';

export default function LoginScreen() {
  const { iniciarSesion } = useApp();

  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');

  function ingresar() {
    const ingresoCorrecto = iniciarSesion(usuario, clave);

    if (!ingresoCorrecto) {
      setError('Usuario o clave incorrectos.');
      return;
    }

    setError('');
    router.replace('/cocina');
  }

  return (
    <View style={styles.pantalla}>
      <Stack.Screen
        options={{
          title: 'Acceso Cocina',
          headerStyle: {
            backgroundColor: COLORES.azul,
          },
          headerTintColor: COLORES.crema,
        }}
      />

      <View style={styles.tarjeta}>
        <View style={styles.icono}>
          <Ionicons
            name="person-circle-outline"
            size={52}
            color={COLORES.verde}
          />
        </View>

        <Text style={styles.titulo}>
          Acceso de cocina
        </Text>

        <Text style={styles.descripcion}>
          Ingresá con las credenciales del personal.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Usuario"
          placeholderTextColor={COLORES.textoSecundario}
          value={usuario}
          onChangeText={setUsuario}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Clave"
          placeholderTextColor={COLORES.textoSecundario}
          value={clave}
          onChangeText={setClave}
          secureTextEntry
        />

        {error ? (
          <Text style={styles.error}>{error}</Text>
        ) : null}

        <Pressable
          style={styles.boton}
          onPress={ingresar}
        >
          <Text style={styles.textoBoton}>
            Ingresar
          </Text>
        </Pressable>

        <Text style={styles.ayuda}>
          Usuario: cocina · Clave: 1234
        </Text>

        <DondeEstoy />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: COLORES.crema,
  },

  tarjeta: {
    backgroundColor: COLORES.blanco,
    padding: 24,
    borderRadius: 24,
    ...SOMBRA,
  },

  icono: {
    alignItems: 'center',
    marginBottom: 10,
  },

  titulo: {
    fontSize: 27,
    fontWeight: '800',
    color: COLORES.texto,
    textAlign: 'center',
  },

  descripcion: {
    textAlign: 'center',
    color: COLORES.textoSecundario,
    marginTop: 7,
    marginBottom: 22,
  },

  input: {
    borderWidth: 1,
    borderColor: COLORES.borde,
    backgroundColor: COLORES.cremaClaro,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    color: COLORES.texto,
  },

  error: {
    color: COLORES.error,
    marginBottom: 12,
  },

  boton: {
    backgroundColor: COLORES.verde,
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
  },

  textoBoton: {
    color: COLORES.blanco,
    fontWeight: '800',
    fontSize: 16,
  },

  ayuda: {
    marginTop: 16,
    textAlign: 'center',
    color: COLORES.textoSecundario,
    fontSize: 12,
  },
});