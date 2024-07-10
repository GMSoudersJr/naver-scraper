<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>
		{data.title}
	</title>
</svelte:head>
<button type="submit" form="naverScrapeForm" class="noto-color-emoji-regular"> 🔍 </button>

<style>
	button {
		font-size: clamp(2rem, 50vw, 15rem);
		background-color: var(--forsythia);
		border: none;
	}
</style>
