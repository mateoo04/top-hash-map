function hash(key, bucketsLength) {
  let hashCode = 0;

  const primeNumber = 31;
  for (let i = 0; i < key.length; i++) {
    hashCode = primeNumber * hashCode + key.charCodeAt(i);
    hashCode = hashCode % bucketsLength;
  }

  return hashCode;
}

class Buckets {
  constructor(length) {
    this.array = [];
    this.length = length;
  }

  getBucket(index) {
    if (index < 0 || index >= this.length) {
      throw new Error('Trying to access index out of bound');
    }
    return this.array[index];
  }

  setItem(key, value) {
    const index = hash(key, this.length);

    /* Throws an error if the index is beyond the array size.
    Modifing items at indexes beyond array size is not actually an issue in JS,
    this is just for practise. */
    if (index < 0 || index >= this.length) {
      throw new Error('Trying to access index out of bound');
    }

    //when the bucket is empty or the fist item in it is to be modified
    if (this.array[index] === undefined || this.array[index].key === key) {
      this.array[index] = {
        key: key,
        value: value,
        next: null,
      };
    } else {
      let object = this.array[index];

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
    }
  }

  getItem(key) {
    const hashCode = hash(key, this.length);
    if (this.array[hashCode] === undefined || this.array[hashCode] === null)
      return null;

    let object = this.array[hashCode];
    while (object !== null) {
      if (object.key === key) return object.value;
      object = object.next;
    }

    return null;
  }

  //NOTE: You cannot set the object to null, but you can set its properties' values to null
  removeItem(key) {
    const hashCode = hash(key, this.length);

    if (this.array[hashCode] === undefined || this.array[hashCode] === null)
      return false;

    let current = this.array[hashCode];
    let previous;

    //if the object to be removed is the head of the linked list
    if (current.key === key) {
      this.array[hashCode] = current.next;
      return true;
    }

    //if object to be removed is after the first node in linked list
    while (current.next) {
      previous = current;
      current = current.next;

      if (current.key === key) {
        previous.next = current.next;
        return true;
      }
    }

    return false;
  }

  clearArray() {
    this.array = [];
  }

  getALlKeys() {
    let items = [];

    this.array.forEach((item) => {
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

  getAllValues() {
    let items = [];

    this.array.forEach((item) => {
      if (item === undefined || item === null) return;

      items.push(item.value);

      let linkedItem = item.next;

      while (linkedItem !== null) {
        items.push(linkedItem.value);
        linkedItem = linkedItem.next;
      }
    });

    return items;
  }

  getNumberOfItems() {
    let length = 0;

    this.array.forEach((item) => {
      if (item === undefined || item === null) return 0;

      length++;

      let linkedItem = item.next;

      while (linkedItem !== null) {
        length++;
        linkedItem = linkedItem.next;
      }
    });

    return length;
  }

  getAllItems() {
    let items = [];

    this.array.forEach((item) => {
      if (item === undefined || item === null) return;

      items.push({ key: item.key, value: item.value });

      let linkedItem = item.next;

      while (linkedItem !== null) {
        items.push({ key: linkedItem.key, value: linkedItem.value });
        linkedItem = linkedItem.next;
      }
    });

    return items;
  }
}

export class HashMap {
  constructor(bucketsLength = 16, loadFactor = 0.75) {
    this.buckets = new Buckets(bucketsLength);
    this.loadFactor = loadFactor;
  }

  #growBuckets() {
    const newBuckets = new Buckets(this.buckets.length * 2);

    const items = this.entries();

    items.forEach((item) => {
      newBuckets.setItem(item.key, item.value);
    });

    this.buckets = newBuckets;
  }

  set(key, value) {
    this.buckets.setItem(key, value);

    if (this.length() / this.buckets.length > 0.75) {
      this.#growBuckets();
    }
  }

  get(key) {
    return this.buckets.getItem(key);
  }

  has(key) {
    if (this.buckets.array[hash(key, this.buckets.length)] === undefined)
      return false;
    return true;
  }

  remove(key) {
    return this.buckets.removeItem(key);
  }

  length() {
    return this.buckets.getNumberOfItems();
  }

  clear() {
    this.buckets.clearArray();
  }

  keys() {
    return this.buckets.getALlKeys();
  }

  values() {
    return this.buckets.getAllValues();
  }

  entries() {
    return this.buckets.getAllItems();
  }
}
