define(function () {
	'use strict';

	var Definitions = {
		requiredDefinitions: {
			global: [{
				name: 'layer',
				validValues: 'number'
			}],
			//layer-specific definitions
			layer1: [{
				name: 'failPathViolations',
				validValues: 'boolean'
			}, {
				name: 'parent',
				validValues: function () {
					return Object.keys(Definitions.vicks);
				}
			}, {
				name: 'params',
				validValues: [
					'Param[]',
					null
				]
			}],
			layer2: []
		},
		vicks: {
			i18n: {
				failPathViolations: true,
				layer: 1,
				params: [{
					name: 'message',
					validValues: 'string',
				}],
				parent: null
			},
			notify: {
				failPathViolations: true,
				layer: 1,
				params: [{
					name: 'text',
					validValues: 'string',
				}, {
					name: 'type',
					validValues: [
						'string',
						undefined
					]
				}, {
					name: 'duration_ms',
					validValues: [
						'number',
						undefined
					]
				}],
				parent: null
			}
		},
		types: [{
			name: 'Param',
			fields: [{
				name: 'name',
				validValues: 'string'
			}, {
				name: 'validValues',
				// any means that it can be one of:
				//
				// * A string equivalent to the name of a defined Type,
				// * A string equivalent to one of the following valid return
				//   values of the typeof operator:
				//   - "object",
				//   - "boolean",
				//   - "string",
				//   - "number",
				//   - "function"
				// * a RegExp object (i.e. /regex/)
				// * an array of the above (specified with the '[]' suffix)
				// * if you specify an object reference, the value may be a ref
				//   to that object
				// * undefined or null.
				//
				// For the first option, the internal type-checking logic will
				// match the value against a specified type,
				//
				// For the second option, the typeof operator will be used to
				// match the value against the specified known primitive types.
				//
				// For the last two options, the value being checked must pass
				// the identity equality test.
				//
				// `null` and `undefined` are mutually exclusive. If `undefined`
				// is allowed, then the Param is optional (doesn't need to be
				// specified). If `null` is allowed, then you must explicitly
				// specify `null` as the value, or a parse error will occur.
				//
				// If a function is specified as the value of validValues, it
				// must return a set of values. These values will be used in
				// an equality (===) test with the given value to determine
				// whether it matches
				validValues: 'any'
			}, {
				name: 'optional',
				validValues: [
					'boolean',
					//undefined as a valid value means the Param is optional
					undefined
				]
			}]
		}],
	};

	return Definitions;
});
