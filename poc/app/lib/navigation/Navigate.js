define(function (require) {
	'use strict';

	var vick = require('lib/vick/Vick');
	var router = require('lib/navigation/Router');

	var navigate = vick('navigate', function (args) {
		var action = args.action;
		var route_args = args.args;
		var isTrigger = args.trigger === false ? false : true;
		var isReplace = args.replace === true ? true : false;
		router.navigate({
			action: action,
			args: route_args,
			isTrigger: isTrigger,
			isReplace: isReplace
		});
	});

	return navigate;
});