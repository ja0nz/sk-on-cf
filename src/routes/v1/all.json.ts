import { all } from "$lib/fetch";
import type { RequestHandler } from "@sveltejs/kit";

export async function get({ params }: RequestHandler) {
  let data;
  try {
    data = await all();
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
