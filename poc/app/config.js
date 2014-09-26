//use an IIFE to allow for linting.
(function (requirejs) {
	'use strict';

	//TODO - proper cache busting
	//var version = Date.now();
	requirejs.config({
		paths: {
			// wrapped browser globals
			'document': 'vendor/document-SHIM',

			// 3rd party libs:
			'jquery': 'vendor/jquery',
			'backbone': 'vendor/backbone-1.1.0',
			'underscore': 'vendor/underscore-1.5.2',
			'knockout': 'vendor/knockout-3.0.0',
			'markdownConverter': 'vendor/markdown/marked',

			// requirejs plugins:
			'mdown': 'vendor/markdown/mdown',
			'css': 'vendor/require-css/css',
			'text': 'vendor/text'
		}//,urlArgs: 'version=' + version
	});
})(requirejs);