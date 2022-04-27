import { getIn } from "@thi.ng/paths";

console.log(import.meta.env ?? process.env)

// process.env
const getEnv = (env: string) =>
  getIn(import.meta.env ?? process.env, [env]);

export const GH_TOKEN = getEnv("VITE_GH_TOKEN"); // github.com -> Settings -> Developer Settings -> Personal access tokens -> token for public repo
export const REPO = getEnv("VITE_REPO"); // if not set -> prefix JSON paths (f.e. https://github/user/repo -> user/repo is prefix)
