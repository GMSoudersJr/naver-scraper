<script lang="ts">
	import Link from '$lib/components/Link.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>
		{data.title}
	</title>
</svelte:head>
<section>
	<h3 class="recursive-600 section-header">
		{data.links.length} results for: {data.searchedFor}
	</h3>
	{#await data.links}
		Loading links...
	{:then links}
		<ol class="link-list">
			{#each links as link (link)}
				<Link {link} />
			{/each}
		</ol>
	{:catch error}
		<p>error loading links: {error.message}</p>
	{/await}
</section>

<style>
	section {
		width: 100%;
		align-self: start;
		justify-self: center;
		padding: 0.5rem;
	}
	.section-header {
		width: 100%;
		color: var(--blueText);
	}
	.link-list {
		color: var(--blueText);
		line-height: 1.75;
	}
</style>
