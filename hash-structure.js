export function hash(key, bucketsLength) {
  let hashCode = 0;

  const primeNumber = 31;
  for (let i = 0; i < key.length; i++) {
    hashCode = primeNumber * hashCode + key.charCodeAt(i);
    hashCode = hashCode % bucketsLength;
  }

  return hashCode;
}

export function traverseLinkedList(startNode, callback) {
  let currentNode = startNode;
  while (currentNode !== null) {
    callback(currentNode);
    currentNode = currentNode.next;
  }
}

export class HashStructure {
  constructor(bucketsLength = 16, loadFactor = 0.75) {
    this.buckets = [];
    this.bucketsLength = bucketsLength;
  }

  //NOTE: You cannot set the object to null, but you can set its properties' values to null
  remove(key) {
    const hashCode = hash(key, this.bucketsLength);

    if (this.buckets[hashCode] === undefined || this.buckets[hashCode] === null)
      return false;

    let current = this.buckets[hashCode];
    let previous;

    //if the object to be removed is the head of the linked list
    if (current.key === key) {
      this.buckets[hashCode] = current.next;
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

  clear() {
    this.buckets = [];
  }

  length() {
    let length = 0;

    this.buckets.forEach((item) => {
      if (item === undefined || item === null) return 0;

      length++;

      let linkedItem = item.next;

      traverseLinkedList(linkedItem, () => {
        length++;
        linkedItem = linkedItem.next;
      });
    });

    return length;
  }

  has(key) {
    let object = this.buckets[hash(key, this.bucketsLength)];

    if (object === undefined) return false;

    while (object) {
      if (object.key === key) return true;
      object = object.next;
    }

    return false;
  }
}
