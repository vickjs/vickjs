define(function (require) {
	'use strict';
	var Controller = require('lib/navigation/Controller');
	var render = require('lib/render/Render');
	var bbTemplate = require('text!feature/backbone/BackboneTemplate.html');

	return new Controller({
		name: 'Backbone',
		routes: {
			MAIN: 'backbone'
		},
		MAIN: function () {
			render({
				selector: '#main',
				template: bbTemplate
			});
		}

	});
});