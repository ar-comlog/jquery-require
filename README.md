# Simple require plugin for jQuery

Compatible to node's require and requirejs. Supports require JSON files. Supports browser cache.
Firefox and Chrome debugger support (# sourceURL).

#### Example 1:
##### /js/myfile.js:
```javascript
module.exports = function(arg) {
	...
}
```
##### HTML Script tag:
```javascript
$.require('/js/myfile.js', function(mod) {
	mod('arguments');
});
```

#### Example 2:
##### /js/myfile.js:
```javascript
module.exports = function(arg) {
	this.data = 'abc';
	...
}
```
##### HTML Script tag:
```javascript
$.require('/js/myfile.js', function(mod) {
	var obj = new mod('arguments');
});
```

#### Example 3:
##### /js/myfile.js:
```javascript
// anly exports works to :-)
exports = {
	data: 'abc'
}
```
##### HTML Script tag:
```javascript
$.require('/js/myfile.js', function(mod) {
	console.info(mod.data); // output abc
	mod.data = 'xyz';
});

$.require('/js/myfile.js', function(mod) {
	console.info(mod.data); // output xyz
});
```

#### Example 4:
##### /js/myfile.js:
```javascript
// anly exports works to :-)
var global_var = {data: 'abc'};
```
##### HTML Script tag:
```javascript
$.require({'/js/myfile.js', exports: 'global_var'}, function(mod) {
	console.info(mod.data); // output abc
});
```

#### Example 5:
##### /js/myfile.js:
```javascript
// anly exports works to :-)
var global_var = {data: 'abc'};
```
##### HTML Script tag:
```javascript
$.require({'/js/myfile.js', exports: 'global_var', cache: false, async: false}, function(mod) {
	console.info(mod.data); // output abc
});
```
