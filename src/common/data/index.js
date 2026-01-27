const projectsWidgets = [
	{
		id: 1,
		feaIcon: "briefcase",
		feaIconClass: "primary",
		label: "Active Projects",
		badgeClass: "danger",
		icon: "ri-arrow-down-s-line",
		percentage: "5.02 %",
		caption: "Projects this month",
		subCounter: [{ id: 1, counter: "825", suffix: "" }],
	},
	{
		id: 2,
		feaIcon: "award",
		feaIconClass: "warning",
		label: "New Leads",
		badgeClass: "success",
		icon: "ri-arrow-up-s-line",
		percentage: "3.58 %",
		caption: "Leads this month",
		subCounter: [{ id: 1, counter: "7522", suffix: "", separator: "," }],
	},
	{
		id: 3,
		feaIcon: "clock",
		feaIconClass: "info",
		label: "Total Hours",
		badgeClass: "danger",
		icon: "ri-arrow-down-s-line",
		percentage: "10.35 %",
		caption: "Work this month",
		subCounter: [
			{ id: 1, counter: "168", suffix: "h" },
			{ id: 1, counter: "40", suffix: "m" },
		],
	},
];

export { projectsWidgets };
