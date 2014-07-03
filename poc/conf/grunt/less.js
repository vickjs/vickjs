module.exports = {
	src: {
		// http://stackoverflow.com/questions/15094667/compile-less-files-with-grunt-contrib-less-wont-work
		// http://gruntjs.com/configuring-tasks#building-the-files-object-dynamically
		expand: true,
		cwd: 'app/',
		src: [
			'**/*.less',
			'!vendor/**/*'
		],
		dest: 'app/',
		ext: '.css'
	}
}