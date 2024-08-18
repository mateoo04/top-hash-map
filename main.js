import { HashMap } from './hash-map.js';

const test = new HashMap();

test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');

test.set('hat', 'blue');
test.set('carrot', 'orangey');

test.set('moon', 'silver');

console.log('Length: ', test.length());
console.log('All entries: ', test.entries());
