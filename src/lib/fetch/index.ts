import iGetIssue from "./getIssue";
import iAll from "./issuesAll";
import { ConsoleLogger } from "@thi.ng/logger";

const ctx = {
  issues: new Map(),
  logger: new ConsoleLogger("JSON"),
  remarkPlugins: "",
  rehypePlugins: "",
};

const all = iAll(ctx);
const getIssue = iGetIssue(ctx);

export { getIssue, all };
