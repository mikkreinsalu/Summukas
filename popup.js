webix.ui({
				view: "popup",
				id: "popup",
				height: 250,
			    width: 300,
			    head: "Save or Load",
			    position: "center",
				body: { 
					rows: [
						{
							view: "label",
							label: "Sisesta kuupäev ja asukoht",
							align: "center"
						},
						{
							view: "text",
							label: "Kuupäev",
							id: "date"
						},
						{
							view: "text",
							label: "Asukoht",
							id: "eventPlace"
						},
						{
							cols: [
								{
									view: "button",
									label: "Salvesta uus",
									align: "center",
									click: fn.saveNewFile
								}
							]
						}
						
					]
				}

		}).show();