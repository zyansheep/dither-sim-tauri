export let slides = [
	{
		id: 1,
		nodes: [
			{ id: 1, label: "1", x: 200, y: 100 },
			{ id: 2, label: "2", x: -100, y: 400 },
			{ id: 3, label: "3", x: 0, y: 100 },
			{ id: 4, label: "4", x: 400, y: 200 },
			{ id: 5, label: "5", x: 50, y: -500 },
			{ id: 6, label: "6", x: -500, y: 100 },
		],
		id_map: { 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5 },
		edges: [
			{ source: 1, target: 3 },
			{ source: 1, target: 2 },
			{ source: 2, target: 4 },
			{ source: 2, target: 5 },
			{ source: 3, target: 3 },
			{ source: 3, target: 6 },
		]
	},
	{
		id: 1,
		nodes: [
			{ id: 1, label: "1", x: 200, y: 100 },
			{ id: 2, label: "2", x: -100, y: 400 },
			{ id: 3, label: "3", x: 300, y: -100 },
			{ id: 4, label: "4", x: 200, y: 0 },
			{ id: 5, label: "5", x: 100, y: -300 },
			{ id: 6, label: "6", x: -500, y: 100 },
		],
		id_map: { 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5 },
		edges: [
			{ source: 1, target: 3 },
			{ source: 1, target: 2 },
			{ source: 2, target: 4 },
			{ source: 2, target: 5 },
			{ source: 3, target: 3 },
			{ source: 2, target: 6 },
		]
	},
]