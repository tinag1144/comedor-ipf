import { Stack } from "expo-router";
import { StyleSheet, Text, TextInput, View } from "react-native";

import { useApp } from "@/context/AppContext";

export default function NotaCarritoScreen() {
  const { nota, setNota } = useApp();

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Nota para cocina",
        }}
      />

      <Text style={styles.titulo}>Aclaración para cocina</Text>

      <Text style={styles.descripcion}>
        Podés agregar una nota opcional para tu pedido.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Ejemplo: sin sal"
        value={nota}
        onChangeText={setNota}
        multiline
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },

  descripcion: {
    fontSize: 16,
    color: "#666666",
    marginBottom: 20,
  },

  input: {
    minHeight: 120,
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 10,
    padding: 12,
    textAlignVertical: "top",
  },
});
