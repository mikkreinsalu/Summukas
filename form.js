webix.ui({
	id: "foo",
	cols:
	[
		{
			view: "datatable",
			id: "grid",
			select: true,
			height: 700,
			navigation: true,
			scroll: true,

			on: {
				onSelectChange: fn.onGridSelectChange
			},
			columns:
			[
				{id: "flight_nr",	header: "Lennupilet", 	fillspace: true, sort: "int"},
				{id: "passenger1",	header: "Reisija 1", 	fillspace: true, sort: "string"},
				{id: "passenger2",	header: "Reisija 2", 	fillspace: true, sort: "string"},
				{id: "passenger3",	header: "Reisija 3", 	fillspace: true, sort: "string"},
				{id: "check_in", 	header: "Check-in", 	fillspace: true, sort: "int"},
				{id: "duration", 	header: "Lennu pikkus", fillspace: true},
				{id: "price", 		header: "Hind", 		fillspace: true, sort: "int"},
				{id: "seats",		header: "Kohti",		fillspace: true},
				{id: "place",		header: "Asukoht",		fillspace: true, hidden: true}
			]
			
		},
		{
			view: "form",
			id: "detForm",
			gravity: 0.4,
			elements:
			[
				{
					view: "text",
					label: "Lennupilet",
					name: "flight_nr",
					hidden: true
				},
				{
					view: "text",
					label: "Kohti",
					name: "seats",
					value: "0",
					hidden: true
				},
				{
					view: "text",
					label: "1. reisija",
					name: "passenger1",
					on: 
					{
						onAfterRender: fn.onFormRender,
						onKeypress: fn.onPressEnter
					}
					
				},
				{
					view: "text",
					label: "2. reisija",
					name: "passenger2",
					id: "reisija2",
					on: 
					{
						onKeypress: fn.onPressEnter2
					}

					
				},
				{
					view: "text",
					label: "3. reisija",
					name: "passenger3",
					id: "reisija3"
					
				},
				{
					view: "select",
					id: "times",
					label: "Check-in",
					labelPosition:"top",
					options:["08:00", "08:06", "08:13", "08:19", "08:26", "08:32", "08:39", "08:45", "08:52", 
							 "09:00", "09:06", "09:13", "09:19", "09:26", "09:32", "09:39", "09:45", "09:52", 
							 "10:00", "10:06", "10:13", "10:19", "10:26", "10:32", "10:39", "10:45", "10:52", 
							 "11:00", "11:06", "11:13", "11:19", "11:26", "11:32", "11:39", "11:45", "11:52", 
							 "12:00", "12:06", "12:13", "12:19", "12:26", "12:32", "12:39", "12:45", "12:52", 
							 "13:00", "13:06", "13:13", "13:19", "13:26", "13:32", "13:39", "13:45", "13:52", 
							 "14:00", "14:06", "14:13", "14:19", "14:26", "14:32", "14:39", "14:45", "14:52",
							 "15:00", "15:06", "15:13", "15:19", "15:26", "15:32", "15:39", "15:45", "15:52",
							 "16:00", "16:06", "16:13", "16:19", "16:26", "16:32", "16:39", "16:45", "16:52",
							 "17:00", "17:06", "17:13", "17:19", "17:26", "17:32", "17:39", "17:45", "17:52",
							 "18:00", "18:06", "18:13", "18:19", "18:26", "18:32", "18:39", "18:45", "18:52",
							 "19:00", "19:06", "19:13", "19:19", "19:26", "19:32", "19:39", "19:45", "19:52",
							 "20:00", "20:06", "20:13", "20:19", "20:26", "20:32", "20:39", "20:45", "20:52",
							 "21:00", "21:06", "21:13", "21:19", "21:26", "21:32", "21:39", "21:45", "21:52",
							 "22:00", "22:06", "22:13", "22:19", "22:26", "22:32", "22:39", "22:45", "22:52",
							 "23:00", "23:06", "23:13", "23:19", "23:26", "23:32", "23:39", "23:45", "23:52", 


					],
					name: "check_in"
				},
				{
					view: "text",
					label: "Lennu pikkus",
					labelWidth: 100,
					name: "duration"
				},
				{
					view: "text",
					label: "Hind",
					name: "price"
				},
				{
					cols:
					[
						{
							view: "button",
							label: "Puhasta",
							click: (el,e) => {
								fn.onResetClick(el,e,$$("detForm"));
							}
						},
						{
							view: "button",
							label: "Sisesta",
							id: "sisestusNupp",
							click: fn.onSaveClick
						},
						{
							view: "button",
							label: "Muuda",
							id: "muudaNupp",
							click: fn.onChangeClick,
							hidden: true
						}
					]
				},
				{
					cols:
					[
							{
								view: "button",
								label: "Lae andmed",
								click: fn.getData
							},
							{
								view: "button",
								label: "Prindi pilet",
								id: "printNupp",
								disabled: true,
								click: fn.onPrintClick
							}
					]
				},
				{
					paddingY: 200,
					paddingX: 50,
					cols:
					[
							{
								view: "button",
								id: "excelNupp",
								label: "Salvesta Excel Faili",
								disabled: true,
								click: fn.saveOnExcel
							}
					]
				}
			]
		}
	]
});