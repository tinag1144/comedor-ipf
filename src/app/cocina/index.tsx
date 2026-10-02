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

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 15,
    backgroundColor: COLORES.crema,
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

  nota: {
    marginTop: 10,
    padding: 12,
    backgroundColor: COLORES.azulClaro,
    borderRadius: 12,
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
});