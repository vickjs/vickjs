define(function () {
	'use strict';

	// any time we call a top-level triangle, we push a new array on
	// the stack this is used in path integrity to ensure children are
	// only called from their declared parent.
	var callStacks = [];

	return {
		before: function (name, defs) {
			var layer = defs.layer;
			var parent = defs.parent;
			if (layer === 1) {
				//if top layer, create a new stack with this function
				callStacks.unshift([name]);
			} else if (!parent) {
				throw new Error('Unexpected - a triangle with layer > 0 doesn\'t have a parent!');
			} else if (!callStacks[0] || parent !== callStacks[0][0]) {
				throw new Error([
					'Path integrity violated! You must call `',
					name,
					'` through `',
					parent,
					'`!'
				].join(''));
			} else {
				callStacks[0].unshift(name);
			}
			// push name onto callstack
		},

		/*
		 * after the call, pop the name off the callStack
		 */
		after: function (name, defs) {
			var layer = defs.layer;
			if (layer === 1) {
				callStacks.shift();
			} else {
				callStacks[0].shift();
			}
		}
	};
});