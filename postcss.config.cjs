const tailwind = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const postcssImportExtGlob = require('postcss-import-ext-glob');
const postcssImport = require('postcss-import');

module.exports = {
	plugins: [
        postcssImport(),
        postcssImportExtGlob(),
		// Some plugins, like postcss-nested, need to run before Tailwind
		tailwind(),
		// But others, like autoprefixer, need to run after
		autoprefixer(),
	]
};
