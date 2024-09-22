<script lang="ts">
  import { goto } from '$app/navigation';
  import main_hero from '$lib/assets/main_hero.svg'
 // import { invoke } from "@tauri-apps/api/core";

  let name = "";
  let greetMsg = "";
  let data:string = "";

  // async function greet() {
  //   // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  //   greetMsg = await invoke("greet", { name });
  // }

  function sendData() {
    goto(`/generated?data=${data}`);
  }

</script>

<!-- <div>
  <p>Click on the Tauri, Vite, and SvelteKit logos to learn more.</p>
  <form class="row" on:submit|preventDefault={greet}>
    <input id="greet-input" placeholder="Enter a name..." bind:value={name} />
    <button type="submit" class="btn btn-primary">Greet</button>
  </form>
  <p class="text-3xl font-bold underline">{greetMsg}</p>
</div> -->

<section>
  <div class="container mx-auto flex px-5 py-2 items-center justify-center flex-col">
    <img class="lg:w-2/6 md:w-3/6 w-5/6 mb-4 object-cover object-center rounded" alt="hero" src="{main_hero}">
    <!-- card -->
    <div class=" card bg-base-100 shadow-2xl items-center w-full">
      <div class="w-full md:w-2/3 flex flex-col mb-16 items-center text-center">
        <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium">Welcome to QuickQR</h1>
        <p class="mb-8 leading-relaxed">I got tired of having to use a website each time i wanted to do this.</p>
        <div>
          
            <div class="flex justify-center pb-2">
              <label for="hero-field" class="leading-7 text-center text-sm text-gray-600">write or paste your link below</label>
            </div>
            <div class="flex justify-center bg-slate-500 px-2">
              <textarea class="textarea textarea-accent textarea-lg w-full max-w-xs" bind:value={data}></textarea>
            </div>
  
          <div class="flex justify-center py-4">
            <button class="inline-flexe btn primary text-lg" on:click={sendData}>Generate QR Code</button>
          </div>
        </div>
        <div class=" card bg-base-100 shadow-2xl items-center">
        <p class="text-sm mt-2 mb-8 w-full text-gray-600 px-2">For now we can only do one qr code at a time. other features well come later</p>
        </div>
      </div>
    </div>
  </div>
</section>
