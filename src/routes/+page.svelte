<script lang="ts">
  import { goto } from '$app/navigation';

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

<section class="flex items-center justify-center h-screen text-center w-full">
  <div class="container flex flex-col py-8 mx-auto items-center">

    <!-- CTA portion -->
    <div class="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
      <h1 class="title-font text-7xl italic text-white">QuickQR</h1>
      <p class="leading-relaxed text-xl mt-4 text-white">enter your link and generate a qr code in seconds!</p>
      <br/>
      <!-- formsnaps -->
       <Card.Root>
        <Card.Header>
          <Card.Title>Settings</Card.Title>
        </Card.Header>
        <Card.Content>
          <form method="POST" use:enhance>
           <!-- URL -->
            <Form.Field {form} name="string">
              <Form.Control let:attrs>
                  <Form.Label>URL</Form.Label>
                  <Input {...attrs} bind:value={$formData.string} placeholder="https://example.com" />
              </Form.Control>
              <Form.Description>be sure to enter a valid URL or text</Form.Description>
              <Form.FieldErrors />
            </Form.Field>
            
            <Form.Button>Generate QR CODE</Form.Button>
           </form>
        </Card.Content>
        <Card.Footer>
          <p class="text-white text-sm"> more features coming soon</p>
        </Card.Footer>
      </Card.Root>
    </div>
  </div>
</section>

