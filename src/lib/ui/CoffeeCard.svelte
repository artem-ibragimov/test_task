<script lang="ts">
	import Card from '$lib/components/Card.svelte';

	export let data: ICoffeeData;

	type ICoffeeData = Partial<{
		blend_name: string;
		origin: string;
		variety: string;
		notes: string;
		intensifier: string;
		imgSrc: string;
		error: Error;
	}>;
</script>

<Card
	header={data.blend_name}
	imgSrc={data.imgSrc}
	subheader={data.variety}
	tooltip={data.origin}
	error={data.error}
	tags={data.notes?.split(',')}
/>
