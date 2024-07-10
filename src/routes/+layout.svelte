<script lang="ts">
	import '../app.css';
	import { onNavigate, beforeNavigate, afterNavigate } from '$app/navigation';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Form from '$lib/components/Form.svelte';
	import Loading from '$lib/components/Loading.svelte';

	let loading = $state(false);
	beforeNavigate(async (navigation) => {
		loading = true;
	});

	afterNavigate(async (navigation) => {
		loading = false;
	});

	let { children } = $props();
</script>

<main class="main-layout">
	<div class="header-layout">
		<Header />
		<Form />
	</div>
	{#if loading}
		<Loading />
	{:else}
		{@render children()}
	{/if}
	<Footer />
</main>

<style>
	.main-layout {
		background-color: var(--forsythia);
		filter: brightness(80%);
		min-height: 100vh;
		display: grid;
		grid-template-columns: minmax(300px, 900px);
		grid-template-rows: min-content 1fr min-content;
		justify-content: center;
		justify-items: center;
		align-items: center;
		row-gap: 0.5rem;
	}
	.header-layout {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: repeat(2, min-content);
		justify-content: center;
		row-gap: 1.5rem;
	}
</style>
