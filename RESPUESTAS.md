# RESPUESTAS — Trabajo Práctico N° 2

## Parte A — Estructuras de datos: pila y cola

### A1. Conceptos

#### a)

LIFO significa `Last In, First Out`, es decir, el último elemento que entra es el primero que sale.

Corresponde a una **pila**.

FIFO significa `First In, First Out`, es decir, el primer elemento que entra es el primero que sale.

Corresponde a una **cola**.

#### b)

En una pila los elementos se agregan y se quitan por el mismo extremo, llamado tope.

En una cola los elementos entran por el final y salen por el frente.

#### c)

Ejemplo de pila en la vida real:

Una pila de platos. El último plato que se coloca arriba es el primero que se retira.

Ejemplo en una aplicación:

La opción "Deshacer". La última acción realizada debe ser la primera que se deshace.

Ejemplo de cola en la vida real:

Una fila de personas esperando para ser atendidas.

Ejemplo en una aplicación:

Una cola de pedidos de un comedor. El primer pedido confirmado debe ser el primero que atiende Cocina.

---

### A2. Seguimiento de una pila

Código:

```js
const p = new Pila();

p.push('Inicio');
p.push('Productos');
p.push('Detalle 3');
p.pop();
p.push('Perfil');

console.log(p.tope());
console.log(p.pop());
console.log(p.tope());
console.log(p.vacia);
```

Resultados:

```text
(1) Perfil
(2) Perfil
(3) Productos
(4) false
```

Después del último `console.log`, la pila queda:

```text
Base → Inicio → Productos ← Tope
```

---

### A3. Seguimiento de una cola

Código:

```js
const c = new Cola();

c.encolar('Ana');
c.encolar('Beto');
c.desencolar();
c.encolar('Caro');
c.encolar('Dani');

console.log(c.frente());
console.log(c.desencolar());
console.log(c.vacia);
```

Resultados:

```text
(1) Beto
(2) Beto
(3) false
```

La cola final queda:

```text
Frente → Caro → Dani → Final
```

---

### A4. Análisis de la implementación

#### a)

El símbolo `#` indica que una propiedad es privada.

Por ejemplo:

```js
#items
```

solamente puede utilizarse desde dentro de la propia clase.

Esto evita que otro código pueda modificar directamente el array interno y romper el funcionamiento de la estructura.

#### b)

`shift()` elimina el primer elemento de un array.

El problema es que después de eliminarlo deben desplazarse los índices de todos los elementos restantes.

En una cola muy grande esto puede afectar el rendimiento.

Una solución es mantener un índice que indique cuál es el frente actual de la cola.

Así no es necesario desplazar todos los elementos.

#### c)

Una pila normalmente utiliza:

```js
pop()
```

porque debe eliminar el último elemento.

Una cola puede utilizar:

```js
shift()
```

porque debe eliminar el primer elemento.

No pueden utilizar el mismo método porque representan comportamientos diferentes:

```text
Pila → LIFO
Cola → FIFO
```

---

### A5. Cola eficiente

```js
class ColaEficiente {
  #items = [];
  #indiceFrente = 0;

  encolar(x) {
    this.#items.push(x);
  }

  desencolar() {
    if (this.vacia) {
      return undefined;
    }

    const elemento = this.#items[this.#indiceFrente];

    this.#indiceFrente++;

    if (this.vacia) {
      this.#items = [];
      this.#indiceFrente = 0;
    }

    return elemento;
  }

  frente() {
    if (this.vacia) {
      return undefined;
    }

    return this.#items[this.#indiceFrente];
  }

  get vacia() {
    return this.tamanio === 0;
  }

  get tamanio() {
    return this.#items.length - this.#indiceFrente;
  }
}
```

La ventaja es que no utiliza `shift()`.

---

### A6. Pila y cola dentro de Expo Router

#### a)

El historial de pantallas de un Stack se puede entender como una pila.

La pantalla visible es la que se encuentra en el tope.

Cuando el usuario toca Atrás se elimina la pantalla del tope y vuelve a mostrarse la anterior.

#### b)

Las acciones de navegación pueden procesarse como una cola.

Si el usuario genera dos acciones rápidamente, se procesan respetando su orden de llegada.

---

# Parte B — Rutas basadas en archivos

## B1. Del archivo a la URL

| Archivo | URL / función |
|---|---|
| `src/app/(tabs)/index.tsx` | `/` |
| `src/app/acerca.tsx` | `/acerca` |
| `src/app/(tabs)/perfil.tsx` | `/perfil` |
| `src/app/(tabs)/productos/index.tsx` | `/productos` |
| `src/app/(tabs)/productos/[id].tsx` | `/productos/:id` |
| `src/app/docs/[...slug].tsx` | `/docs/...` |
| `src/app/_layout.tsx` | No genera una URL. Configura el navegador. |
| `src/app/+not-found.tsx` | Pantalla para rutas que no existen. |
| `src/app/Boton.tsx` | Generaría una ruta `/Boton`, aunque probablemente sea un error de organización porque los componentes no deberían estar dentro de `app`. |

La carpeta `(tabs)` no aparece en la URL porque es un grupo de rutas.

---

## B2. De la URL al archivo

### `/categorias/bebidas`

```text
src/app/categorias/[categoria].tsx
```

### `/buscar?q=mate&categoria=kiosco`

```text
src/app/buscar.tsx
```

Los parámetros `q` y `categoria` son parámetros de búsqueda y no necesitan formar parte del nombre del archivo.

### `/ayuda/pagos/tarjeta` y `/ayuda/horarios`

```text
src/app/ayuda/[...slug].tsx
```

### `/ayuda`

```text
src/app/ayuda/index.tsx
```

---

## B3. Verdadero o falso

### a)

**Falso.**

Expo Router utiliza rutas basadas en archivos.

Las pantallas se crean según los archivos que existen dentro de `src/app`.

### b)

**Falso.**

`_layout.tsx` configura navegadores y layouts, pero no es una pantalla que el usuario visita directamente.

### c)

**Verdadero.**

Las carpetas entre paréntesis son grupos y no aparecen en la URL.

### d)

**Falso.**

En un proyecto Expo conviene utilizar:

```bash
npx expo install paquete
```

porque Expo instala una versión compatible con el SDK utilizado.

### e)

**Verdadero.**

```json
"main": "expo-router/entry"
```

permite que Expo Router sea el punto de entrada de la aplicación.

### f)

**Verdadero.**

`/_sitemap` permite visualizar las rutas disponibles y resulta útil para depuración.

### g)

**Verdadero.**

Si existe:

```text
docs/index.tsx
```

la URL:

```text
/docs
```

muestra ese archivo.

### h)

**Verdadero.**

En SDK 57 la versión principal utilizada por Expo Router corresponde a la versión del SDK.

---

# Parte C — Navegar: Link, router y la pila

## C1. Métodos de router

### `router.push(href)`

Agrega una nueva pantalla al tope de la pila.

### `router.navigate(href)`

Navega hacia una ruta.

Puede reutilizar una ruta que ya se encuentre en la navegación o agregarla si es necesario.

### `router.replace(href)`

Reemplaza la pantalla actual por otra.

La anterior deja de estar en esa posición de la pila.

### `router.back()`

Quita la pantalla actual y vuelve a la anterior.

### `router.dismissTo(href)`

Retrocede dentro de la pila hasta encontrar la ruta indicada.

### `router.dismissAll()`

Cierra las pantallas apiladas hasta volver al inicio del navegador.

### `router.canGoBack()`

Devuelve si existe o no una pantalla anterior a la cual volver.

### `router.setParams({...})`

Modifica los parámetros de la ruta actual sin agregar una pantalla nueva a la pila.

---

## C2. Simulación de la pila

La pila inicial es:

```text
[ /productos ]
```

### 1.

```js
router.push("/productos/1")
```

```text
[ /productos, /productos/1 ]
```

### 2.

```js
router.push("/productos/2")
```

```text
[ /productos, /productos/1, /productos/2 ]
```

### 3.

```js
router.navigate("/productos/5")
```

Como la ruta todavía no se encuentra en la pila:

```text
[ /productos, /productos/1, /productos/2, /productos/5 ]
```

### 4.

```js
router.push("/perfil")
```

```text
[ /productos, /productos/1, /productos/2, /productos/5, /perfil ]
```

### 5.

```js
router.replace("/buscar")
```

```text
[ /productos, /productos/1, /productos/2, /productos/5, /buscar ]
```

### 6.

```js
router.back()
```

```text
[ /productos, /productos/1, /productos/2, /productos/5 ]
```

### 7.

```js
router.dismissTo("/productos")
```

```text
[ /productos ]
```

### 8.

```js
router.canGoBack()
```

Devuelve:

```text
false
```

porque `/productos` es la única pantalla restante.

---

## C3. ¿Link o router?

### a) Tarjeta de producto

Usaría:

```tsx
<Link href="/productos/3">
```

porque la navegación ocurre directamente por una acción del usuario.

### b) Formulario guardado correctamente

Usaría:

```ts
router.replace('/exito');
```

porque primero se ejecuta una lógica y luego se navega.

Además evita volver accidentalmente al formulario ya enviado.

### c) Cancelar un modal

Usaría:

```ts
router.back();
```

porque quiero cerrar la pantalla actual.

### d) Login exitoso

Usaría:

```ts
router.replace('/');
```

porque la navegación ocurre después de comprobar las credenciales.

### e) Volver a una pantalla que está varias posiciones abajo

Usaría:

```ts
router.dismissTo('/pedidos');
```

porque permite volver directamente a una pantalla determinada de la pila.

---

## C4. Código

### a) Link al producto 8

```tsx
<Link
  href={{
    pathname: '/productos/[id]',
    params: {
      id: '8',
    },
  }}
>
  Producto 8
</Link>
```

### b) Link a Perfil que siempre apile

```tsx
<Link href="/perfil" push>
  Perfil
</Link>
```

### c) Pressable que funciona como Link

```tsx
<Link href="/carrito" asChild>
  <Pressable>
    <Text>Ir al carrito</Text>
  </Pressable>
</Link>
```

---

## C5. Link en web y celular

En web, un `Link` puede convertirse en un enlace real.

Esto permite comportamientos propios del navegador, como abrir el enlace en otra pestaña, copiar la dirección o compartirla.

En una aplicación móvil no existe normalmente una barra de direcciones visible, pero el sistema de rutas sigue permitiendo navegar entre pantallas y también utilizar deep links.

---

# Parte D — Navegadores: Stack, Tabs y Drawer

## D1. Comparación

| Característica | Stack | Tabs | Drawer |
|---|---|---|---|
| ¿Apila pantallas? | Sí | No directamente | No directamente |
| ¿Cómo cambia el usuario? | Navegando hacia adelante y atrás | Tocando pestañas | Abriendo un menú lateral |
| Importación | `expo-router` | `expo-router/js-tabs` | `expo-router/drawer` |
| Uso típico | Detalle de un producto | Secciones principales | Menú de administración |

---

## D2. Cada tab tiene su pila

Si el usuario está en Productos, abre el producto 4, cambia a Inicio y luego vuelve a Productos, debería volver a ver el detalle del producto 4.

Esto ocurre porque cada pestaña puede conservar su propio estado de navegación.

Un comportamiento similar puede verse en aplicaciones que tienen distintas secciones principales y conservan la pantalla donde el usuario estaba dentro de cada una.

---

## D3. ¿Dónde va cada pantalla?

### a)

Detalle de producto que mantiene las Tabs:

```text
Dentro del Stack de la tab Productos.
```

### b)

Modal para confirmar compra:

```text
Stack raíz.
```

### c)

Login como modal:

```text
Stack raíz.
```

### d)

Pedidos anteriores dentro de Perfil:

```text
Dentro de la tab Perfil.
```

---

## D4. Configurar el Stack

### a)

`screenOptions` configura opciones generales para todas las pantallas del Stack.

`options` de un `Stack.Screen` modifica solamente esa pantalla.

### b)

`(tabs)` usa:

```tsx
headerShown: false
```

porque las Tabs tienen su propia navegación y no queremos mostrar dos headers superpuestos.

### c)

Sí, la pantalla existe por el sistema de archivos aunque no se declare manualmente en `Stack.Screen`.

Declararla permite configurar opciones específicas, como título o tipo de presentación.

### d)

Algunos valores posibles de `presentation` son:

```text
card
modal
transparentModal
fullScreenModal
formSheet
```

Para una hoja inferior utilizaría:

```text
formSheet
```

### e)

Desde la propia pantalla:

```tsx
<Stack.Screen
  options={{
    title: 'Producto 7',
  }}
/>
```

---

## D5. Tabs y Drawer en SDK 57

### a)

Según la configuración trabajada para SDK 57, las JavaScript Tabs se importan desde:

```ts
expo-router/js-tabs
```

También existen alternativas experimentales de navegación con tabs nativas.

### b)

El Drawer necesita trabajar con:

```text
react-native-gesture-handler
react-native-reanimated
```

En el layout raíz conviene utilizar:

```tsx
GestureHandlerRootView
```

### c)

No hace falta instalar manualmente `@react-navigation/drawer` para utilizar el Drawer mediante la integración provista por Expo Router.

### d)

`router.back()` actúa sobre el navegador que actualmente puede manejar la acción de volver dentro de la navegación anidada.

---

# Parte E — Rutas dinámicas, parámetros y hooks

## E1. Encontrá el error

El error está en comparar:

```ts
p.id === id
```

porque:

```ts
p.id
```

es `number`, mientras que:

```ts
id
```

llega desde la URL como `string`.

También es incorrecto:

```ts
if (id === 3)
```

por el mismo motivo.

La solución es convertir el parámetro:

```tsx
export default function DetalleProducto() {
  const { id } =
    useLocalSearchParams<{ id: string }>();

  const idNumerico = Number(id);

  const producto = productos.find(
    (p) => p.id === idNumerico
  );

  if (idNumerico === 3) {
    console.log('Es el chipá');
  }

  if (!producto) {
    return <Text>No existe el producto {id}</Text>;
  }

  return <Text>{producto.nombre}</Text>;
}
```

---

## E2. Catch-all

Para:

```text
src/app/docs/[...slug].tsx
```

### `/docs/react`

```ts
slug = ['react']
```

### `/docs/react/hooks/useState`

```ts
slug = ['react', 'hooks', 'useState']
```

### `/docs`

El catch-all no tiene ningún segmento que capturar.

Para tener una pantalla propia en `/docs` se puede crear:

```text
src/app/docs/index.tsx
```

---

## E3. Anatomía de una URL

URL:

```text
rutasipf://buscar?q=mate&categoria=bebidas
```

### a)

Scheme:

```text
rutasipf
```

Ruta:

```text
/buscar
```

Parámetros:

```text
q=mate
categoria=bebidas
```

### b)

`useLocalSearchParams()` devuelve aproximadamente:

```ts
{
  q: 'mate',
  categoria: 'bebidas'
}
```

### c)

No hacen falta corchetes porque `q` y `categoria` son parámetros de búsqueda y no segmentos dinámicos de la ruta.

El archivo sigue siendo:

```text
buscar.tsx
```

### d)

Usar:

```ts
router.setParams()
```

tiene dos ventajas principales:

1. No agrega una nueva pantalla a la pila cada vez que el usuario escribe una letra.
2. La búsqueda queda representada en la URL y puede compartirse.

---

## E4. ¿Dónde estoy?

### En `/productos/3`

`usePathname()`:

```text
/productos/3
```

`useSegments()`:

```ts
['(tabs)', 'productos', '[id]']
```

`useLocalSearchParams()`:

```ts
{
  id: '3'
}
```

### En `/buscar?q=chipa`

`usePathname()`:

```text
/buscar
```

`useSegments()`:

```ts
['buscar']
```

`useLocalSearchParams()`:

```ts
{
  q: 'chipa'
}
```

---

## E5. Local vs global

### a)

`useLocalSearchParams()` devuelve los parámetros asociados a la ruta de la pantalla actual.

`useGlobalSearchParams()` observa los parámetros globales de la URL aunque una pantalla no sea la actualmente enfocada.

Normalmente conviene utilizar los parámetros locales porque evita actualizaciones innecesarias de pantallas que no están activas.

### b)

`useFocusEffect` permite ejecutar una acción cuando una pantalla obtiene el foco.

Por ejemplo:

```ts
useFocusEffect(
  useCallback(() => {
    cargarPedidos();
  }, [])
);
```

Esto podría utilizarse para volver a cargar una lista cada vez que el usuario entra a esa pantalla.

### c)

No es un error de Expo Router.

`[id].tsx` significa que cualquier texto colocado en esa parte de la URL coincide con esa ruta.

La aplicación es responsable de validar si el valor recibido realmente corresponde a un producto existente.

---

# Parte F — Redirecciones, rutas protegidas y deep links

## F1. Redirect

### a)

```tsx
<Redirect href="/productos" />
```

envía inmediatamente al usuario hacia `/productos`.

Conceptualmente equivale a reemplazar la ruta actual.

### b)

Una redirección debe reemplazar la ruta anterior para evitar dejar una pantalla que inmediatamente vuelve a redirigir.

Si se apilara podría ocurrir:

```text
ruta vieja
↓
productos
```

y al tocar Atrás volver a la ruta vieja, que volvería a redirigir hacia Productos.

---

## F2. Stack.Protected

Los guards serían:

```tsx
<Stack.Protected guard={conSesion}>
  <Stack.Screen name="privado" />
</Stack.Protected>

<Stack.Protected guard={!conSesion}>
  <Stack.Screen
    name="login"
    options={{
      presentation: 'modal',
    }}
  />
</Stack.Protected>
```

### a)

Cuando un `guard` pasa a `false`, la ruta protegida deja de estar disponible dentro de ese estado de navegación.

### b)

Después de iniciar sesión:

```ts
conSesion === true
```

por lo tanto:

```ts
!conSesion === false
```

La ruta Login deja de existir dentro del grupo protegido.

Por eso el modal puede desaparecer sin necesidad de ejecutar `router.back()`.

### c)

Ese aviso puede aparecer cuando se intenta navegar hacia una ruta que el navegador actual no puede manejar o que no se encuentra disponible debido a su guard.

Se evita navegando solamente hacia rutas disponibles según el estado actual y organizando correctamente los navegadores.

### d)

`Stack.Protected` permite definir la protección en un único lugar.

Sin él habría que colocar lógica de redirección manual dentro de cada pantalla privada.

---

## F3. 404, anchor y rutas tipadas

### a) `+not-found.tsx`

Se utiliza para mostrar una pantalla cuando ninguna otra ruta coincide con la URL solicitada.

Archivo:

```text
src/app/+not-found.tsx
```

### b) Anchor

```ts
export const unstable_settings = {
  anchor: '(tabs)',
};
```

se configura en el layout raíz.

Permite definir las Tabs como pantalla base cuando se abre directamente una ruta mediante un deep link.

### c) typedRoutes

Las rutas tipadas permiten detectar rutas inválidas durante el desarrollo.

Por ejemplo:

```tsx
<Link href="/prodcutos" />
```

produce un error de TypeScript si la ruta no existe.

La opción se activa en:

```text
app.json
```

mediante:

```json
"typedRoutes": true
```

Expo Router genera automáticamente tipos para las rutas del proyecto dentro de los archivos generados de Expo, normalmente bajo `.expo/types`.

---

## F4. Deep links

Para abrir:

```text
/menu/7
```

### App instalada

```text
comedoripf://menu/7
```

### Expo Go

Suponiendo que la computadora tiene IP:

```text
192.168.1.20
```

la URL sería:

```text
exp://192.168.1.20:8081/--/menu/7
```

### Web

```text
http://localhost:8081/menu/7
```

### ¿Qué significa `/--/`?

La parte:

```text
/--/
```

separa la dirección utilizada por el servidor de desarrollo de Expo de la ruta interna que debe abrir nuestra aplicación.

### ¿Por qué no se utiliza `comedoripf://` en Expo Go?

Porque Expo Go es una aplicación genérica de Expo.

Durante el desarrollo utiliza su propio scheme:

```text
exp://
```

El scheme personalizado:

```text
comedoripf://
```

pertenece a una build propia de nuestra aplicación.