import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import DondeEstoy from '@/components/DondeEstoy';
import { useApp } from '@/context/AppContext';

export default function InicioScreen() {
  const { usuario } = useApp();
  return (
    <ScrollView
      style={styles.pantalla}
      contentContainerStyle={styles.container}
    >
      <View style={styles.header}>
        <Image
          source={require('../../../assets/images/polo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.nombreInstituto}>
          Comedor <Text style={styles.ipf}>IPF</Text>
        </Text>

        <Text style={styles.frase}>
          Instituto Politécnico Formosa
        </Text>
      </View>

      <View style={styles.bienvenida}>
        <Text style={styles.saludo}>¡Hola!</Text>

        <Text style={styles.descripcion}>
          Qué bueno verte por acá. Explorá el menú,
          hacé tu pedido y disfrutá del Comedor IPF.
        </Text>
      </View>

      <Text style={styles.subtitulo}>
        Accesos rápidos
      </Text>

      <View style={styles.grid}>
        <Link href="/menu" style={styles.tarjetaPrincipal}>
          <View>
            <View style={styles.iconoPrincipal}>
              <Ionicons
                name="restaurant"
                size={26}
                color="#f7f0dc"
              />
            </View>

            <Text style={styles.tituloPrincipal}>
              Menú
            </Text>

            <Text style={styles.textoPrincipal}>
              Ver platos disponibles
            </Text>
          </View>
        </Link>

        <Link href="/buscar" style={styles.tarjeta}>
          <View>
            <View style={styles.icono}>
              <Ionicons
                name="search"
                size={26}
                color="#2f4652"
              />
            </View>

            <Text style={styles.tarjetaTitulo}>
              Buscar
            </Text>

            <Text style={styles.tarjetaTexto}>
              Encontrá tu plato
            </Text>
          </View>
        </Link>

        <Link href="/ayuda" style={styles.tarjeta}>
          <View>
            <View style={styles.icono}>
              <Ionicons
                name="help-circle-outline"
                size={28}
                color="#2f4652"
              />
            </View>

            <Text style={styles.tarjetaTitulo}>
              Ayuda
            </Text>

            <Text style={styles.tarjetaTexto}>
              Consultas frecuentes
            </Text>
          </View>
        </Link>

<Link
  href={usuario ? '/cocina' : '/login'}
  style={styles.tarjeta}
>
  <View>
    <View style={styles.icono}>
      <Ionicons
        name={usuario ? 'restaurant' : 'log-in-outline'}
        size={27}
        color="#2f4652"
      />
    </View>

    <Text style={styles.tarjetaTitulo}>
      {usuario ? 'Ir a Cocina' : 'Acceso Cocina'}
    </Text>

    <Text style={styles.tarjetaTexto}>
      {usuario
        ? 'Gestionar pedidos'
        : 'Ingresar como personal'}
    </Text>
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
    backgroundColor: '#f7f0dc',
  },

  container: {
    paddingBottom: 35,
  },

  header: {
    backgroundColor: '#2f4652',
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 32,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },

  logo: {
    width: 150,
    height: 150,
  },

  nombreInstituto: {
    marginTop: 4,
    fontSize: 30,
    fontWeight: '800',
    color: '#f7f0dc',
  },

  ipf: {
    color: '#16a01d',
  },

  frase: {
    marginTop: 6,
    color: '#f7f0dc',
    fontSize: 13,
    letterSpacing: 1,
  },

  bienvenida: {
    marginHorizontal: 20,
    marginTop: -18,
    padding: 22,
    backgroundColor: '#ffffff',
    borderRadius: 22,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,

    elevation: 4,
  },

  saludo: {
    fontSize: 30,
    fontWeight: '800',
    color: '#17313d',
  },

  descripcion: {
    marginTop: 8,
    fontSize: 16,
    lineHeight: 23,
    color: '#6b7b83',
  },

  subtitulo: {
    marginHorizontal: 20,
    marginTop: 28,
    marginBottom: 14,
    fontSize: 21,
    fontWeight: '800',
    color: '#17313d',
  },

  grid: {
    marginHorizontal: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },

  tarjetaPrincipal: {
    width: '48%',
    minHeight: 150,
    padding: 18,
    backgroundColor: '#2f4652',
    borderRadius: 20,
    overflow: 'hidden',
  },

  tarjeta: {
    width: '48%',
    minHeight: 150,
    padding: 18,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    overflow: 'hidden',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,

    elevation: 3,
  },

  iconoPrincipal: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3d5966',
    marginBottom: 18,
  },

  icono: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0ead8',
    marginBottom: 18,
  },

  tituloPrincipal: {
    fontSize: 19,
    fontWeight: '800',
    color: '#ffffff',
  },

  textoPrincipal: {
    marginTop: 5,
    color: '#d9e0e3',
  },

  tarjetaTitulo: {
    fontSize: 19,
    fontWeight: '800',
    color: '#17313d',
  },

  tarjetaTexto: {
    marginTop: 5,
    color: '#6b7b83',
  },
});