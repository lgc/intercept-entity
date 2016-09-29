# intercept-entity
simple ***intercept***,***encode***,***decode*** entity

##How to install

	npm install intercept-entity

##Usage


###intercept
+ ***Param***

```javascript
intercept([String|Array|Object],[Number],[Number|does not exist],callback);
	example:
		intercept(obj,1,20,callback);
		intercept(obj,1,callback);
```

+ ***String***

```javascript
var entities = require("intercept-entity");

//String
entities.intercept('&#x4E2D;&#x56FD;&#xA9;&#xFC;&#xFF;',1,3,function (result) {
	console.log(result); //&#x56FD;&#xA9;
});
```
+ ***Array***

```javascript
var entities = require("intercept-entity");

//Array
var arr = [{first:'&#x4E2D;&#x56FD;&#xA9;&#xFC;&#xFF;'},{second:'&#x4E2D;&#x56FD;&#xA9;&#xFC;&#xFF;'}];
entities.intercept(arr,3,function (result) {
	console.log(result); //[ { first: '&#xFC;&#xFF;' }, { second: '&#xFC;&#xFF;' } ]
});
```
+ ***Object***

```javascript
var entities = require("intercept-entity");

var obj ={first:'&#x4E2D;&#x56FD;&#xA9;&#xFC;&#xFF;',second:[{first:'&#x4E2D;&#x56FD;&#xA9;&#xFC;&#xFF;'},{second:'&#x4E2D;&#x56FD;&#xA9;&#xFC;&#xFF;'}]};
entities.intercept(obj,1,3,function (result) {
	console.log(result); //{ first: '&#x56FD;&#xA9;',second: [ { first: '&#x56FD;&#xA9;' }, { second: '&#x56FD;&#xA9;' } ] }
});
```

###encode
+ ***encode***

```javascript
var entities = require("intercept-entity");

entities.encode('中国©üÿ'); //&#x4E2D;&#x56FD;&#xA9;&#xFC;&#xFF;
```

###decode
+ ***decode***

```javascript
var entities = require("intercept-entity");

entities.decode('&#x4E2D;&#x56FD;&#xA9;&#xFC;&#xFF;'); //中国©üÿ
```
