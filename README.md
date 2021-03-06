# knapp.js
![Bower version](https://img.shields.io/bower/v/knapp.js.svg?style=flat)
[![npm version](https://img.shields.io/npm/v/knapp.js.svg?style=flat)](https://www.npmjs.com/package/knapp.js)
[![Build Status](https://travis-ci.org/bcorreia/knapp.js.svg?branch=master)](https://travis-ci.org/bcorreia/knapp.js)

---
Knapp can take any shape color and size. Knapp iterates the provided node element, creates an array of objects, and outputs a “knapp” styled element ready to use.<br />
[**Demo**](http://bcorreia.com/projects/knapp.js/src/demo.html)

## Getting Started
You may install knapp.js using package managers.<br />
```bash
bower install knapp.js
npm install knapp.js

# knapp.min.js (minified version)
```

## Usage
> jQuery is **not** required

```javascript
var example = new Knapp(document.querySelector('ul.example'), {
    selected: 1, // zero-based index
    onSelect: function(obj) {
        // console.log(obj);
    },
    onComplete: function(obj) {
        // console.log(obj);
    }
});
```

## Default Settings
```javascript
selected: 0 // zero-based index
onSelect: function(obj) {} // callback fn
onChange: function() {} // callback fn
onComplete: function(obj) {} // callback fn
```

### Callbacks
```javascript
onReady: function() {} // called once ready
onSelect: function(obj) {}  // called once an item has been selected
onChange: function() {} // called on seek, before transiton starts
onComplete: function(obj) {} // called on transition end
```

### Public Methods
```javascript
// add new items dynamically
.add(arr) // @param [Array of Objects]
          // Object keys: name, action and classlist
```

### HTML data-attribute
Add `data-knapp` attribute to each element.
```html
<!-- example -->
<ul class="example">
    <li class="bluebird" data-knapp="http://address.com">Mountain Bluebird</li>
    <li class="show" data-knapp="custom function">Snow Buting</li>
</ul>
```

### CSS
```
TBD
```

## License
This software is free to use under the [MIT license](https://github.com/bcorreia/knapp.js/blob/master/license.md).
