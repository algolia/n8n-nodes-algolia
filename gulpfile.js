const path = require('path');
const { task, src, dest, watch } = require('gulp');

task('build:icons', copyIcons);
task('watch:icons', watchIcons);

function copyIcons() {
	const nodeSource = path.resolve('nodes', '**', '*.{png,svg}');
	const nodeDestination = path.resolve('dist', 'nodes');

	src(nodeSource).pipe(dest(nodeDestination));

	const credSource = path.resolve('credentials', '**', '*.{png,svg}');
	const credDestination = path.resolve('dist', 'credentials');

	return src(credSource).pipe(dest(credDestination));
}

function watchIcons() {
	watch(['nodes/**/*.{png,svg}', 'credentials/**/*.{png,svg}'], copyIcons);
}
