export let slides = [
	{
		id: 1,
		nodes: [
			{ id: 1, label: "1" },
			{ id: 2, label: "2" },
			{ id: 3, label: "3" },
			{ id: 4, label: "4" },
			{ id: 5, label: "5" },
		],
		edges: [
			{ source: 1, target: 3 },
			{ source: 1, target: 2 },
			{ source: 2, target: 4 },
			{ source: 2, target: 5 },
			{ source: 3, target: 3 },
		]
	},
	{
		id: 2,
		nodes: [
			{ id: 1, label: "1" },
			{ id: 2, label: "2" },
			{ id: 3, label: "3" },
			{ id: 4, label: "4" },
			{ id: 5, label: "5" },
			{ id: 6, label: "6" },
		],
		edges: [
			{ source: 1, target: 3 },
			{ source: 1, target: 2 },
			{ source: 2, target: 4 },
			{ source: 2, target: 5 },
		]
	},	
]