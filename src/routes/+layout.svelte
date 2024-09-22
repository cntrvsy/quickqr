<script>
import CustomPageTransition from "$lib/components/CustomPageTransition.svelte";
import '@fontsource/do-hyeon';
import "../app.css";

export let data

</script>
  
<!-- <slot /> -->

  	<!-- Page Route Content -->
<CustomPageTransition key={data.url} duration={600}>
	<slot />
</CustomPageTransition>

<style>
	:global(body){
		font-family: 'Do Hyeon', sans-serif;
	}
</style>