import { getIn } from "@thi.ng/paths";

// process.env
const getEnv = (env: string) =>
  getIn<{ [k: string]: unknown }>(import.meta.env, [env]);

export const GH_TOKEN = getEnv("VITE_GH_TOKEN"); // github.com -> Settings -> Developer Settings -> Personal access tokens -> token for public repo
export const REPO = getEnv("VITE_REPO"); // if not set -> prefix JSON paths (f.e. https://github/user/repo -> user/repo is prefix)
