import { Link } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { CategoriaPlato, platos } from "@/data/plato";

// Lista de categorías que queremos mostrar.
// La tipamos como CategoriaPlato[] para que TypeScript
// solo permita categorías válidas.
const categorias: CategoriaPlato[] = [
  "desayuno",
  "almuerzo",
  "bebidas",
  "kiosco",
];

export default function MenuScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Menú</Text>

      {categorias.map((categoria) => {
        // filter() devuelve solamente los platos
        // que pertenecen a esta categoría.
        const platosDeCategoria = platos.filter(
          (plato) => plato.categoria === categoria,
        );

        return (
          <View key={categoria} style={styles.seccion}>
            <Text style={styles.categoria}>{categoria.toUpperCase()}</Text>

            {platosDeCategoria.map((plato) => (
              <Link
                key={plato.id}
                href={{
                  pathname: "/menu/[id]",
                  params: { id: plato.id.toString() },
                }}
                style={styles.tarjeta}
              >
                <View>
                  <Text style={styles.nombre}>{plato.nombre}</Text>
                  <Text style={styles.descripcion}>{plato.descripcion}</Text>
                  <Text style={styles.precio}>${plato.precio}</Text>
                </View>
              </Link>
            ))}
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 24,
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
  },

  seccion: {
    gap: 12,
  },

  categoria: {
    fontSize: 18,
    fontWeight: "bold",
  },

  tarjeta: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#dddddd",
    borderRadius: 10,
  },

  nombre: {
    fontSize: 18,
    fontWeight: "600",
  },

  descripcion: {
    marginTop: 4,
    color: "#666666",
  },

  precio: {
    marginTop: 8,
    fontWeight: "bold",
  },
});
