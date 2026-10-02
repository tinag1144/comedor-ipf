import { createContext, ReactNode, useContext, useRef, useState } from "react";

import { Plato } from "@/data/plato";
import { Cola } from "@/estructuras/Cola";
import { Pila } from "@/estructuras/Pila";

// Representa un pedido ya confirmado.
export interface Pedido {
  numero: number;
  items: Plato[];
  nota: string;
}

// Define todo lo que el Context va a compartir con la app.
interface AppContextType {
  carrito: Plato[];
  agregarAlCarrito: (plato: Plato) => void;
  deshacerUltimo: () => void;
  puedeDeshacer: boolean;

  nota: string;
  setNota: (nota: string) => void;

  confirmarPedido: () => number | null;

  pedidosEnEspera: Pedido[];
  pedidoActual: Pedido | undefined;
  atenderSiguiente: () => void;

  pedidosAtendidos: Pedido[];

  usuario: string | null;
  iniciarSesion: (usuario: string, clave: string) => boolean;
  cerrarSesion: () => void;
}

// Creamos el Context.
// Al principio es undefined porque todavía no está dentro del Provider.
const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  // -------------------------
  // ESTADOS DE REACT
  // -------------------------

  const [carrito, setCarrito] = useState<Plato[]>([]);
  const [nota, setNota] = useState("");
  const [usuario, setUsuario] = useState<string | null>(null);

  /*
    Estas variables no guardan información útil por sí mismas.
    Solo sirven para forzar un nuevo render cuando cambia
    una Pila o Cola, porque esas estructuras no son estados de React.
  */
  const [, setVersionCarrito] = useState(0);
  const [, setVersionPedidos] = useState(0);
  const [, setVersionAtendidos] = useState(0);

  // -------------------------
  // ESTRUCTURAS DE DATOS
  // -------------------------

  /*
    useRef mantiene la misma instancia entre renders.
    Así no recreamos la Pila o Cola cada vez que React renderiza.
  */
  const pilaDeshacer = useRef(new Pila<Plato>()).current;

  const colaPedidos = useRef(new Cola<Pedido>()).current;

  const pilaAtendidos = useRef(new Pila<Pedido>()).current;

  // Guarda el próximo número correlativo de pedido.
  const proximoNumero = useRef(1);

  // -------------------------
  // CARRITO
  // -------------------------

  function agregarAlCarrito(plato: Plato) {
    // Agregamos el plato al carrito.
    setCarrito((carritoActual) => [...carritoActual, plato]);

    // También guardamos esa acción en la pila.
    pilaDeshacer.push(plato);

    setVersionCarrito((version) => version + 1);
  }

  function deshacerUltimo() {
    // Sacamos el último plato agregado.
    const ultimoPlato = pilaDeshacer.pop();

    // Si la pila estaba vacía, no hacemos nada.
    if (!ultimoPlato) {
      return;
    }

    setCarrito((carritoActual) => {
      /*
        Buscamos desde el final la última aparición
        de ese plato dentro del carrito.
      */
      let indice = -1;

      for (let i = carritoActual.length - 1; i >= 0; i--) {
        if (carritoActual[i].id === ultimoPlato.id) {
          indice = i;
          break;
        }
      }

      if (indice === -1) {
        return carritoActual;
      }

      // Creamos una copia para no modificar directamente el estado.
      const nuevoCarrito = [...carritoActual];

      nuevoCarrito.splice(indice, 1);

      return nuevoCarrito;
    });

    setVersionCarrito((version) => version + 1);
  }

  const puedeDeshacer = !pilaDeshacer.vacia;

  // -------------------------
  // CONFIRMAR PEDIDO
  // -------------------------

  function confirmarPedido(): number | null {
    // No permitimos confirmar si el carrito está vacío.
    if (carrito.length === 0) {
      return null;
    }

    const numero = proximoNumero.current;

    const nuevoPedido: Pedido = {
      numero,
      items: [...carrito],
      nota,
    };

    // El pedido entra al final de la cola.
    colaPedidos.encolar(nuevoPedido);

    // Preparamos el siguiente número.
    proximoNumero.current++;

    // Limpiamos carrito y nota.
    setCarrito([]);
    setNota("");

    // Limpiamos también la pila de deshacer.
    while (!pilaDeshacer.vacia) {
      pilaDeshacer.pop();
    }

    setVersionCarrito((version) => version + 1);
    setVersionPedidos((version) => version + 1);

    // Devolvemos el número para poder navegar a /turno/[numero].
    return numero;
  }

  // -------------------------
  // COCINA
  // -------------------------

  function atenderSiguiente() {
    // Sacamos el pedido que está al frente de la cola.
    const pedidoAtendido = colaPedidos.desencolar();

    if (!pedidoAtendido) {
      return;
    }

    // Guardamos el pedido atendido en otra pila.
    pilaAtendidos.push(pedidoAtendido);

    setVersionPedidos((version) => version + 1);
    setVersionAtendidos((version) => version + 1);
  }

  // Convertimos las estructuras a arrays para poder mostrarlas.
  const pedidosEnEspera = colaPedidos.aArray();

  const pedidoActual = colaPedidos.frente();

  /*
    aArray() devuelve base -> tope.
    reverse() lo cambia para mostrar el último atendido primero.
  */
  const pedidosAtendidos = pilaAtendidos.aArray().reverse();

  // -------------------------
  // LOGIN
  // -------------------------

  function iniciarSesion(usuarioIngresado: string, clave: string): boolean {
    // Credenciales fijas, como pide el TP.
    if (usuarioIngresado === "cocina" && clave === "1234") {
      setUsuario(usuarioIngresado);
      return true;
    }

    return false;
  }

  function cerrarSesion() {
    setUsuario(null);
  }

  // -------------------------
  // PROVIDER
  // -------------------------

  return (
    <AppContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        deshacerUltimo,
        puedeDeshacer,

        nota,
        setNota,

        confirmarPedido,

        pedidosEnEspera,
        pedidoActual,
        atenderSiguiente,

        pedidosAtendidos,

        usuario,
        iniciarSesion,
        cerrarSesion,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// Hook personalizado para usar el Context más fácilmente.
export function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useApp debe utilizarse dentro de AppProvider");
  }

  return context;
}
