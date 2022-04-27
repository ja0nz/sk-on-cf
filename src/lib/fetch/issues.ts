/*
 * Dev
 * allBlogposts (await listContent())
 * listContent
 */
import { compile } from "mdsvex";
import { dev } from "$app/env";

export default ({ allBlogposts, remarkPlugins, rehypePlugins }) =>
  async function allIssues(slug) {
    // Get all blogposts if not already done - or in development
    if (dev || allBlogposts.length === 0) {
      console.log("loading allBlogposts");
      allBlogposts = await listContent();
      console.log("loaded " + allBlogposts.length + " blogposts");
      if (allBlogposts.length === 0) {
        throw new Error(
          "failed to load blogposts for some reason. check token" +
            process.env.GH_TOKEN
        );
      }
    }

    if (allBlogposts.length === 0) {
      throw new Error("no blogposts");
    }

    // Find the blogpost that matches this slug
    const blogpost = allBlogposts.find((post) => post.slug === slug);
    if (blogpost) {
      const blogbody = blogpost.content
        .replace(/\n{% youtube (.*?) %}/g, (_, x) => {
          // https://stackoverflow.com/a/27728417/1106414
          function youtube_parser(url) {
            const rx =
              /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?vi?=|&vi?=))([^#&?]*).*/;
            return url.match(rx)[1];
          }

          const videoId = x.startsWith("https://") ? youtube_parser(x) : x;
          return `<iframe
            class="w-full object-contain"
            src="https://www.youtube.com/embed/${videoId}"
            title="video123"
            name="video123"
            allow="accelerometer; autoplay; encrypted-media; gyroscope;
            picture-in-picture"
            frameBorder="0"
            webkitallowfullscreen="true"
            mozallowfullscreen="true"
            width="600"
            height="400"
            allowFullScreen
            aria-hidden="true"></iframe>`;
        })
        .replace(/\n{% (tweet|twitter) (.*?) %}/g, (_, _2, x) => {
          const url = x.startsWith("https://twitter.com/")
            ? x
            : `https://twitter.com/x/status/${x}`;
          return `
                    <blockquote class="twitter-tweet" data-lang="en" data-dnt="true" data-theme="dark">
                    <a href="${url}"></a></blockquote>
                    <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
                    `;
        });

      // Compile it with mdsvex
      const content = (
        await compile(blogbody, {
          remarkPlugins,
          rehypePlugins,
        })
      ).code
        // https://github.com/pngwn/MDsveX/issues/392
        .replace(/>{@html `<code class="language-/g, '><code class="language-')
        .replace(/<\/code>`}<\/pre>/g, "</code></pre>");

      return { ...blogpost, content };
    }

    throw new Error("Blogpost not found for slug: " + slug);
  };
