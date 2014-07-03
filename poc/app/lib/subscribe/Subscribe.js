define(function (require) {
	'use strict';

	var vick = require('lib/vick/Vick');
	var subs = require('lib/subscribe/Subscriptions');

	var subscribe = vick('subscribe', function (args) {
		var callbacks = subs[args.channel] || [];
		callbacks.push(args.callback);
		if (!subs[args.channel]) {
			subs[args.channel] = callbacks;
		}
	});

	return subscribe;
});