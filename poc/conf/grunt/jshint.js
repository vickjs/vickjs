module.exports = {
	options: {
		jshintrc: '.jshintrc'
	},
	gruntfile: {
		src: 'Gruntfile.js'
	},
	src: [
		'app/**/*.js',
		'!app/vendor/**/*'
	]
};