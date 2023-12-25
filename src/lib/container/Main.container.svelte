<script lang="ts">
	import Add from '$lib/components/Add.svelte';
	import { coffeeStore } from '$lib/main.store';
	import CoffeeCard from '$lib/ui/CoffeeCard.svelte';

	$: ({ cards, onLoadMoreClick, isLoading } = coffeeStore);

	coffeeStore.init();
</script>

<div class="Main">
	<div class="Main__content">
		{#each $cards as card}
			<CoffeeCard data={card} />
		{/each}
		<Add on:click={onLoadMoreClick} disabled={$isLoading} />
	</div>
</div>

<style scoped>
	.Main {
		display: flex;
		justify-content: center;
		align-items: center;
		background: #3144028b;
		padding: 16px;
		min-height: 100vh;
		overflow-x: hidden;
	}
	.Main__content {
		max-width: 800px;
		display: flex;
		flex: 1;
		flex-wrap: wrap;
		align-items: stretch;
		justify-content: center;
		justify-items: center;
		gap: 16px;
	}
</style>
