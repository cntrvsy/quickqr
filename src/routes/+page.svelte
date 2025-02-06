<script lang="ts">
  import { goto } from '$app/navigation';

  import { Button } from "$lib/components/ui/button/index.js";

  import { type SuperValidated, type Infer, superForm} from "sveltekit-superforms";
  import SuperDebug from "sveltekit-superforms";
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { urlSchema, type UrlSchema } from '$lib/schema';
  
  import { Input } from "$lib/components/ui/input";
  import * as Form from "$lib/components/ui/form";
  import { toast } from "svelte-sonner";
  import * as Card from "$lib/components/ui/card";

  export let data:  SuperValidated<Infer<UrlSchema>>;
  

  const form = superForm(data, {
		validators: zodClient(urlSchema),
    SPA: true,
    onUpdate: ({ form }) => {

      if (form.valid) {

        sendData()

      } else {

        toast.error("Something went wrong", {
          description: "Please be sure to fill in all required fields",
        });

      }
    }
	});

	const { form: formData, enhance } = form;


  function sendData() {
    toast.success("Generating QR Code", {
      description: "Please be patient",
    });
    //wait 3 seconds
    setTimeout(() => {
      console.log($formData.string);
    }, 3000);
  
    goto(`/generated?url=${$formData.string}`);
  }

</script>

<!-- <div class="pb-4">
  <SuperDebug data={$formData} />
</div> -->


<Button>Click me</Button>
