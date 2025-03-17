<script lang="ts">
  import { goto } from '$app/navigation';

  import { type SuperValidated, type Infer, superForm} from "sveltekit-superforms";
  import SuperDebug from "sveltekit-superforms";
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { urlSchema, type UrlSchema} from '$lib/schema';

  import * as Select from "$lib/components/ui/select";
  import { Input } from "$lib/components/ui/input";
  import * as Form from "$lib/components/ui/form";
  import { toast } from "svelte-sonner";
  import * as Card from "$lib/components/ui/card";

  
  let { data } : {data:  SuperValidated<Infer<UrlSchema>> } = $props();

  const form = superForm(data, {
		validators: zodClient(urlSchema),
    SPA: true,
    onUpdate: ({ form }) => {

      if (form.valid) {
        console.log(form.data);

        console.log("valid");

        sendData(form.data.url, form.data.downloadFormat, form.data.errorCorrectionLevel, form.data.logoSize);

      } else {

        toast.error("Something went wrong", {
          description: "Please be sure to fill in all required fields",
        });

      }
    }
	});

  const { form: formData, enhance } = form;

  async function sendData(url:string, downloadFormat:string, errorCorrectionLevel:string, logoSize:number) {
    toast.success("Generating QR Code", {
      description: "Please be patient",
    });
    //wait 1 seconds
    await new Promise(resolve => setTimeout(resolve, 1000));

    //goto(`/generated`)
    goto(`/generated?url=${url}&downloadFormat=${downloadFormat}&errorCorrectionLevel=${errorCorrectionLevel}&logoSize=${logoSize}`);
    
  }

</script>

<!-- <div class="pb-4">
  <SuperDebug data={$formData} />
</div> -->


<section class="flex items-center justify-center h-screen text-center w-full">
  <div class="container flex flex-col mx-auto items-center">
    <!-- CTA portion -->
    <div class="lg:w-3/5 md:w-1/2 lg:pr-0 pr-0">
      <h1 class="title-font text-7xl italic text-white font-serif">QuickQR</h1>
      <p class="leading-relaxed text-xl mt-4 text-white font-serif">enter your link and generate a qr code in seconds!</p>
      <br/>
      <!-- formsnaps -->
       <Card.Root>
        <Card.Header>
          <Card.Title>Settings</Card.Title>
        </Card.Header>
        <Card.Content>

          <form method="POST" use:enhance>
           <!-- URL -->
            <Form.Field {form} name="url">
              <Form.Control>
                {#snippet children({ props })}
                  <Form.Label>
                    <span class="font-serif">URL<span>
                  </Form.Label>
                  <Input {...props} bind:value={$formData.url} placeholder="https://example.com" />
                {/snippet}
                </Form.Control>
              <Form.Description>
                <span class="font-serif">be sure to enter a valid URL or text</span>
              </Form.Description>
              <Form.FieldErrors />
            </Form.Field>
            <!-- Download Format -->
            <Form.Field {form} name="downloadFormat">
              <Form.Control>
                {#snippet children({ props })}
                  <Form.Label class='font-medium'>
                    <span class="font-serif"> Download Format </span> <span class="font-serif">
                  </Form.Label>
                  <Select.Root
                    type="single"
                    bind:value={$formData.downloadFormat}
                    name={props.name}
                  >
                    <Select.Trigger {...props}>
                      {$formData.downloadFormat
                        ? $formData.downloadFormat
                        : "Select a format"}
                    </Select.Trigger>
                    <Select.Content>
                      <!-- Change Items based on your need -->
                      <Select.Item value="png" label="png" />
                      <Select.Item value="jpeg" label="jpeg" />
                      <Select.Item value="jpg" label="jpg" />
                      <Select.Item value="svg" label="svg" />
                      <Select.Item value="webp" label="webp" />
                    </Select.Content>
                  </Select.Root>
                {/snippet}
              </Form.Control>
              <Form.Description class="text-muted-foreground text-sm">
                <span class="font-serif">Select your favorite framework</span>
              </Form.Description>
              <Form.FieldErrors class='text-sm text-destructive' />
            </Form.Field>
            <!-- Error Correction Level -->
            <Form.Field {form} name="errorCorrectionLevel">
              <Form.Control>
                {#snippet children({ props })}
                  <Form.Label class='font-medium'>
                    <span class="font-serif">Error Correction Level</span>
                  </Form.Label>
                  <Select.Root
                    type="single"
                    bind:value={$formData.errorCorrectionLevel}
                    name={props.name}
                  >
                    <Select.Trigger {...props}>
                      {$formData.errorCorrectionLevel
                        ? $formData.errorCorrectionLevel
                        : "Select a Level"}
                    </Select.Trigger>
                    <Select.Content>
                      <!-- Change Items based on your need -->
                      <Select.Item value="L" label="L (Approx 7%)" />
                      <Select.Item value="M" label="M (Approx 15%)" />
                      <Select.Item value="Q" label="Q (Approx 25%)" />
                      <Select.Item value="H" label="H (Approx 30%)" />
                    </Select.Content>
                  </Select.Root>
                {/snippet}
              </Form.Control>
              <Form.Description class="text-muted-foreground text-sm">
                <span class="font-serif">Select your error correction level (pick M if not sure)</span>
              </Form.Description>
              <Form.FieldErrors class='text-sm text-destructive' />
            </Form.Field>
            <!-- Logo Size -->
            <Form.Field {form} name="logoSize">
              <Form.Control>
                {#snippet children({ props })}
                  <Form.Label class='font-medium'>
                    <span class="font-serif">Logo Size</span>
                  </Form.Label>
                  <Input
                    {...props}
                    type="number"
                    placeholder="20"
                    bind:value={$formData.logoSize}
                  />
                  <Form.Description class="text-muted-foreground text-xs">
                    <span class="font-serif">
                    Enter a number between 1 and 25
                    </span>
                  </Form.Description>
                {/snippet}
              </Form.Control>
              <Form.FieldErrors class='text-sm text-destructive' />
            </Form.Field>
            
            <Form.Button>Generate QR CODE</Form.Button>
          </form>

        </Card.Content>
        <Card.Footer>
          <p class="text-gray-500 text-xs"> *more features coming soon</p>
        </Card.Footer>
      </Card.Root>
    </div>
  </div>
</section>
