import { writeFile, readFile, rm } from "node:fs/promises";
import { format } from "prettier";
import { watch } from "chokidar";
import { chdir } from "node:process";
import resolveConfig from 'tailwindcss/resolveConfig.js';
import tw from "./tailwind.config.cjs";

const  { theme } = resolveConfig(tw);

const [node, cwd, mode] = process.argv;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

chdir("./src/css/");

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
await writeFile(`custom-props.css`, result);

/*
 * CUBE section
 * https://cube.fyi/
 */
const CUBE = "cube.css";
await rm(CUBE, { force: true });

const genCSS = watch(["compositions", "blocks", "utilities"]).on(
  "all",
  async (event, path) => {
    if (event === "add") {
      await writeFile(CUBE, `@import "${path}";\n`, { flag: "a+" });
    }
    if (event === "unlink") {
      const file = await readFile(CUBE);
      const buffer = Buffer.from(file).toString("utf-8");
      await writeFile(
        CUBE,
        buffer.replace(new RegExp(`^.*?${path}.*?$`, "m"), "")
      );
    }
  }
);

if (mode === "build") {
  await sleep(500); // wait for the initial .on block
  await genCSS.close();
}
