import { dev } from "$app/env";
import { queryIPager, fetchExhaust } from "$lib/api/graphql";
import { getI, getTitleI, queryBodyI, queryTitleI } from "gh-cms-ql";

/**
 * Fetch all
 */
async function hydrateIssues() {
  // TODO reactions
  const all = await fetchExhaust(
    queryIPager(
      queryTitleI,
      queryBodyI,
      "reactions (first: 100) {nodes {content}}"
    )
  );

  // Mangle issue to IssueMap(id => issue unparsed)
  return [
    all,
    all.map(i => {
    const t = getTitleI(i) ?? "";
    const [u, title] = t.split(","); // Split title '#1,title,timestamp'
    const url = u.substring(1); // remove '#'
    return [url[0], {...i, title}]
  })
  ];
}

export default ({ issues, logger }) =>
  async function init() {
    // Get all issues if not already done - or in development
    logger.info(`|${import.meta.url.split("/").pop()}| Fetch all issues`);
    const [raw, mapped] = await hydrateIssues();
    for (let [k, v] of mapped) {
      issues.set(k, v);
    }
    logger.info(`|${import.meta.url.split("/").pop()}| Fetched ${issues.size} issues`);
    return issues.size ? raw : {};
  };
