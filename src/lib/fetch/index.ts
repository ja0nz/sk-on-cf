import i from "./issues";
import { defAtom } from "@thi.ng/atom";

const ctx = {
    allBlogposts: defAtom(),
    remarkPlugins: "",
    rehypePlugins: ""
}
const answer = 42;
const allIssues = i(ctx);

export {
    answer,
    allIssues
};
