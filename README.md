# kanpp.js
![Bower version](https://img.shields.io/bower/v/kanpp.js.svg?style=flat)
[![npm version](https://img.shields.io/npm/v/knapp.js.svg?style=flat)](https://www.npmjs.com/package/kanpp.js)
[![Build Status](https://travis-ci.org/bcorreia/knapp.js.svg?branch=master)](https://travis-ci.org/bcorreia/kanpp.js)

---
Add knapp.js - Knapp can take any shape color and size.<br />
[**Demo**](http://bcorreia.com/projects/knapp.js/src/demo.html)

## Getting Started
You may install knapp.js using package managers.<br />
```bash
bower install knapp.js
npm install knapp.js

# kanpp.min.js (minified version)
```

## Usage
> jQuery is **not** required

```javascript
var example = new Knapp(document.querySelector('ul.example'), {
    selected: 1, // index 0
    onSelect: function(obj) {
        // console.log(obj);
    },
    onChange: function(obj) {
        // console.log(obj);
    }
});
```

## Default Settings
```javascript
selected: 0,
onSelect: function() {},
onChange: function() {}
```
### Callbacks
```javascript
onSelect: function(obj) {  // called once item has been selected
    // { name: value, action: value }
}

onChange: function(obj) { // called on every change
    // { name: value, action: value }
}
```

### HTML data-attribute
Add `data-knapp` attribute to every list element.
```html
<!-- example -->
<ul class="example">
    <li data-knapp="http://address.com">Mountain Bluebird</li>
    <li data-knapp="custom function">Snow Buting</li>
</ul>
```

### CSS
TBD
```
---

## License
This software is free to use under the [MIT license](https://github.com/bcorreia/kanpp.js/blob/master/license.md).
