define(function (require) {
	'use strict';
	var Controller = require('lib/navigation/Controller');
	var render = require('lib/render/Render');
	var introTemplate = require('mdown!feature/introduction/IntroductionTemplate.mdown');

	return new Controller({
		name: 'Introduction',
		routes: {
			MAIN: 'introduction'
		},
		MAIN: function () {
			render({
				selector: '#main',
				template: introTemplate
			});
		}

	});
});