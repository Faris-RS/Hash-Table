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
    if (table[index] === null) {
      table[index] = [];
    }

    for (const pair of table[index]) {
      if (pair.key === key) {
        pair.value = value;
        return;
      }
    }

    table[index].push({ key, value });
  }

  function get(key) {
    const index = hash(key);
    if (table[index]) {
      for (const pair of table[index]) {
        if (pair.key === key) {
          return pair.value;
        }
      }
    }
    return undefined;
  }

  function remove(key) {
    const index = hash(key);
    if (table[index]) {
      table[index] = null;
    }
  }

  function has(key) {
    const index = hash(key);
    if (table[index]) {
      for (const pair of table[index]) {
        if (pair.key === key) {
          return true;
        }
      }
    }
    return false;
  }

  function getSize() {
    let count = 0;
    for (const chain of table) {
      if (chain) {
        count += chain.length;
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
    logTable,
  };
}

// Usage
const hashTable = createHashTable();
hashTable.set("key1", "value1");
hashTable.set("key2", "value2");

hashTable.set("key1", "value1");
hashTable.set("key2", "value2");
console.log(hashTable.get("key1")); // Output: value1
console.log(hashTable.has("key2")); // Output: true

hashTable.remove("key1");
console.log(hashTable.getSize()); // Output: 1

hashTable.logTable(); // Output: [ [ { key: 'key1', value: 'value1' } ], [ { key: 'key2', value: 'value2' } ], null, null, null, null, null, null, null, null ]
