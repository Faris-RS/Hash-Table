// Create an empty hash table
const hashTable = {};

// Insert key-value pairs
hashTable['name'] = 'John';
hashTable['age'] = 30;
hashTable['city'] = 'New York';

// Retrieve values using keys
console.log(hashTable['name']); // Output: John
console.log(hashTable['age']); // Output: 30

// Update existing value
hashTable['age'] = 31;
console.log(hashTable['age']); // Output: 31

// Delete a key-value pair
delete hashTable['city'];

// Check if a key exists
console.log('age' in hashTable); // Output: true
console.log('city' in hashTable); // Output: false

// Get the number of key-value pairs
console.log(Object.keys(hashTable).length); // Output: 2

// Iterate over keys in the hash table
for (const key in hashTable) {
  const value = hashTable[key];
  console.log(`${key}: ${value}`);
}
// Output:
// name: John
// age: 31
