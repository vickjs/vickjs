define(function (require) {
	'use strict';

	var vick = require('lib/vick/Vick');
	var subs = require('lib/subscribe/Subscriptions');


	var publish = vick('publish', function (args) {
		var channel = args.channel;
		var data = args.data;
		var listeners = subs[channel] || [];
		listeners.forEach(function (fn) {
			fn(data);
		});
	});

	return publish;
});