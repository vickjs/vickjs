define(function (require) {
	'use strict';
	var Controller = require('lib/navigation/Controller');
	var render = require('lib/render/Render');
	var emberTemplate = require('text!feature/ember/EmberTemplate.html');

	return new Controller({
		name: 'Ember',
		routes: {
			MAIN: 'ember'
		},
		MAIN: function () {
			render({
				selector: '#main',
				template: emberTemplate
			});
		}

	});
});