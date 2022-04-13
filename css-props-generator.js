import { writeFileSync } from "node:fs";
import { format } from "prettier";
import tw from "./tailwind.config.cjs";
const { theme } = tw;

/*
  Converts the tailwind config elements into custom props.
*/
let result = "";

const groups = [
  { key: "colors", prefix: "color" },
  { key: "spacing", prefix: "space" },
  { key: "fontSize", prefix: "size" },
];

// Add a note that this is auto generated
result += `
    /* VARIABLES GENERATED WITH TAILWIND CONFIG ON ${new Date().toLocaleDateString()}.
    Tokens location: ./tailwind.config.js */

    :root {
  `;

// Loop each group's keys, use that and the associated
// property to define a :root custom prop
groups.forEach(({ key, prefix }) => {
  const group = theme[key];

  if (!group) {
    return;
  }

  Object.keys(group).forEach((key) => {
    result += `--${prefix}-${key}: ${group[key]};`;
  });
});

// Close the :root block
result += `
    }
  `;

// Make the CSS readable to help people with auto-complete in their editors
result = format(result, { parser: "scss" });

// Push this file into the CSS dir, ready to go
writeFileSync("./src/css/custom-props.css", result);
