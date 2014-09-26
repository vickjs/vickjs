define(function (require) {
	'use strict';
	var Controller = require('lib/navigation/Controller');
	var render = require('lib/render/Render');
	var angularTemplate = require('text!feature/angular/AngularTemplate.html');

	return new Controller({
		name: 'Angular',
		routes: {
			MAIN: 'angular'
		},
		MAIN: function () {
			render({
				selector: '#main',
				template: angularTemplate
			});
		}

	});
});