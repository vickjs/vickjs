/* jshint strict:false */
/* global DOMException, window, document  */
/*****************************************************************************
 *
 *  Polyfills of ES5 features and additional utilities
 *
 *****************************************************************************
 *
 *  type predicates
 *  ---------------
 *  isFunction()
 *  isObject()
 *  isArray()
 *
 *  js utilities
 *  ------------
 *  Object.create()
 *  Object.setPrototypeOf()    (ES6 feature)
 *  Object.prototype.forEach()
 *  String.strcmp()
 *  String.stricmp()
 *
 *  String generics
 *  Array generics
 *
 *  DOM utilties
 *  ------------
 *  getScrollX()
 *  getScrollY()
 *  getOffset(elem)
 *  document.documentElement.prototype.classList()
 *
 *  IE fixes
 *  --------
 *  window.setTimeout()  argument fix for IE < 9
 *  window.setInterval() argument fix for IE < 9
 *  Date.now() for IE < 9
 *
 *  see: http://kangax.github.io/es5-compat-table/
 *
 *  Other utilities
 *  ---------------
 *  Number.prototype.toMoney()
 *
 *  Requires jQuery for $(document).ready()
 *
 ****************************************************************************/

/*****************************************************************************
 *
 *  isFunction() predicate
 *
 ****************************************************************************/
(function () {
	var _objToStr = Object.prototype.toString; // cache it
	window.isFunction = function (fn) {
		// the only accurate test
		return fn && _objToStr.call(fn) === '[object Function]';
	};
})();

/*****************************************************************************
 *
 *  isObject() predicate
 *
 ****************************************************************************/
window.isObject = function (obj) {
	// faster than coercion test
	return obj != null &&
		typeof obj === 'object' ||
		typeof obj === 'function';
	//return obj === Object(obj);
};

/*****************************************************************************
 *
 *  isArray() predicate
 *
 ****************************************************************************/
if (!window.isArray) {
	window.isArray = Array.isArray;
}

/*****************************************************************************
 *
 *  Object.create()
 *
 *  see:
 *  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
 *
 *  A more complete version is found in es5-sham.js, but that has other stuff
 *  we don't need, and we don't care about supporting such older browsers as
 *  it attempts to.
 *
 ****************************************************************************/
if (!Object.create) {
	Object.create = (function () {
		function F() {}

		return function (o) {
			if (arguments.length !== 1) {
				throw new Error('Object.create implementation only accepts one parameter.');
			}
			F.prototype = o;
			return new F();
		};
	})();
}


try {
	Object.defineProperty(Object, 'create', { enumerable: false });
} catch (e) {
}

/*****************************************************************************
 *
 *  Object.prototype.forEach()
 *
 *  iterates over an object's own, enumerable properties
 *  calls fn(property, value)
 *  optionally sets this to context if supplied
 *
 ****************************************************************************/
Object.prototype.forEach = function (
	fn,
	context) // optional
{
	var obj = this;
	var cb;
	if (context) {
		cb = function (prop) {
			fn.call(context, prop, obj[prop]);
		};
	} else {
		cb = function (prop) {
			fn(prop, obj[prop]);
		};
	}
	Object.keys(this).forEach(cb);
};

/*****************************************************************************
 *
 *  String.strcmp()
 *
 ****************************************************************************/
String.strcmp = function (a, b) {
	if (a < b) {
		return -1;
	} else if (a > b) {
		return 1;
	}
	return 0;
};

/*****************************************************************************
 *
 *  String.stricmp()
 *
 ****************************************************************************/
String.stricmp = function (a, b) {
	a = a.toLowerCase();
	b = b.toLowerCase();
	if (a < b) {
		return -1;
	} else if (a > b) {
		return 1;
	}
	return 0;
};

try {
	Object.defineProperty(Object.prototype, 'forEach', { enumerable: false });
	Object.defineProperty(String,           'strcmp',  { enumerable: false });
	Object.defineProperty(String,           'stricmp', { enumerable: false });
} catch (e) {
}

/*****************************************************************************
 *
 *  String generics
 *
 *  see:
 *  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#String_generic_methods
 *
 *
 ****************************************************************************/
(function () {
	'use strict';

	var i;
	var slice = Array.prototype.slice;

	// We could also build the array of methods with the following, but the
	//   getOwnPropertyNames() method is non-shimable:
	// Object.getOwnPropertyNames(String).filter(function (methodName) {return typeof String[methodName] === 'function'});
	var methods = [
		'quote',
		'substring',
		'toLowerCase',
		'toUpperCase',
		'charAt',
		'charCodeAt',
		'indexOf',
		'lastIndexOf',
		'startsWith',
		'endsWith',
		'trim',
		'trimLeft',
		'trimRight',
		'toLocaleLowerCase',
		'toLocaleUpperCase',
		'localeCompare',
		'match',
		'search',
		'replace',
		'split',
		'substr',
		'concat',
		'slice',
		'fromCharCode'
	];
	var methodCount = methods.length;
	var assignStringGeneric = function (methodName) {
		var method = String.prototype[methodName];
		if (isFunction(String[methodName])) {
			return;
		}
		String[methodName] = function (arg1) {
			return method.apply(
				arg1,
				slice.call(arguments, 1)
			);
		};
	};

	for (i = 0; i < methodCount; i++) {
		assignStringGeneric(methods[i]);
	}
}());

/*****************************************************************************
 *
 *  Array generics
 *
 *  see:
 *  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#Array_generic_methods
 *
 ****************************************************************************/
(function () {
	'use strict';

	var i;
	var slice = Array.prototype.slice;

	// We could also build the array of methods with the following, but the
	//   getOwnPropertyNames() method is non-shimable:
	// Object.getOwnPropertyNames(Array).filter(function (methodName) {return typeof Array[methodName] === 'function'});
	var methods = [
		'join',
		'reverse',
		'sort',
		'push',
		'pop',
		'shift',
		'unshift',
		'splice',
		'concat',
		'slice',
		'indexOf',
		'lastIndexOf',
		'forEach',
		'map',
		'reduce',
		'reduceRight',
		'filter',
		'some',
		'every',
		'isArray'
	];
	var methodCount = methods.length;
	var assignArrayGeneric = function (methodName) {
		var method = Array.prototype[methodName];
		if (isFunction(Array[methodName])) {
			return;
		}
		Array[methodName] = function (arg1) {
			return method.apply(
				arg1,
				slice.call(arguments, 1)
			);
		};
	};

	for (i = 0; i < methodCount; i++) {
		assignArrayGeneric(methods[i]);
	}
}());


/*****************************************************************************
 *
 *  document.documentElement.prototype.classList()
 *
 *  see: https://developer.mozilla.org/en-US/docs/Web/API/element.classList
 *
 * classList.js: Cross-browser full element.classList implementation.
 * 2012-11-15
 *
 * By Eli Grey, http://eligrey.com
 * Public Domain.
 * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
 * @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js
 *
 ****************************************************************************/
if (! ('classList' in document.documentElement)) {
	/* jshint laxcomma:true */
	(function (view) {

		'use strict';

		if (!('HTMLElement' in view) && !('Element' in view)) {
			return;
		}

		var
		classListProp = 'classList'
		, protoProp = 'prototype'
		, elemCtrProto = (view.HTMLElement || view.Element)[protoProp]
		, objCtr = Object
		, strTrim = String[protoProp].trim || function () {
			return this.replace(/^\s+|\s+$/g, '');
		}
		, arrIndexOf = Array[protoProp].indexOf || function (item) {
			var
			i = 0
			, len = this.length;

			for (; i < len; i++) {
				if (i in this && this[i] === item) {
					return i;
				}
			}
			return -1;
		}
		// Vendors: please allow content code to instantiate DOMExceptions
		, DOMEx = function (type, message) {
			this.name = type;
			this.code = DOMException[type];
			this.message = message;
		}
		, checkTokenAndGetIndex = function (classList, token) {
			if (token === '') {
				throw new DOMEx(
					'SYNTAX_ERR'
					, 'An invalid or illegal string was specified'
				);
			}
			if (/\s/.test(token)) {
				throw new DOMEx(
					'INVALID_CHARACTER_ERR'
					, 'String contains an invalid character'
				);
			}
			return arrIndexOf.call(classList, token);
		}
		, ClassList = function (elem) {
			var
			trimmedClasses = strTrim.call(elem.className)
			, classes = trimmedClasses ? trimmedClasses.split(/\s+/) : []
			, i = 0
			, len = classes.length
			;
			for (; i < len; i++) {
				this.push(classes[i]);
			}
			this._updateClassName = function () {
				elem.className = this.toString();
			};
		}
		, classListProto = ClassList[protoProp] = []
		, classListGetter = function () {
			return new ClassList(this);
		}
		;

		// Most DOMException implementations don't allow calling DOMException's toString()
		// on non-DOMExceptions. Error's toString() is sufficient here.
		DOMEx[protoProp] = Error[protoProp];
		classListProto.item = function (i) {
			return this[i] || null;
		};
		classListProto.contains = function (token) {
			token += '';
			return checkTokenAndGetIndex(this, token) !== -1;
		};
		classListProto.add = function () {
			var
			tokens = arguments
			, i = 0
			, l = tokens.length
			, token
			, updated = false
			;
			do {
				token = tokens[i] + '';
				if (checkTokenAndGetIndex(this, token) === -1) {
					this.push(token);
					updated = true;
				}
			} while (++i < l);

			if (updated) {
				this._updateClassName();
			}
		};

		classListProto.remove = function () {
			var
			tokens = arguments
			, i = 0
			, l = tokens.length
			, token
			, updated = false
			;
			do {
				token = tokens[i] + '';
				var index = checkTokenAndGetIndex(this, token);
				if (index !== -1) {
					this.splice(index, 1);
					updated = true;
				}
			} while (++i < l);

			if (updated) {
				this._updateClassName();
			}
		};

		classListProto.toggle = function (token, forse) {
			token += '';

			var
			result = this.contains(token)
			, method = result ?
				forse !== true && 'remove'
				:
				forse !== false && 'add'
			;

			if (method) {
				this[method](token);
			}

			return !result;
		};

		classListProto.toString = function () {
			return this.join(' ');
		};

		if (objCtr.defineProperty) {
			var classListPropDesc = {
				get: classListGetter
			, enumerable: true
			, configurable: true
			};
			try {
				objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
			} catch (ex) { // IE 8 doesn't support enumerable:true
				if (ex.number === -0x7FF5EC54) {
					classListPropDesc.enumerable = false;
					objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
				}
			}
		} else if (objCtr[protoProp].__defineGetter__) {
			elemCtrProto.__defineGetter__(classListProp, classListGetter);
		}
	})(window);
}
