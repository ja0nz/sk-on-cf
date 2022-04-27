import { getContent } from "$lib/content";
import type { RequestHandler } from "@sveltejs/kit";

export async function get({ params }: RequestHandler) {
  console.log("reach", params);
  return { hello: 42 };

  const { slug } = params;
  let data;
  try {
    data = await getContent(slug);
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
