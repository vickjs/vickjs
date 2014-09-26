define(function (require) {
	'use strict';
	var Controller = require('lib/navigation/Controller');
	var render = require('lib/render/Render');
	var reactTemplate = require('text!feature/react/ReactTemplate.html');

	return new Controller({
		name: 'React',
		routes: {
			MAIN: 'react'
		},
		MAIN: function () {
			render({
				selector: '#main',
				template: reactTemplate
			});
		}

	});
});