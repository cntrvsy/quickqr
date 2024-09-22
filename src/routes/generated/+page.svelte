<script lang="ts">
  import QRCode from '@castlenine/svelte-qrcode';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  let link = $page.url.searchParams.get('data');
  

  if (!link) {
    link = "No data, something went wrong";
  }

  let downloadUrl = '';

  const handleDownloadUrlGenerated = (url = '') => {
    downloadUrl = url;
  };

</script>
  
<section>
  <div class="container mx-auto flex px-5 py-2 items-center justify-center flex-col">
    <div class="pt-14 pb-8">
      <QRCode data="{link}" 
        downloadUrlFileFormat="png"
        dispatchDownloadUrl
        on:downloadUrlGenerated={(event) => handleDownloadUrlGenerated(event.detail.url)}  
      />
    </div>
    <!-- card -->
    <div class=" card bg-base-100 shadow-2xl items-center">
      <div class="w-full md:w-2/3 flex flex-col mb-16 items-center text-center">
        <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium">Here is your code for:</h1>
        <p class="mb-8 leading-relaxed">{link}</p>
        <div class="flex w-full justify-center items-end">
          {#if downloadUrl}
            <a href={downloadUrl} download="QR-code-filename.png" target="_blank" class="btn btn-primary">Download QR Code</a>
          {/if}
          <div class="px-2">
            <button on:click={() => goto('/')} class="btn btn-primary">Go Back</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

  