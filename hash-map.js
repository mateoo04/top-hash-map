import { hash, HashStructure, traverseLinkedList } from './hash-structure.js';

export class HashMap extends HashStructure {
  constructor(bucketsLength = 16, loadFactor = 0.75) {
    super(bucketsLength, loadFactor);
  }

  #growBuckets() {
    this.bucketsLength = this.bucketsLength * 2;

    const items = this.entries();

    this.clear();

    items.forEach((item) => {
      this.set(item.key, item.value);
    });
  }

  set(key, value) {
    const index = hash(key, this.bucketsLength);

    //when the bucket is empty or the fist item in it is to be modified
    if (this.buckets[index] === undefined || this.buckets[index].key === key) {
      this.buckets[index] = {
        key: key,
        value: value,
        next: null,
      };
    } else {
      let object = this.buckets[index];

      //checks for existing matching items
      while (object.next !== null) {
        object = object.next;
        if (object.key === key) {
          object.value = value;
          return;
        }
      }

      //if no matching existing item is found, new one is appended
      object.next = {
        key: key,
        value: value,
        next: null,
      };

      if (this.length() / this.bucketsLength > 0.75) {
        this.#growBuckets();
      }
    }
  }

  get(key) {
    const hashCode = hash(key, this.bucketsLength);
    if (this.buckets[hashCode] === undefined || this.buckets[hashCode] === null)
      return null;

    let object = this.buckets[hashCode];
    while (object !== null) {
      if (object.key === key) return object.value;
      object = object.next;
    }

    return null;
  }

  keys() {
    let items = [];

    this.buckets.forEach((item) => {
      if (item === undefined || item === null) return;

      items.push(item.key);

      let linkedItem = item.next;

      traverseLinkedList(linkedItem, () => {
        items.push(linkedItem.key);
        linkedItem = linkedItem.next;
      });
    });

    return items;
  }

  values() {
    let items = [];

    this.buckets.forEach((item) => {
      if (item === undefined || item === null) return;

      items.push(item.value);

      let linkedItem = item.next;

      traverseLinkedList(linkedItem, () => {
        items.push(linkedItem.value);
        linkedItem = linkedItem.next;
      });
    });

    return items;
  }

  entries() {
    let items = [];

    this.buckets.forEach((item) => {
      if (item === undefined || item === null) return;

      items.push({ key: item.key, value: item.value });

      let linkedItem = item.next;

      traverseLinkedList(linkedItem, () => {
        items.push({ key: linkedItem.key, value: linkedItem.value });
        linkedItem = linkedItem.next;
      });
    });

    return items;
  }
}
