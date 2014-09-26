define(function (require) {
	'use strict';
	var Controller = require('lib/navigation/Controller');
	var render = require('lib/render/Render');
	var knockoutTemplate = require('text!feature/knockout/KnockoutTemplate.html');

	return new Controller({
		name: 'Knockout',
		routes: {
			MAIN: 'knockout'
		},
		MAIN: function () {
			render({
				selector: '#main',
				template: knockoutTemplate
			});
		}

	});
});