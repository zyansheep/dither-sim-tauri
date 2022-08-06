<script lang="ts">
  import Counter from './lib/Counter.svelte'
  import { invoke } from '@tauri-apps/api/tauri'

  function say_hello() {
    invoke('hello_world');
  }
</script>

<main>
  <div>
  </div>
  <h1>Vite + Svelte YAY!</h1>

  <div class="card">
    <Counter />
  </div>
  <button on:click="{say_hello}">Hello World!</button>
</main>

<style>

</style>