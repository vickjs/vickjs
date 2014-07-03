define(function (require) {
	'use strict';

	var PathIntegrity = require('lib/vick/wrappers/PathIntegrityWrapper');
	var noopWrapper = {
		before: function () {},
		after: function () {}
	};
	var wrappers = {
		1: {
			before: function (name, defs) {
				PathIntegrity.before(name, defs);
			},
			after: function (name, defs) {
				PathIntegrity.after(name, defs);
			}
		},
		2: {
			before: function (name, defs) {
				PathIntegrity.before(name, defs);
			},
			after: function (name, defs) {
				PathIntegrity.after(name, defs);
			}
		}
	};

	return {
		forLayer: function (layer) {
			return wrappers[layer] || noopWrapper;
		}
	};
});