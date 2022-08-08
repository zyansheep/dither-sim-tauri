<script lang="ts">
  import { invoke } from '@tauri-apps/api/tauri'
	import Graph from './lib/Graph.svelte'
	import Tab, { Icon, Label } from '@smui/tab';
	import { Svg } from '@smui/common/elements';
  import TabBar from '@smui/tab-bar';

	// Icons
	import { mdiGraphql, mdiSitemap } from '@mdi/js';

	let tabs = [
    {
      k: 1,
      label: 'Internet',
      icon: mdiSitemap,
    },
    {
      k: 2,
      label: 'Dither',
      icon: mdiGraphql,
    },
  ];
	let active = tabs[0];

	let internet_pane;
	let dither_pane;

  function say_hello() {
    invoke('hello_world');
  }
</script>

<main>
	<TabBar tabs={tabs} let:tab bind:active id="tab-bar">
		<!-- Note: the `tab` property is required! -->
		<Tab {tab}
			stacked={true}
			indicatorSpanOnlyContent={true}
			tabIndicator$transition="fade"
		>
			<Label>{tab.label}</Label>
			<Icon component={Svg} viewBox="0 0 24 24">
				<path fill="currentColor" d={tab.icon} />
			</Icon>
		</Tab>
	</TabBar>
	<div class="panes">
		<div class="pane" class:active={active === tabs[0]}>
			<p>Internet Tab</p>
			<Graph nodes={
				[
				{ id: 1, label: "1" },
				{ id: 2, label: "2" },
				{ id: 3, label: "3" },
				{ id: 4, label: "4" },
				{ id: 5, label: "5" },
			]
			} edges={
				[
					{ from: 1, to: 3 },
					{ from: 1, to: 2 },
					{ from: 2, to: 4 },
					{ from: 2, to: 5 },
					{ from: 3, to: 3 },
				]
			}></Graph>
		</div>
		<div class="pane" class:active={active === tabs[1]}>
			<p>Dither Tab</p>
			<Graph nodes={
				[
				{ id: 1, label: "1" },
				{ id: 2, label: "2" },
				{ id: 3, label: "3" },
				{ id: 4, label: "4" },
				{ id: 5, label: "5" },
				{ id: 6, label: "6" },
			]
			} edges={
				[
					{ from: 1, to: 3 },
					{ from: 1, to: 2 },
					{ from: 2, to: 4 },
					{ from: 2, to: 5 },
					{ from: 6, to: 1 },
				]
			}></Graph>
		</div>
	</div>
	
</main>


<style>
	main {
		width: 100%;
		height: 100%;
	}
	#tab-bar {
		z-index: 10;
		margin: 10px;
	}
	.panes {
		overflow-y: hidden;
		overflow-x: hidden;
		white-space: nowrap;
		width: 100%;
		height: 100%;
	}
	.panes .pane {
		display: inline-block;
		width: 100%;
		height: 100%;
	}
	.active {
		display: block;
	}
</style>