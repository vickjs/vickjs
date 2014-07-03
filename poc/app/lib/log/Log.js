/* global console */
define(function (require) {
	'use strict';
	var vick = require('lib/vick/Vick');

	var log = vick('log', function (opts) {
		console[opts.level].apply(console, opts.args);
	});

	['log', 'warn', 'debug', 'error'].forEach(function (key) {
		log[key] = function () {
			log({level: key, args: arguments});
		};
	});

	return log;
});