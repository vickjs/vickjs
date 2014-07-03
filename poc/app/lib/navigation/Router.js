define(function (require) {
	'use strict';
	var Backbone = require('backbone');
	var subscribe = require('lib/subscribe/Subscribe');

	//the backbone implementation of a Router.
	var backboneRouter = new Backbone.Router();

	//database of routes
	var routes = {};

	//on app startup, start history
	subscribe({ channel: 'app:started', callback: function () {
		Backbone.history.start();
	}});

	/****
	 * interpolates route arguments using the backbone-style of route
	 * definitions
	 */
	var OPTIONAL_PARAM = '\\(([^\\(]*):__key__\\)';
	var NAMED_PARAM    = '\\:__key__';
	var SPLAT_PARAM    = '\\*__key__';
	function interpolate_route_arguments(route, args) {
		if (route === undefined) {
			throw new Error([
				'Tried to parse an undefined route:',
				route
			].join(' '));
		}
		args = args || {};

		args.forEach(function (key, value) {
			// NOTE: If performance is an issue, we could cache these regex for
			// each route/param combo.
			var optReg = new RegExp(OPTIONAL_PARAM.replace('__key__', key), 'g');
			var namedReg = new RegExp(NAMED_PARAM.replace('__key__', key), 'g');
			var splatReg = new RegExp(SPLAT_PARAM.replace('__key__', key), 'g');

			route = route.replace(optReg, '$1' + value);
			route = route.replace(namedReg, value);
			route = route.replace(splatReg, value);
		});

		// remove any optional params left
		var url = route.replace(/\(.*\)/g, '');

		// all routes generated should be relative to the base url, so
		// strip any '/'' at the beginning
		return url.indexOf('/') === 0 ? url.substr(1) : url;
	}

	return {
		addRoute: function (args) {
			routes[args.action] = args.route;
			backboneRouter.route(
				args.route,
				args.action,
				args.callback
			);
		},
		navigate: function (args) {
			var route = routes[args.action];
			var path = interpolate_route_arguments(route, args.args);
			backboneRouter.navigate(
				path,
				{
					trigger: args.isTrigger,
					replace: args.isReplace
				}
			);
		},
		generateUrl: function (args) {
			return '#' + interpolate_route_arguments(routes[args.action], args.args);
		}
	};
});