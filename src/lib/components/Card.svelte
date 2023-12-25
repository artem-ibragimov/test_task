<script lang="ts">
	import Loader from './Loader.svelte';

	export let tooltip: string | undefined;
	export let header: string | undefined;
	export let subheader: string | undefined;
	export let tags: string[] = [];
	export let imgSrc: string = '';
	export let error: Error | undefined = void 0;
</script>

<div class="Card" class:Card-error={!!error}>
	{#if !!error}
		{error.message}
	{/if}
	{#if !error}
		<div class="Card__banner">
			<Loader hidden={!!imgSrc} />
			<img class="Card__img" src={imgSrc} alt={header} hidden={!imgSrc} width={250} height={250} />
		</div>
		<div class="Card__content">
			<div class="Card__tooltip">{tooltip}</div>
			<div class="Card__header">{header}</div>
			<div class="Card__subheader">{subheader}</div>
			<div class="Card__tags no-scrollbar">
				{#each tags as t}
					<div class="Card__tag">{t}</div>
				{/each}
			</div>
		</div>
	{/if}
</div>

<style scoped>
	.Card {
		display: flex;
		width: 250px;
		height: 400px;
		flex-direction: column;
		background: #00000067;
		border-radius: 4px;
		box-shadow: rgba(71, 92, 0, 0.1) 0px 0px 0px 2px;
		box-sizing: border-box;
	}
	.Card-error {
		border: 4px dashed #5e0000;
		color: #5e0000;
		background: #a4000067;
		font-size: 2em;
		font-weight: 500;
		justify-content: center;
		align-items: center;
	}
	.Card:hover {
	}
	.Card__img {
		object-fit: cover;
		min-height: 100%;
	}
	.Card__content {
		opacity: 0.7;
		padding: 16px;
		flex-grow: 1;
		margin-bottom: 0;
		color: #f5f5f5;
		transition: opacity 0.7s;
	}
	.Card__content:hover {
		opacity: 1;
	}

	.Card__banner {
		flex: 250px;
		flex-grow: 5;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.Card__tooltip {
		font-size: 0.8em;
		font-weight: 300;
	}
	.Card__header {
		font-size: 2em;
		font-weight: 700;
	}
	.Card__subheader {
		font-size: 1.1em;
		font-weight: 500;
	}
	.Card__tags {
		cursor: pointer;
		overflow-y: scroll;
		display: flex;
		gap: 4px;
	}
	.Card__tag {
		white-space: nowrap;
		border-bottom: 1px solid #f5f5f5;
	}
</style>
