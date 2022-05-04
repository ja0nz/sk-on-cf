import { graphql } from "@octokit/graphql";
import { GH_TOKEN, REPO } from "./backend";
import { comp } from "@thi.ng/compose";
import { URL } from 'node:url';
import { getR, getI, getNodes, getHasNextPage, getEndCursor, queryI, queryR } from "gh-cms-ql";

const { pathname } = new URL(REPO);
const [owner, repo] = pathname.split("/").filter(Boolean);

const qlClient = graphql.defaults({
  headers: {
    authorization: `token ${GH_TOKEN}`,
    // https://docs.github.com/en/graphql/overview/schema-previews#labels-preview
    // Mutation.createLabel
    // Mutation.deleteLabel
    // Mutation.updateLabel
    accept: "application/vnd.github.bane-preview+json",
  },
  variables: {
    owner,
    repo,
  },
});

/*
 * A function that helps to page through GitHub Issues
 */
type GHCursor = string;
export function queryIPager(...q: string[]) {
  return (s: GHCursor) => comp(queryR, queryI(s))(...q);
}

export async function fetchExhaust(query) {
  const nodes = [];
  let cursor: GHCursor = '';
  while (true) {
    let ql = {};
    try {
      ql = await qlClient(query(cursor));
    } catch (e) {
      break;
    }
    const qPayLoad = comp(getI, getR)(ql);
    nodes.push(...(getNodes(qPayLoad)));
    if (getHasNextPage(qPayLoad)) {
      cursor = getEndCursor(qPayLoad);
      continue;
    }

    break;
  }

  return nodes;
}
