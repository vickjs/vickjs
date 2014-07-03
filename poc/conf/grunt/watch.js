module.exports = {
	options: {
		livereload: true
	},
	less: {
		files: [
			'app/**/*.less',
			'!app/vendor/**/*'
		],
		tasks: 'less'
	},
	index: {
		files: [
			'app/**/*.html',
			'!app/vendor/**/*'
		],
		tasks: 'less'
	},
	js: {
		files: [
			'Gruntfile.js',
			'app/**/*.js',
			'!app/vendor/**/*'
		],
		tasks: 'jshint'
	}
};