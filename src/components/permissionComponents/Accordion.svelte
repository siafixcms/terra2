<script>
    import ChevronIcon from "./icons/ChevronIcon.svelte";
	
	export let title = '';
	export const paddingX = 20;
	export const paddingY = 4;
	export const bgColor = 'white';
	export const borderColor = '#D8D8D8';
	export const customClass = '';
	
	let show = true;
	
</script>

<div class="accordion">
	<div class="accordion-header bg-{bgColor} border-[{borderColor}] py-{paddingY} px-{paddingX} border-t border-b {customClass}" on:click={()=> show = !show}>
			<span class="title">{title} 
			</span>
			{#if show}
				<span class="transform rotate-90 cursor-pointer"><ChevronIcon/></span>
			{:else}
				<span class="cursor-pointer"><ChevronIcon/></span>
			{/if}
	</div>
	{#if show}
			<slot></slot>
	{/if}
</div>


<style>
	.accordion {
			@apply w-full flex flex-col justify-center items-center;
	}
	.accordion-header{
			@apply w-full flex flex-row items-center justify-between;
	}

</style>