export class Cola<T> {
  // Array donde guardamos los elementos.
  #items: T[] = [];

  // Índice que indica dónde está el frente actual de la cola.
  #indiceFrente = 0;

  // Agrega un elemento al final de la cola.
  encolar(item: T): void {
    this.#items.push(item);
  }

  // Saca y devuelve el elemento del frente.
  desencolar(): T | undefined {
    if (this.vacia) {
      return undefined;
    }

    const item = this.#items[this.#indiceFrente];

    // En vez de usar shift(), simplemente avanzamos el índice.
    this.#indiceFrente++;

    // Si la cola quedó vacía, reiniciamos todo.
    if (this.vacia) {
      this.#items = [];
      this.#indiceFrente = 0;
    }

    return item;
  }

  // Devuelve el elemento del frente sin eliminarlo.
  frente(): T | undefined {
    if (this.vacia) {
      return undefined;
    }

    return this.#items[this.#indiceFrente];
  }

  // Indica si la cola está vacía.
  get vacia(): boolean {
    return this.tamanio === 0;
  }

  // Cantidad real de elementos que siguen en la cola.
  get tamanio(): number {
    return this.#items.length - this.#indiceFrente;
  }

  // Devuelve solamente los elementos que siguen activos en la cola.
  aArray(): T[] {
    return this.#items.slice(this.#indiceFrente);
  }
}
