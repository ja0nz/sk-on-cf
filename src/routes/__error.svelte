<script context="module">
  /** @type {import('@sveltejs/kit').ErrorLoad} */
  export function load({ url, error, status }) {
    return {
      props: { error, status, url },
    };
  }
</script>

<script>
  // import Nav from '../components/Nav.svelte';
  import { dev } from "$app/env";
  export let error;
  export let status;
  export let url;

  let title = "";
  let msg = "";

  // enter client side
  if (typeof window !== 'undefined') {
    // TODO Check offline capabilities
    if (navigator?.onLine === false) {
      title = "Offline";
      msg = "Find the internet and try again";
    }
  }

  // TODO more status?
  if (status === 404) {
    title = "Page not found :(";
    msg = "Sorry! If you think this URL is broken, please let me know!";
  }
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<section id="error" class="">
  <h1>{status}: {title}</h1>

  {#if status === 404}
    <p class="">There is no post at the slug <code>{url.pathname}</code>.</p>
    <p>
      <a href={"/ideas/?filter=" + url.pathname.slice(1)}
        >TODO: Try searching for it here!</a
      >
    </p>
    <p class="">
      If you believe this was a bug, please let me know! Email hey [at] ja.nz
    </p>
  {:else}
    <p class="">{msg}</p>
  {/if}
  {#if dev && error.stack}
    <pre class="">{error.stack}</pre>
  {/if}
</section>
