define(function (require) {
	'use strict';

	var render = require('lib/render/Render');
	var publish = require('lib/subscribe/Publish');
	var Controller = require('lib/navigation/Controller');

	//this is a test

	// Controllers
	new Controller({
		name: 'Default',
		routes: { MAIN: '' },
		MAIN: Controller.redirect('Introduction.MAIN')
	});
	require('feature/angular/AngularController');
	require('feature/backbone/BackboneController');
	require('feature/ember/EmberController');
	require('feature/introduction/IntroductionController');
	require('feature/knockout/KnockoutController');
	require('feature/polymer/PolymerController');
	require('feature/react/ReactController');
	require('feature/todo/TodoController');

	var SidebarViewModel = require('feature/sidebar/SidebarViewModel');
	var sidebarTemplate = require('text!feature/sidebar/SidebarTemplate.html');
	require('css!feature/sidebar/SidebarStyle');

	var start = function () {
		render({
			selector: '#sidebar',
			model: new SidebarViewModel(),
			template: sidebarTemplate
		});

		publish({channel: 'app:started'});
	};

	return { start: start };
});