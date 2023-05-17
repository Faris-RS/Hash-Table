function createHashTable(size = 10) {
  const table = new Array(size).fill(null);

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
    while (table[currentIndex] !== null) {
      currentIndex = (currentIndex + 1) % size;
      if (currentIndex === index) {
        // Table is full
        throw new Error("Hash table is full");
      }
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
      if (currentIndex === index) {
        break;
      }
    }

    return undefined; // Key not found
  }

  function remove(key) {
    const index = hash(key);

    let currentIndex = index;
    while (table[currentIndex] !== null) {
      if (table[currentIndex].key === key) {
        table[currentIndex] = null;
        rehashFrom(index);
        return;
      }
      currentIndex = (currentIndex + 1) % size;
      if (currentIndex === index) {
        break;
      }
    }
  }

  function rehashFrom(index) {
    let currentIndex = index;
    let nextIndex = (currentIndex + 1) % size;

    while (table[nextIndex] !== null) {
      const key = table[nextIndex].key;
      const value = table[nextIndex].value;
      table[nextIndex] = null;
      set(key, value);
      currentIndex = nextIndex;
      nextIndex = (currentIndex + 1) % size;
    }
  }

  function has(key) {
    return get(key) !== undefined;
  }

  function getSize() {
    let count = 0;
    for (const entry of table) {
      if (entry !== null) {
        count++;
      }
    }
    return count;
  }

  function logTable() {
    console.log(table);
  }

  return {
    set,
    get,
    remove,
    has,
    getSize,
    logTable
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

hashTable.logTable()
