webix.ui({
				view: "popup",
				id: "popup",
				height: 270,
			    width: 350,
			    head: "Ürituse andmed",
			    position: "center",
				body: { 
					rows: [
						{
							view: "label",
							label: "Sisesta ürituse andmed",
							align: "center"
						},
						{
							view: "text",
							label: "Kuupäev",
							labelWidth: 130,
							id: "date"
						},
						{
							view: "text",
							label: "Asukoht",
							labelWidth: 130,
							id: "eventPlace"
						},
						{
							view: "text",
							label: "Drive dokument",
							labelWidth: 130,
							id: "link"
						},
						{
							cols: [
								{
									view: "button",
									label: "Salvesta",
									align: "center",
									click: fn.saveNewFile
								}
							]
						}
						
					]
				}

		}).show();