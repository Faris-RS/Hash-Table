function createHashTable(size = 10) {
  let table = new Array(size).fill(null);

  function hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    return hash % size;
  }

  function set(key, value) {
    const index = hash(key);

    let currentIndex = index;
    while (table[currentIndex] !== null && table[currentIndex].key !== key) {
      currentIndex = (currentIndex + 1) % size;
    }

    table[currentIndex] = { key, value };
  }

  function get(key) {
    const index = hash(key);

    let currentIndex = index;
    while (table[currentIndex] !== null) {
      if (table[currentIndex].key === key) {
        return table[currentIndex].value;
      }
      currentIndex = (currentIndex + 1) % size;
    }

    return undefined;
  }

  function remove(key) {
    const index = hash(key);

    let currentIndex = index;
    while (table[currentIndex] !== null) {
      if (table[currentIndex].key === key) {
        table[currentIndex] = null;
        rehash();
        return;
      }
      currentIndex = (currentIndex + 1) % size;
    }
  }

  function rehash() {
    const tempTable = table;
    table = new Array(size).fill(null);

    for (let i = 0; i < tempTable.length; i++) {
      if (tempTable[i] !== null) {
        set(tempTable[i].key, tempTable[i].value);
      }
    }
  }

  function has(key) {
    return get(key) !== undefined;
  }

  function getSize() {
    let count = 0;
    for (const element of table) {
      if (element !== null) {
        count++;
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
