// Categorías válidas de platos.
export type CategoriaPlato = "desayuno" | "almuerzo" | "bebidas" | "kiosco";

// Esta interfaz define la forma que debe tener cada plato.
export interface Plato {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  categoria: CategoriaPlato;
}

// Lista de platos disponibles en el comedor.
// Todos los elementos deben respetar la interfaz Plato.
export const platos: Plato[] = [
  {
    id: 1,
    nombre: "Chipa",
    precio: 1500,
    descripcion: "Chipa casera.",
    categoria: "desayuno",
  },
  {
    id: 2,
    nombre: "Café con leche",
    precio: 1200,
    descripcion: "Café con leche caliente.",
    categoria: "desayuno",
  },
  {
    id: 3,
    nombre: "Tostadas",
    precio: 1300,
    descripcion: "Tostadas con manteca y mermelada.",
    categoria: "desayuno",
  },

  {
    id: 4,
    nombre: "Milanesa con puré",
    precio: 4500,
    descripcion: "Milanesa de carne acompañada con puré.",
    categoria: "almuerzo",
  },
  {
    id: 5,
    nombre: "Pollo con arroz",
    precio: 4200,
    descripcion: "Pollo al horno con arroz.",
    categoria: "almuerzo",
  },
  {
    id: 6,
    nombre: "Tarta de verdura",
    precio: 3500,
    descripcion: "Porción de tarta de verdura.",
    categoria: "almuerzo",
  },

  {
    id: 7,
    nombre: "Agua",
    precio: 1000,
    descripcion: "Botella de agua mineral.",
    categoria: "bebidas",
  },
  {
    id: 8,
    nombre: "Gaseosa",
    precio: 1500,
    descripcion: "Gaseosa individual.",
    categoria: "bebidas",
  },
  {
    id: 9,
    nombre: "Jugo",
    precio: 1300,
    descripcion: "Jugo de frutas.",
    categoria: "bebidas",
  },

  {
    id: 10,
    nombre: "Alfajor",
    precio: 1200,
    descripcion: "Alfajor de chocolate.",
    categoria: "kiosco",
  },
  {
    id: 11,
    nombre: "Galletitas",
    precio: 1000,
    descripcion: "Paquete individual de galletitas.",
    categoria: "kiosco",
  },
  {
    id: 12,
    nombre: "Barra de cereal",
    precio: 900,
    descripcion: "Barra de cereal individual.",
    categoria: "kiosco",
  },
];
