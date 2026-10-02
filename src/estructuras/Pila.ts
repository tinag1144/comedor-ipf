export class Pila<T> {
  // #items es privado: solo se puede usar dentro de esta clase.
  #items: T[] = [];

  // Agrega un elemento al tope de la pila.
  push(item: T): void {
    this.#items.push(item);
  }

  // Saca y devuelve el último elemento agregado.
  pop(): T | undefined {
    return this.#items.pop();
  }

  // Devuelve el elemento del tope sin eliminarlo.
  tope(): T | undefined {
    return this.#items[this.#items.length - 1];
  }

  // Indica si la pila está vacía.
  get vacia(): boolean {
    return this.#items.length === 0;
  }

  // Devuelve cuántos elementos hay.
  get tamanio(): number {
    return this.#items.length;
  }

  // Devuelve una COPIA del array.
  // Así evitamos que alguien modifique #items desde afuera.
  aArray(): T[] {
    return [...this.#items];
  }
}
