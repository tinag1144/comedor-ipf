# Comedor IPF

Trabajo Práctico N° 2 — Expo Router: rutas, navegación, pilas y colas.

Tecnicatura Superior en Desarrollo de Software Multiplataforma  
Instituto Politécnico Formosa  
Taller Complementario – React Native II

## Descripción

Comedor IPF es una aplicación desarrollada con React Native, Expo SDK 57, Expo Router y TypeScript.

La aplicación permite que un usuario pueda:

- Consultar el menú del comedor.
- Ver los platos agrupados por categoría.
- Consultar el detalle de cada plato.
- Agregar productos al carrito.
- Deshacer el último producto agregado.
- Agregar una nota para cocina.
- Confirmar un pedido.
- Obtener un número de turno.
- Consultar cuántos pedidos tiene adelante.
- Buscar platos mediante parámetros en la URL.
- Acceder a una sección protegida para cocina.
- Atender los pedidos respetando el orden de llegada.
- Consultar el historial de pedidos atendidos.

---

## Tecnologías utilizadas

- React Native
- Expo SDK 57
- Expo Router
- TypeScript
- React Context
- `@expo/vector-icons`
- `react-native-gesture-handler`
- `react-native-reanimated`

---

## Estructura general del proyecto

```text
src/
├── app/
│   ├── _layout.tsx
│   ├── +not-found.tsx
│   ├── buscar.tsx
│   ├── confirmar.tsx
│   ├── login.tsx
│   ├── pedido.tsx
│   │
│   ├── (tabs)/
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   │
│   │   ├── menu/
│   │   │   ├── _layout.tsx
│   │   │   ├── index.tsx
│   │   │   └── [id].tsx
│   │   │
│   │   └── carrito/
│   │       ├── _layout.tsx
│   │       ├── index.tsx
│   │       └── nota.tsx
│   │
│   ├── categorias/
│   │   └── [categoria].tsx
│   │
│   ├── turno/
│   │   └── [numero].tsx
│   │
│   ├── cocina/
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   └── atendidos.tsx
│   │
│   └── ayuda/
│       ├── index.tsx
│       └── [...slug].tsx
│
├── components/
│   └── DondeEstoy.tsx
│
├── context/
│   └── AppContext.tsx
│
├── data/
│   └── plato.ts
│
└── estructuras/
    ├── Pila.ts
    └── Cola.ts
```

---

# Navegadores utilizados

## Stack raíz

El navegador principal se encuentra en:

```text
src/app/_layout.tsx
```

El Stack raíz contiene la navegación principal de la aplicación.

Dentro de él se encuentra `(tabs)` y también las pantallas que deben mostrarse por encima de las pestañas, por ejemplo:

- `/confirmar`
- `/turno/[numero]`
- `/login`
- `/cocina`

También se utiliza `Stack.Protected` para controlar el acceso a Login y Cocina dependiendo de si hay una sesión iniciada.

---

## Tabs

Las pestañas principales se encuentran en:

```text
src/app/(tabs)/_layout.tsx
```

Las secciones principales son:

- Inicio
- Menú
- Carrito

El carrito muestra un badge con la cantidad de productos agregados.

Cada pestaña permite acceder rápidamente a una sección principal de la aplicación.

---

## Stack de Menú

Está definido en:

```text
src/app/(tabs)/menu/_layout.tsx
```

Permite navegar desde:

```text
/menu
```

hacia:

```text
/menu/[id]
```

Por ejemplo:

```text
/menu/4
```

El detalle permanece dentro de la pestaña Menú, por lo que la barra de pestañas continúa disponible.

---

## Stack de Carrito

Está definido en:

```text
src/app/(tabs)/carrito/_layout.tsx
```

Permite navegar entre:

```text
/carrito
```

y:

```text
/carrito/nota
```

La nota del carrito permite enviar una aclaración opcional a Cocina.

---

## Drawer de Cocina

La sección Cocina tiene su propio navegador Drawer:

```text
src/app/cocina/_layout.tsx
```

Contiene:

- Pedido actual.
- Pedidos atendidos.

Esta sección solamente existe cuando hay una sesión iniciada.

---

# Pila

La aplicación implementa una clase propia:

```text
src/estructuras/Pila.ts
```

La pila utiliza el principio:

```text
LIFO
Last In, First Out
```

Esto significa que el último elemento que entra es el primero que sale.

La aplicación utiliza una pila principalmente para implementar la función:

```text
Deshacer último
```

Cada vez que se agrega un plato al carrito se realiza un `push()`.

Cuando el usuario toca "Deshacer último", se realiza un `pop()`.

De esta manera se elimina primero el último producto que fue agregado.

También se utiliza otra pila para almacenar los pedidos atendidos.

Esto permite mostrar primero el último pedido que fue atendido.

---

# Cola

La aplicación también implementa una estructura propia:

```text
src/estructuras/Cola.ts
```

La cola funciona según:

```text
FIFO
First In, First Out
```

El primer pedido que entra es el primero que debe ser atendido.

Cuando un usuario confirma un pedido:

1. Se le asigna un número correlativo.
2. El pedido se encola.
3. Cocina consulta el pedido ubicado en el frente de la cola.
4. Al tocar "Atender siguiente", el pedido se desencola.

De esta manera ningún pedido puede adelantarse a otro.

La Cola implementada no utiliza `shift()`.

En su lugar utiliza un índice interno para indicar cuál es el elemento que actualmente se encuentra al frente.

---

# Estado global

El estado general de la aplicación se encuentra en:

```text
src/context/AppContext.tsx
```

El Context contiene información compartida por distintas pantallas, por ejemplo:

- Carrito.
- Nota del pedido.
- Cola de pedidos.
- Pila de acciones para deshacer.
- Pila de pedidos atendidos.
- Sesión de Cocina.

El `AppProvider` se coloca en el layout raíz para que todas las pantallas puedan acceder al estado.

---

# Confirmación del pedido y router.replace

Después de confirmar un pedido se utiliza:

```ts
router.replace({
  pathname: '/turno/[numero]',
  params: {
    numero: numero.toString(),
  },
});
```

Se utiliza `replace` en lugar de `push` porque la pantalla `/confirmar` ya no tiene sentido una vez que el pedido fue creado.

El flujo es:

```text
Carrito
   ↓
Confirmar
   ↓
Turno
```

Si se utilizara `push`, la pantalla `/confirmar` permanecería debajo de `/turno`.

Entonces el usuario podría tocar Atrás y regresar a una confirmación que ya fue realizada.

Con `replace`, `/confirmar` es reemplazada por `/turno/[numero]`.

Por esta razón el botón Atrás no vuelve a la confirmación.

---

# Rutas dinámicas

La aplicación utiliza distintas rutas dinámicas.

## Plato

```text
/menu/[id]
```

Ejemplo:

```text
/menu/4
```

El parámetro se obtiene con:

```ts
useLocalSearchParams()
```

Los parámetros de una URL llegan como texto, por lo que el id se convierte antes de compararlo:

```ts
const idNumerico = Number(id);
```

---

## Categoría

```text
/categorias/[categoria]
```

Ejemplo:

```text
/categorias/bebidas
```

La aplicación valida que la categoría recibida sea una de las categorías permitidas.

---

## Turno

```text
/turno/[numero]
```

Ejemplo:

```text
/turno/3
```

La pantalla utiliza el número recibido para localizar el pedido dentro de la cola y calcular cuántos pedidos tiene adelante.

---

# Buscador

La aplicación tiene una pantalla:

```text
/buscar
```

que puede recibir parámetros de búsqueda.

Ejemplo:

```text
/buscar?q=chipa&categoria=desayuno
```

Los parámetros se leen utilizando:

```ts
useLocalSearchParams()
```

Cuando cambia el texto o la categoría se utiliza:

```ts
router.setParams()
```

Esto permite actualizar la URL sin agregar una nueva pantalla al Stack.

También hace posible compartir una búsqueda mediante su URL.

---

# Ayuda y catch-all

La sección Ayuda utiliza:

```text
src/app/ayuda/index.tsx
```

para:

```text
/ayuda
```

y:

```text
src/app/ayuda/[...slug].tsx
```

para rutas de profundidad variable.

Ejemplos:

```text
/ayuda/horarios
/ayuda/pagos/efectivo
/ayuda/pagos/tarjeta
/ayuda/pedidos/cancelacion
```

El parámetro `slug` contiene los diferentes segmentos de la URL.

---

# Rutas protegidas

Las rutas de Cocina y Login se controlan desde el Stack raíz mediante:

```tsx
<Stack.Protected>
```

Cuando existe una sesión iniciada:

```text
/cocina
```

está disponible.

Cuando no existe una sesión:

```text
/login
```

está disponible.

Cuando el usuario cierra sesión, las rutas de Cocina dejan de formar parte de la navegación.

Por eso no es necesario ejecutar manualmente `router.back()`.

---

# Redirect

La ruta antigua:

```text
/pedido
```

redirige automáticamente hacia:

```text
/carrito
```

utilizando:

```tsx
<Redirect href="/carrito" />
```

Se utiliza una redirección para evitar mantener una ruta antigua en la pila.

---

# Página 404

La pantalla:

```text
src/app/+not-found.tsx
```

se utiliza cuando el usuario intenta acceder a una ruta que no existe.

Por ejemplo:

```text
/algo-que-no-existe
```

La pantalla muestra un mensaje 404 y también la ruta que intentó abrir el usuario.

---

# DondeEstoy

El componente:

```text
src/components/DondeEstoy.tsx
```

es utilizado para depurar la navegación.

Utiliza:

```ts
usePathname()
useSegments()
useLocalSearchParams()
```

Esto permite observar:

- La ruta actual.
- Los segmentos utilizados por Expo Router.
- Los parámetros de la pantalla.

El componente puede ocultarse cambiando la constante `DEBUG`.

---

# Scheme

En:

```text
app.json
```

se configuró:

```json
"scheme": "comedoripf"
```

Esto permite utilizar deep links en una build de la aplicación.

Por ejemplo:

```text
comedoripf://menu/7
```

abre directamente el plato número 7.

---

# Deep link con Expo Go

Durante el desarrollo con Expo Go se utiliza una URL con este formato:

```text
exp://IP-DE-LA-PC:8081/--/menu/7
```

Ejemplo:

```text
exp://192.168.1.20:8081/--/menu/7
```

La IP debe reemplazarse por la IP real de la computadora que está ejecutando Expo.

La parte:

```text
/--/
```

separa la dirección utilizada por Expo Go de la ruta interna de nuestra aplicación.

---

# Anchor

En el layout raíz se utiliza:

```ts
export const unstable_settings = {
  anchor: '(tabs)',
};
```

El objetivo es que `(tabs)` funcione como pantalla base cuando la aplicación se abre directamente mediante determinados deep links.

Por ejemplo:

```text
/categorias/bebidas
```

puede abrirse dejando las Tabs debajo de esa pantalla.

---

# Rutas tipadas

En `app.json` se encuentra:

```json
"typedRoutes": true
```

Esto permite que TypeScript compruebe que las rutas utilizadas en `Link`, `router.push`, `router.replace`, etc. sean válidas.

Por ejemplo:

```tsx
<Link href="/menu" />
```

es válido.

Pero una ruta inexistente como:

```tsx
<Link href="/meniu" />
```

produce un error de TypeScript.

---

# Credenciales de Cocina

Para realizar las pruebas de la sección Cocina se utilizan:

```text
Usuario: cocina
Clave: 1234
```

---

# Capturas

## Carrito con Deshacer

Agregar captura del carrito con productos y el botón:

```text
Deshacer último
```

## Turno

Agregar captura de una pantalla:

```text
/turno/[numero]
```

## Cocina

Agregar captura de Cocina mostrando un pedido y utilizando:

```text
Atender siguiente
```

## Login y Logout

Agregar una captura del acceso a Cocina y otra luego de cerrar sesión.

## Página 404

Agregar una captura accediendo a una dirección inexistente.

Ejemplo:

```text
/no-existe
```

---

# Cómo ejecutar el proyecto

Iniciar Expo:

```bash
npx expo start
```

Si es necesario limpiar la caché:

```bash
npx expo start -c
```

Para iniciar la versión web:

```bash
npx expo start --web
```