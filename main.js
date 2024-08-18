import { HashMap } from './hash-map.js';
import { HashSet } from './hash-set.js';

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

const setTest = new HashSet();

setTest.set('apple');
setTest.set('banana');
setTest.set('carrot');
setTest.set('dog');
setTest.set('elephant');
setTest.set('frog');
setTest.set('grape');
setTest.set('hat');
setTest.set('ice cream');
setTest.set('jacket');
setTest.set('kite');
setTest.set('lion');
setTest.set('moon');
setTest.set('mars');
setTest.set('venus');
setTest.set('mouse');

setTest.remove('venus');

console.log('Length of set: ', setTest.length());
console.log('All entries: ', setTest.entries());
