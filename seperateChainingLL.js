function createHashTable(size = 10) {
  let table = {};

  function hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    return hash % size;
  }

  function createNode(key, value) {
    return { key, value, next: null };
  }

  function set(key, value) {
    const index = hash(key);

    if (!table.hasOwnProperty(index)) {
      table[index] = createNode(key, value);
    } else {
      let current = table[index];
      while (current.next !== null) {
        if (current.key === key) {
          current.value = value;
          return;
        }
        current = current.next;
      }

      if (current.key === key) {
        current.value = value;
      } else {
        let newNode = createNode(key, value);
        current.next = newNode;
      }
    }
  }

  function get(key) {
    const index = hash(key);

    if (!table.hasOwnProperty(index)) {
      return undefined;
    }

    let current = table[index];
    while (current !== null) {
      if (current.key === key) {
        return current.value;
      }
      current = current.next;
    }

    return undefined;
  }

  function remove(key) {
    const index = hash(key);

    if (!table.hasOwnProperty(index)) {
      return;
    }

    if (table[index].key === key) {
      table[index] = table[index].next;
      return;
    }

    let prev = table[index];
    let current = prev.next;
    while (current !== null) {
      if (current.key === key) {
        prev.next = current.next;
        return;
      }
      prev = current;
      current = current.next;
    }
  }

  function has(key) {
    return get(key) !== undefined;
  }

  function getSize() {
    let count = 0;
    for (const index in table) {
      let current = table[index];
      while (current !== null) {
        count++;
        current = current.next;
      }
    }
    return count;
  }

  function log() {
    console.log(JSON.stringify(table));
  }

  return {
    set,
    get,
    remove,
    has,
    getSize,
    log,
  };
}

// Usage
const hashTable = createHashTable();
hashTable.set("key1", "value1");
hashTable.set("key2", "value2");
console.log(hashTable.get("key1")); // Output: value1
console.log(hashTable.has("key2")); // Output: true
hashTable.remove("key1");
console.log(hashTable.getSize()); // Output: 1

hashTable.log();
