<script lang="ts">
	import { invoke } from "@tauri-apps/api/tauri";
	import Network from "./lib/Network.svelte";
	import Tab, { Icon, Label } from "@smui/tab";
	import { Svg } from "@smui/common/elements";
	import TabBar from "@smui/tab-bar";
	import { slides } from "./lib/test-data.js";

	// Icons
	import { mdiGraphql, mdiSitemap } from "@mdi/js";

	let tabs = [
		{
			k: 1,
			label: "Internet",
			icon: mdiSitemap,
		},
		{
			k: 2,
			label: "Dither",
			icon: mdiGraphql,
		},
	];
	const options = {
		slides: slides,
		wrap: undefined,
		controls: {
			dots: false,
			dotsnum: false,
			dotsarrow: false,
			arrows: false,
			keys: true,
			drag: false,
			wheel: true,
		},
		slide: {
			gap: 0,
		},
		id: "slides",
	};

	let active = tabs[0];

	let internet_pane;
	let dither_pane;

	function say_hello() {
		invoke("hello_world");
	}
</script>

<main>
	<TabBar {tabs} let:tab bind:active id="tab-bar">
		<!-- Note: the `tab` property is required! -->
		<Tab
			{tab}
			stacked={true}
			indicatorSpanOnlyContent={true}
			tabIndicator$transition="fade"
			class="tab"
		>
			<Label>{tab.label}</Label>
			<Icon component={Svg} viewBox="0 0 24 24">
				<path fill="currentColor" d={tab.icon} />
			</Icon>
		</Tab>
	</TabBar>
	{#each slides as slide}
		<div class:hidden={slide.id !== active.k} class="slide">
			<p>Index: {slide.id}</p>
			<Network graph={slide} />
		</div>
	{/each}
</main>

<style>
	main {
	}
	#tabbar {
		margin: 20px;
	}
	.tab {
		display: inline-block !important;
	}
	.slide {
		width: 100%;
		height: 80%;
	}
	.hidden {
		display: none;
	}
</style>
