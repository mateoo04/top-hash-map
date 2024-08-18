import { hash, HashStructure } from './hash-structure.js';

export class HashSet extends HashStructure {
  constructor(bucketsLength = 16, loadFactor = 0.75) {
    super(bucketsLength, loadFactor);
  }

  #growBuckets() {
    this.bucketsLength = this.bucketsLength * 2;

    const items = this.entries();

    this.clear();

    //replace forEach with map
    items.forEach((item) => {
      this.set(item);
    });
  }

  set(key) {
    if (this.has(key)) return;

    const index = hash(key, this.bucketsLength);

    if (this.buckets[index] === undefined || this.buckets[index] === null) {
      this.buckets[index] = { key: key, next: null };
    } else {
      let object = this.buckets[index];

      while (object.next !== null) {
        object = object.next;
      }

      object.next = {
        key: key,
        next: null,
      };
    }

    if (this.length() / this.bucketsLength > 0.75) {
      this.#growBuckets();
    }
  }

  entries() {
    let items = [];

    this.buckets.forEach((item) => {
      if (item === undefined || item === null) return;

      items.push(item.key);

      let linkedItem = item.next;

      while (linkedItem !== null) {
        items.push(linkedItem.key);
        linkedItem = linkedItem.next;
      }
    });

    return items;
  }
}
