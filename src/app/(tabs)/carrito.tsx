import { StyleSheet, Text, View } from 'react-native';

export default function CarritoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Carrito</Text>
      <Text>Todavía no agregaste platos.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});