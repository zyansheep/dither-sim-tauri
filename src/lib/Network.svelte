<script lang="ts">
	import { onMount } from 'svelte';
	import * as d3 from 'd3';

	type IdType = number | string | symbol;
	type Edge<Id extends IdType> = { source: Id, target: Id }
	type Node<Id extends IdType> = { id: Id, label: string, x: number, y: number }
	type Graph<Id extends IdType> = { nodes: Node<Id>[], edges: Edge<Id>[], id_map: { [key in Id]: number }, id: number }
	export let graph : Graph<any>;

	let svg;
	let width = 900;
	let height = 600;
    const nodeRadius = 40;

	const padding = { top: 20, right: 40, bottom: 40, left: 25 };

	$: nodes = graph.nodes.map(d => Object.create(d))

	$: edges = graph.edges.map(d => { return { ...d, source: nodes[graph.id_map[d.source]], target: nodes[graph.id_map[d.target]] } });

	const colourScale = d3.scaleOrdinal(d3.schemeCategory10);

	let transform = d3.zoomIdentity;
    let simulation
	onMount(() => {
		console.log("Mounting:", graph.id);
		simulation = d3.forceSimulation(nodes)
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
		}
	);

	function simulationUpdate () {
		simulation.tick();
		nodes = [...nodes];
		edges = [...edges];
	}

    function zoomed(currentEvent) {
        transform = currentEvent.transform;
        simulationUpdate();
    }

	function dragsubject(evt) {
        const node_id = evt.sourceEvent.srcElement.dataset.id;
		const node = nodes[graph.id_map[Number(node_id)]]
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
    <g stroke='#999' stroke-opacity='5' stroke-width="5px">
      <line x1='{link.source.x}' y1='{link.source.y}' 
            x2='{link.target.x}' y2='{link.target.y}'
            transform='translate({transform.x} {transform.y}) scale({transform.k} {transform.k})'>
            <title>{link.source.id}</title>
      </line>
    </g>
	{/each}

	{#each nodes as point}
    <circle class='node' r='{nodeRadius}' fill='{colourScale(point.group)}' cx='{point.x}' cy='{point.y}' data-id='{point.id}'
     transform='translate({transform.x} {transform.y}) scale({transform.k} {transform.k})'>
	</circle>

	<text x='{point.x}' y='{point.y}' transform='translate({transform.x} {transform.y}) scale({transform.k} {transform.k})'>{point.id}</text>

	{/each}

</svg>

<style>
	svg {
		float: left;
		border: 1px solid lightgray;
	}

	circle {
		stroke: #fff;
    stroke-width: 1.5;
	}
	text {
		text-align: center;
		font-size: 20px;
	}

</style>