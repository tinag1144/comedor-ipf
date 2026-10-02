import { router, Stack } from 'expo-router';
import { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

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

    /*
      Después del login navegamos a cocina.

      Como login está protegido con !conSesion,
      al iniciar sesión deja de existir en el historial.
    */
    router.replace('/cocina');
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Login cocina',
        }}
      />

      <Text style={styles.titulo}>
        Acceso de cocina
      </Text>

      <Text style={styles.descripcion}>
        Ingresá con las credenciales del personal.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Usuario"
        value={usuario}
        onChangeText={setUsuario}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Clave"
        value={clave}
        onChangeText={setClave}
        secureTextEntry
      />

      {error ? (
        <Text style={styles.error}>
          {error}
        </Text>
      ) : null}

      <Pressable
        style={styles.boton}
        onPress={ingresar}
      >
        <Text style={styles.textoBoton}>
          Ingresar
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  descripcion: {
    marginBottom: 20,
    color: '#666666',
  },

  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },

  error: {
    color: '#ef476f',
    marginBottom: 12,
  },

  boton: {
    backgroundColor: '#118ab2',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },

  textoBoton: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});