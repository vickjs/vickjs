define(function (require) {
	'use strict';

	var Controller = require('lib/navigation/Controller');
	var render = require('lib/render/Render');
	var todoTemplate = require('mdown!feature/todo/TodoTemplate.mdown');

	return new Controller({
		name: 'Todo',
		routes: {
			MAIN: 'todos'
		},
		MAIN: function () {
			render({
				selector: '#main',
				template: todoTemplate
			});
		}

	});
});