define(function (require) {
	'use strict';

	var navigate = require('lib/navigation/Navigate');
	var router = require('lib/navigation/Router');

	var Controller = function (opts) {
		this.name = opts.name;
		if (!this.name) {
			throw Error('Controllers must specify a `name` argument');
		}
		this.routes = opts.routes;
		opts.routes.forEach(this._register_route(opts));
	};

	Controller.prototype._register_route = function (opts) {
		return function (action_name, route) {
			if (!opts[action_name]) {
				throw Error(['Action "', action_name,
					'" is not defined on the controller named "', opts.name, '"!'
				].join(''));
			}
			this[action_name] = opts[action_name].bind(this);
			add_route_to_router(this, action_name, route);
		}.bind(this);
	};

	function add_route_to_router(controller, action_name, route) {
		router.addRoute({
			action: qualify_action_name(controller, action_name),
			route: route,
			callback: function () {
				before_action(controller, action_name, route, arguments);
				var result = controller[action_name].apply(controller, arguments);
				after_action(result, controller, action_name, route, arguments);
			}
		});
	}

	function before_action() {
		// preview actions - i.e. clear site subtitle... manage breadcrumbs
	}

	function after_action() {
		// do something after actions are processed
	}

	function qualify_action_name(controller, action_name) {
		return controller.name + '.' + action_name;
	}

	Controller.redirect = function (action_name) {
		return function () {
			navigate({
				action: action_name,
				trigger: true,
				replace: true
			});
		};
	};

	return Controller;
});