define(function (require) {
	'use strict';

	var Wrappers = require('lib/vick/wrappers/Wrappers');
	var Definitions = require('lib/vick/Definitions');

	var Vick = function (vickName, inner) {
		var defs;
		checkVick(vickName, inner);
		defs = resolveDefinitionsRecursively(vickName);
		return function () {
			// munge, if first layer
			//if (layer === 1) munge(arguments);

			// demunge, if a leaf layer
			// is it sufficient that no one has declared a dependency?
			//if (isLeaf(vickName)) demunge(arguments);

			var wrappers = Wrappers.forLayer(defs.layer);
			// run wrappers' `before`
			wrappers.before(vickName, defs);

			//run the inner
			var error, result;
			try {
				result = inner.apply(this, arguments);
			} catch (e) {
				// jshint ignore:start
				// use console to log, since depending on "Log" would be circular
				console.error(e.stack);
				// jshint ignore:end
				error = e;
			}

			// run wrappers' `after`
			wrappers.after(vickName, defs);

			if (error) { throw error; }
			// return result to complete wrap
			return result;
			//what to do about exceptions?
		};
	};


	/* =============================
	 * checkVick - make sure vick defintions meet our
	 * expectations.
	 */
	var ERR_PREFIX = 'Your vick definition must call Vick with a ';
	var ERR_FN_DEFINED   = ERR_PREFIX + 'function as the second parameter!';
	var ERR_NAME_DEFINED = ERR_PREFIX + 'name (string) as the first parameter!';

	function checkVick(name, fn) {
		if (typeof fn !== 'function') {
			throw new Error(ERR_FN_DEFINED);
		}
		if (typeof name !== 'string') {
			throw new Error(ERR_NAME_DEFINED);
		}
	}


	/* =============================
	 * munge/demunge - this is just a placeholder for now to round
	 * out the abstraction.
	 */
	// function munge   (argument) { return argument; }
	// function demunge (argument) { return argument; }


	function resolveDefinitionsRecursively(name) {
		var resolvedDefs = resolveObject(Definitions.vicks[name]);
		var parentDefs;

		if (resolvedDefs.parent) {
			parentDefs = resolveDefinitionsRecursively(resolvedDefs.parent);
			parentDefs.forEach(function (key) {
				if (resolvedDefs[key] === undefined) {
					resolvedDefs[key] = parentDefs[key];
				}
			});
		}
		//base case - level 1 - no parent
		return resolvedDefs;
	}


	function resolveObject(object) {
		if (!object) { return {}; }
		var resolved = {};
		object.forEach(function (key) {
			var val = object[key];
			resolved[key] = typeof val === 'function' ? val() : val;
		});
		return resolved;
	}

	return Vick;
});