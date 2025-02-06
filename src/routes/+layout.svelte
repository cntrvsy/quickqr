<script>
import CustomPageTransition from "$lib/components/CustomPageTransition.svelte";
import { Toaster } from "$lib/components/ui/sonner";
import '@fontsource/do-hyeon';
import "../app.css";

export let data

</script>

<Toaster position="top-center"/>

<!-- Page Route Content -->
<CustomPageTransition key={data.url} duration={600}>
	<slot />
</CustomPageTransition>

<!-- <style>
	:body{
		font-family: 'Do Hyeon', sans-serif;
	}
</style> -->