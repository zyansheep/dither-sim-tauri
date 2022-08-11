<script lang="ts">
	import { Network } from "vis-network/standalone"
	import type { Node, Edge } from "vis-network/standalone"
	import { onMount } from 'svelte';

	// Attributes
	export let nodes: Node[];
	export let edges: Edge[];

	// Network Element
	let container;
	let network;
	onMount(async () => {
		if(network === undefined) {
			var data = {
				nodes,
				edges,
			};
			var options = {
				physics: { enabled: false }
			};
			network = new Network(container, data, options);
		}
	});
</script>

<style>
	#graph {
		border: 1px solid lightgray;
		width: 99%;
		height: 99%;
	}
</style>

<div id="graph" bind:this={container}></div>