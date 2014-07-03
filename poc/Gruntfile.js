/*global module:false*/
module.exports = function (grunt) {
	'use strict';

	// Project configuration.
	grunt.initConfig(require('grunt-configure')('./conf/grunt/*.js'));

	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.registerTask('default', ['concurrent:dev']);
};