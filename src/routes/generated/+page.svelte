<script lang="ts">
  import QRCode from '@castlenine/svelte-qrcode';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { buttonVariants } from "$lib/components/ui/button";
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card";
  import { toast } from "svelte-sonner";

  let link = $page.url.searchParams.get('url');
  

  if (!link) {
    link = "No data, something went wrong";
  }

  let downloadUrl = '';

  const handleDownloadUrlGenerated = (url = '') => {
    downloadUrl = url;
  };
  const handleQrCodeGenerationFailed = () => {
    toast.error("QR Code Generation Failed", {
          description: "word count too large for the QR code Format",
        });
  };

</script>
  
<section class="flex items-center justify-center h-screen text-center w-full">
  <div class="container flex flex-col py-8 mx-auto items-center">
    <div class="pt-14 pb-8">
      <QRCode data="{link}" 
        downloadUrlFileFormat="png"
        dispatchDownloadUrl
        on:downloadUrlGenerated={(event) => handleDownloadUrlGenerated(event.detail.url)} 
        on:qrCodeGenerationFailed={handleQrCodeGenerationFailed}
      />
    </div>
    <!-- card -->
    <Card.Root>
      <Card.Header>
        <Card.Title>Generated QR Code for:</Card.Title>
      </Card.Header>
      <Card.Content>
        <p class="mb-8 leading-relaxed">{link}</p>
      </Card.Content>
      <Card.Footer>
        <div class="flex w-full justify-center items-end">
          {#if downloadUrl}
            <a href={downloadUrl} download="QR-code-filename.png" target="_blank" class={buttonVariants({ variant: "outline" })}>Download QR Code</a>
          {/if}
          <div class="px-2">
            <!-- <button on:click={() => goto('/')} class="text-white">Go Back</button> -->
            <Button on:click={() => goto('/')} class="text-white">Go Back</Button>
          </div>
        </div>
      </Card.Footer>
    </Card.Root>
  </div>
</section>

  