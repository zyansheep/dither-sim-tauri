<script>
	import { onMount } from 'svelte';
	import * as d3 from 'd3';

	export let graph;

	let svg;
	let width = 500;
	let height = 600;
    const nodeRadius = 5;

	const padding = { top: 20, right: 40, bottom: 40, left: 25 };

	$: edges = graph.edges.map(d => Object.create(d));
	$: nodes = graph.nodes.map(d => Object.create(d));  

	const colourScale = d3.scaleOrdinal(d3.schemeCategory10);

	let transform = d3.zoomIdentity;
    let simulation
	onMount(() => {

	simulation = d3.forceSimulation(nodes)
		.force("link", d3.forceLink(edges).id(d => d.id))
		.force("charge", d3.forceManyBody())
		.force("center", d3.forceCenter(width / 2, height / 2))
		.on('tick', simulationUpdate);

	d3.select(svg)
		.call(d3.drag()
			.container(svg)
			.subject(dragsubject)
			.on("start", dragstarted)
			.on("drag", dragged)
			.on("end", dragended))
		.call(d3.zoom()
          .scaleExtent([1 / 10, 8])
          .on('zoom', zoomed));
	});

	function simulationUpdate () {
		simulation.tick();
		nodes = [...nodes];
		edges = [...edges];
	}

    function zoomed(currentEvent) {
        transform = currentEvent.transform;
        simulationUpdate();
    }

	function dragsubject(currentEvent) {
        const node = simulation.find(transform.invertX(currentEvent.x), transform.invertY(currentEvent.y), nodeRadius);
        if (node) {
            node.x = transform.applyX(node.x);
            node.y = transform.applyY(node.y);
        }
        return node;
	}

    function dragstarted(currentEvent) {
        if (!currentEvent.active) simulation.alphaTarget(0.3).restart();
        currentEvent.subject.fx = transform.invertX(currentEvent.subject.x);
        currentEvent.subject.fy = transform.invertY(currentEvent.subject.y);
    }

    function dragged(currentEvent) {
        currentEvent.subject.fx = transform.invertX(currentEvent.x);
        currentEvent.subject.fy = transform.invertY(currentEvent.y);
    }

    function dragended(currentEvent) {
        if (!currentEvent.active) simulation.alphaTarget(0);
        currentEvent.subject.fx = null;
        currentEvent.subject.fy = null;
    }

	function resize() {
		({ width, height } = svg.getBoundingClientRect());
	}


</script>

<svelte:window on:resize='{resize}'/>

<!-- SVG was here -->
<svg bind:this={svg} width='{width}' height='{height}'>
	{#each edges as link}
    <g stroke='#999' stroke-opacity='0.6'>
      <line x1='{link.source.x}' y1='{link.source.y}' 
            x2='{link.target.x}' y2='{link.target.y}'
            transform='translate({transform.x} {transform.y}) scale({transform.k} {transform.k})'>
            <title>{link.source.id}</title>
      </line>
    </g>
	{/each}

	{#each nodes as point}
    <circle class='node' r='5' fill='{colourScale(point.group)}' cx='{point.x}' cy='{point.y}'
     transform='translate({transform.x} {transform.y}) scale({transform.k} {transform.k})'>
    <title>{point.id}</title></circle>
	{/each}

</svg>

<style>
	svg {
		float: left;
	}

	circle {
		stroke: #fff;
    stroke-width: 1.5;
	}

</style>