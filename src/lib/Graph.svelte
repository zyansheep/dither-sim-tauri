<script>
	import { DataSet, Network } from "vis-network/standalone"
	import { onMount } from 'svelte';
	/* export let nodes: vis.DataSetNodes;
	export let edges; */
	var nodes = new DataSet([
		{ id: 1, label: "Node 1" },
		{ id: 2, label: "Node 2" },
		{ id: 3, label: "Node 3" },
		{ id: 4, label: "Node 4" },
		{ id: 5, label: "Node 5" },
	]);

	// create an array with edges
	var edges = [
		{ from: 1, to: 3 },
		{ from: 1, to: 2 },
		{ from: 2, to: 4 },
		{ from: 2, to: 5 },
		{ from: 3, to: 3 },
	];

	let container;
	
	onMount(async () => {
		var data = {
			nodes,
			edges,
		};
		var options = {};
		var network = new Network(container, data, options);
	});
</script>

<style>
	#mynetwork {
		width: 600px;
		height: 400px;
		border: 1px solid lightgray;
	}
</style>

<div id="mynetwork" bind:this={container}></div>