define(function (require) {
	'use strict';

	var vick = require('lib/vick/Vick');
	var router = require('lib/navigation/Router');

	var url = vick('url', function (args) {
		return router.generateUrl(args);
	});

	return url;
});