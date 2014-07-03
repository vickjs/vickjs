define(function (require) {
	'use strict';

	var vick = require('lib/vick/Vick');
	var log = require('lib/log/Log');
	var dom = require('document');
	var ko = require('knockout');

	function maybe(object, key, message) {
		if (object === undefined) {
			return undefined;
		} else if (object[key] === undefined) {
			var args = message ? Array.slice(arguments, 2) : [key, 'is undefined on', object];
			log.error.apply(undefined, args);
		} else {
			return object[key];
		}
	}

	var render = vick('render', function (args) {
		var model = args.model || {};
		var template = maybe(args, 'template', 'You must specify a `template` for render to work');
		var selector = maybe(args, 'selector', 'You must specify a `selector` for render to work');
		var element = maybe(dom.query(selector), 0, 'Attempted to render to an undefined element. Selector:', selector);
		if (element) {
			ko.cleanNode(element);
			element.innerHTML = template;
			ko.applyBindings(model, element);
		}
	});

	return render;
});