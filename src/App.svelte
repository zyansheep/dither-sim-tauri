<script lang="ts">
  import Counter from './lib/Counter.svelte'
	import Graph from './lib/Graph.svelte'
  import { invoke } from '@tauri-apps/api/tauri'

  function say_hello() {
    invoke('hello_world');
  }
</script>

<main>
  <div>
  </div>
  <h1>Vite + Svelte YAY Hello!</h1>

  <div class="card">
    <Counter />
  </div>
	<div class="graph">
		<Graph />
	</div>
  <button on:click="{say_hello}">Hello World!</button>
</main>

<style>
	.graph {
		width: 200;
		height: 200;
	}
</style>