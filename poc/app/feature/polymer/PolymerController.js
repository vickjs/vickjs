define(function (require) {
	'use strict';
	var Controller = require('lib/navigation/Controller');
	var render = require('lib/render/Render');
	var polymerTemplate = require('text!feature/polymer/PolymerTemplate.html');

	return new Controller({
		name: 'Polymer',
		routes: {
			MAIN: 'polymer'
		},
		MAIN: function () {
			render({
				selector: '#main',
				template: polymerTemplate
			});
		}

	});
});