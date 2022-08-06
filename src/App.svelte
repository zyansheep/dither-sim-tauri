<script lang="ts">
  import { invoke } from '@tauri-apps/api/tauri'
	import { Tabs, Tab, TabList, TabPanel } from 'svelte-tabs';
	import Graph from './lib/Graph.svelte'

  function say_hello() {
    invoke('hello_world');
  }
</script>

<main>
	<Tabs>
		<TabList>
			<Tab>Network</Tab>
			<Tab>Dither</Tab>
		</TabList>
	 
		<TabPanel>
			<h2>Panel One</h2>
			<div class="graph">
				<Graph />
			</div>
		</TabPanel>
	 
		<TabPanel>
			<h2>Panel Two</h2>
		</TabPanel>
	 
		<TabPanel>
			<h2>Panel Three</h2>
		</TabPanel>
	</Tabs>
</main>

<style>
	main {
		height: 100%;
		width: 100%;
	}
</style>