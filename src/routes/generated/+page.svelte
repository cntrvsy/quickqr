<script lang="ts">
  import QRCode from '@castlenine/svelte-qrcode';
  import logo from '$lib/assets/kbs-svg.svg';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { buttonVariants } from "$lib/components/ui/button";
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card";
  import { toast } from "svelte-sonner";
  import type { DownloadFormat, ErrorCorrectionLevel } from "$lib/schema";


  let url = $page.url.searchParams.get('url');
  let downloadFormat = $page.url.searchParams.get('downloadFormat');
  let errorCorrectionLevel = $page.url.searchParams.get('errorCorrectionLevel');
  let logoSize = $page.url.searchParams.get('logoSize');
  
  console.log(url, downloadFormat, errorCorrectionLevel, logoSize);

  

  let downloadUrl = $state('');

  const handleDownloadUrlGenerated = (url = '') => {
    downloadUrl = url;
  };
  const handleQrCodeGenerationFailed = () => {
    toast.error("QR Code Generation Failed", {
          description: "Url is too large for the QR code Format",
        });
  };

</script>
  
<section class="flex items-center justify-center h-screen text-center w-full">
  <div class="container flex flex-col py-8 mx-auto items-center">
    <div class="pt-14 pb-8">
      <QRCode data={url ?? ''} 
        errorCorrectionLevel={errorCorrectionLevel as ErrorCorrectionLevel ?? 'M'}
        dispatchDownloadUrl = {true}
        downloadUrlFileFormat={downloadFormat as DownloadFormat ?? 'png'}
        logoPath={logo}
        logoSize={Number(logoSize) ?? 20}
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
        <p class="mb-8 leading-relaxed">{url}</p>
      </Card.Content>
      <Card.Footer>
        <div class="flex w-full justify-center items-end">
          {#if downloadUrl}
            <a href={downloadUrl} download="QR-code-generated" target="_blank" class={buttonVariants({ variant: "outline" })}>Download QR Code</a>
          {/if}
          <div class="px-2">
            <!-- <button on:click={() => goto('/')} class="text-white">Go Back</button> -->
            <Button onclick={() => goto('/')} class="text-white">Go Back</Button>
          </div>
        </div>
      </Card.Footer>
    </Card.Root>
  </div>
</section>

  