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
entities.intercept('&#x4E2D;abc&#x56FD;&#xA9;&#xFC;&#xFF;',1,5,function (result) {
    console.log(result); //abc&#x56FD;
});
```
+ ***Array*** **and** ***Object***

```javascript
var entities = require("intercept-entity");

//Array
var obj ={first:'&#x4E2D;&#x56FD;abc&#xA9;&#xFC;&#xFF;',second:[{first:'a&#x4E2D;&#x56FD;b&#xA9;&#xFC;c&#xFF;'},{second:'&#x4E2D;&#x56FD;&#xA9;&#xFC;abc&#xFF;'}]};
entities.intercept(obj,3,function (result) {
    console.log(result); //{ first: 'bc&#xA9;&#xFC;&#xFF;',second:[ { first: 'b&#xA9;&#xFC;c&#xFF;' },{ second: '&#xFC;abc&#xFF;' } ] }
});

```

###encode
+ ***encode***

```javascript
var entities = require("intercept-entity");

entities.encode('Love中国'); //Love&#x4E2D;&#x56FD;
```

###decode
+ ***decode***

```javascript
var entities = require("intercept-entity");

entities.decode('Love&#x4E2D;&#x56FD;'); //Love中国
```
