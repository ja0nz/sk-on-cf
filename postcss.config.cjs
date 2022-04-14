const tailwind = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const purgecss = require("@fullhuman/postcss-purgecss");
const tw = require("./tailwind.config.cjs");

const PROD = process.env.NODE_ENV === "production";

module.exports = {
  plugins: [
    // Some plugins, like postcss-nested, need to run before Tailwind
    tailwind(),
    // But others, like autoprefixer, need to run after
    autoprefixer(),
  ].concat(
    PROD
      ? [
          purgecss({
            content: tw.content,
          }),
        ]
      : []
  ),
};
