import { getIssue, issueInit } from "$lib/fetch";
import { assert } from "@thi.ng/errors";
import type { RequestHandler } from "@sveltejs/kit";

export async function get({ params }: RequestHandler) {
  assert(
    await issueInit(),
    `[${import.meta.url.split("/").pop()}; Could not initialize content`
  );
  const { slug } = params;
  try {
    const data = await getIssue(slug);
    console.log(data);
    return {
      body: JSON.stringify(data),
      headers: {
        "Cache-Control": `max-age=0, s-maxage=${60}`, // 1 minute.. for now
      },
    };
  } catch (err) {
    return {
      status: 404,
      body: err.message,
    };
  }
}
