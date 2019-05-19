# Fakify

Fakify is a tiny library used to stub, fake or spy on default exported functions in Javascript.

Fakify can be used to stub Commonjs/ES6 modules either native Node or custom modules.

Fakify can be used with Sinon, Mocha, Chai.


## How to use

```
npm install fakify
```

## Examples
Let consider you have a `sum` function that do this:
```
// sum.js module

function sum(x, y) {
  return x + y;
}

// Notice sum is exported as default function
module.exports = sum;
```

... and you want to import and use it as follows:
```
const sum = require('./sum');

function doStuff(x, y) {
  // do some stuff then ...
  return sum(x, y);
}

module.exports = doStuff;

```

... here is how to stub the `sum` function 
```
const fakify = require('fakify');
const fakeSum = sinon.stub().returns(5);

const sut = fakify('./doStuff', {
  './sum': fakeSum,
});

sut(1, 2);

sinon.assert.calledOnce(fakeSum);
sinon.assert.calledWithExactly(fakeSum, 1, 2);
```

Fakify can be used to stub more than one dependency at a time as follows:
```
const sut = fakify('./doStuff', {
  './sum': sinon.stub().returns(5),
  './sub': sinon.stub({ sub }, 'sub').callThrough(),
});
```
