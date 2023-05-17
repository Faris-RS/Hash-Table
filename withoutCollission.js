function createHashTable(size = 10) {
    const table = new Array(size).fill(undefined);
  
    function hash(key) {
      let hash = 0;
      for (let i = 0; i < key.length; i++) {
        hash += key.charCodeAt(i);
      }
      return hash % size;
    }
  
    function perfectHash(key) {
      const primaryIndex = hash(key);
      return primaryIndex;
    }
  
    function set(key, value) {
      const index = perfectHash(key);
      table[index] = { key, value };
    }
  
    function get(key) {
      const index = perfectHash(key);
      if (table[index] && table[index].key === key) {
        return table[index].value;
      }
      return undefined;
    }
  
    function remove(key) {
      const index = perfectHash(key);
      if (table[index] && table[index].key === key) {
        table[index] = undefined;
      }
    }
  
    function has(key) {
      const index = perfectHash(key);
      return table[index] && table[index].key === key;
    }
  
    function getSize() {
      let count = 0;
      for (const entry of table) {
        if (entry !== undefined) {
          count++;
        }
      }
      return count;
    }
  
    return {
      set,
      get,
      remove,
      has,
      getSize
    };
  }
  
  // Usage
  const hashTable = createHashTable();
  hashTable.set('key1', 'value1');
  hashTable.set('key2', 'value2');
  console.log(hashTable.get('key1')); // Output: value1
  console.log(hashTable.has('key2')); // Output: true
  hashTable.remove('key1');
  console.log(hashTable.getSize()); // Output: 1
  