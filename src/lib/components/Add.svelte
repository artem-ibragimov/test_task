<script lang="ts">
	export let disabled: boolean = false;
</script>

<div class="Add" class:Add-disabled={disabled} on:click>+</div>

<style scoped>
	.Add {
		display: flex;
		justify-content: center;
		align-items: center;
		color: #f5f5f5;
		font-size: 4em;
		width: 250px;
		height: 400px;
		background: #00000083;
		border-radius: 4px;
		cursor: pointer;
		opacity: 1;
		transition: opacity 0.7s;
	}
	.Add-disabled {
		opacity: 0.4;
	}
</style>
