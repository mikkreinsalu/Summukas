newId = 0;
flightNr = 1;
eventPlace = "";
dateAndName = "";
fnr = "";
link = "";
jsonUrl = "";
jsonRows = [];
jsonTimestamp = [];
kontroll = true;
seatValue = "";
fs = require('fs');
execSync = require('child_process').execSync;
fn = {
	onFormRender: () => {			// programmi laadimisel tehtavad tegevused
		$$("detForm").focus();
		$$('reisija2').disable();
        $$('reisija3').disable();
		
	},
	onPressEnter: () => {		// avab 2. lendaja välja
		$$('reisija2').enable();
	},
	onPressEnter2: () => {		// avab 3. lendaja välja
		$$('reisija3').enable();
	},
	onResetClick: (el,e,form) => {		// puhastab vormi andmeväljad
		var grid = $$("grid"),
			sel = grid.getSelectedId();
		$$('muudaNupp').hide();
		$$('sisestusNupp').show();
		$$('printNupp').disable();
		fn.onFormRender();
		form = form || $$("detForm");
		form.clear();

		grid.unselect(sel);

	},
	onChangeClick: () => {		// muuda nupu funktsioon, mis muudab tabelis valitud andmed kui neid on vormiga muudetud
		fn.setSeats();
		var grid = $$("grid"),
			data = $$("detForm").getValues(),
			row = grid.getSelectedItem();
		
		row.passenger1 = data.passenger1;
		row.passenger2 = data.passenger2;
		row.passenger3 = data.passenger3;
		if (data.check_in === "") {
			console.log("korras");
		}
		else {
			row.check_in = data.check_in;
			grid.updateItem(row.check_in);
		}
		row.duration = data.duration;
		row.price = data.price;
		row.seats = data.seats;
		grid.updateItem(row.passenger1);
		grid.updateItem(row.passenger2);
		grid.updateItem(row.passenger3);
		grid.updateItem(row.duration);
		grid.updateItem(row.price);
		grid.updateItem(row.seats);

		fn.onResetClick();


	},
	onPrintClick: () => {	//fs teeki kasutamine, millega saab faili teha
		var grid = $$("grid"),			// webixi enda võimalus kätte saada andmetabeli objekti
			row = grid.getSelectedItem(),		// muutuja row saab väärtuseks objekti andmed mis on andmetabelis selekteeritud
			
			text = "^Q130,0,0\r^W70\r^H8\r^P1\r^S4\r^AT\r^C1\r^R0\r~Q+0\r^O0\r^D0\r^E0\r~R200\r" +
			"^XSET,ROTATION,0\r^L\rDy2-me-dd\nTh:m:s\r" + 
			"AD,183,820,1,1,0,1E," + row.passenger1 +		// text muutuja saab väärtuseks sõne,
			"\rAD,135,820,1,1,0,1E," + row.passenger2 +		// milles on kirjas printerile vajalikud käsud
			"\rAD,81,820,1,1,0,1E," + row.passenger3 +		// ja lennu ja resijate andmetega muutujad
			"\rAD,195,510,1,1,0,1E," + dateAndName +
			"\rAD,141,506,1,1,0,1E," + eventPlace +
			"\rAD,83,518,1,1,0,1E," + row.check_in +
			"\rAD,510,965,2,2,0,1E," + row.flight_nr +
			"\rAD,356,989,2,2,0,1E," + row.seats + 
			"\rE\r"

		fs.writeFile("CHANGE_TO_FILEPATH", text, function(err) {	//kirjutab antud aadressile txt faili
			if(err) {																	// sisuks text väärtus
				return console.log(err);					//teises arvutis kindlasti vahetada ära faili asukoht!!!
			}
			fn.printFile()			// kui fail on kirjutatud käivitub kohe ka printimise funktsioon
			console.log("file tehtud");
		});
		

	},
	saveOnExcel: () => {			// salvestab kogu tabeli Exceli faili, hetkel NW-ga ei tööta
		webix.toExcel($$("grid"),{
			filename: eventPlace + "_" + dateAndName,
			name: "Summukas"
		});			
		
	},
	onGridSelectChange: () => {		// tabelis andmerea valimise funktsioon, saadab andmed vormi 
		var grid = $$("grid"),
			selItem = grid.getSelectedItem();
		$$("detForm").setValues(selItem);
		$$('reisija2').enable();
		$$('reisija3').enable();
		$$('sisestusNupp').hide();
		$$('muudaNupp').show();
		$$('printNupp').enable();

	},
	setFlightNr: () => {		// iga andmerea või pileti järjekorra numbri seadmise funktsioon
		fnr = flightNr.toString();
		$$("detForm").setValues({flight_nr: fnr}, true);
		flightNr += 1;
		
	},
	setSeats: () => {		// määrab vastavalt inimeste arvule istmete arvu vormist sisestamise puhul
		var passengerName1 = $$("detForm").getValues().passenger1,
			passengerName2 = $$("detForm").getValues().passenger2,
			passengerName3 = $$("detForm").getValues().passenger3
		if (passengerName1 != "" && passengerName2 === "" && passengerName3 === "") {
			$$("detForm").setValues({seats: "1"}, true);	
		}
		if (passengerName1 != "" && passengerName2 != "" && passengerName3 === "") {
			$$("detForm").setValues({seats: "2"}, true);
		}
		if (passengerName1 != "" && passengerName2 != "" && passengerName3 != "") {
			$$("detForm").setValues({seats: "3"}, true);
		}
		if (passengerName1 === "" && passengerName2 === "" && passengerName3 === "") {
			$$("detForm").setValues({seats: "0"}, true);
		}
	},
	setJsonSeats: (seat1, seat2, seat3) => {		//määrab vastavalt inimeste arvule istmete arvu andmete laadimise puhul
		if (seat1.length > 1 && seat2.length > 1 && seat3.length > 1) {
			seatValue = "3";
		}
		if (seat1.length > 1 && seat2.length > 1 && seat3.length <= 1) {
			seatValue = "2";
		}
		if (seat1.length > 1 && seat2.length <= 1 && seat3.length <= 1) {
			seatValue = "1";
		}
		if (seat1.length <= 1 && seat2.length <= 1 && seat3.length <= 1) {
			seatValue = "0";
		}
	},
	onSaveClick: () => {		// vormis andmete salvestamise puhul saadetakse need tabelisse
		fn.setFlightNr();
		fn.setSeats();
		var data = $$("detForm").getValues(),
			grid = $$("grid"),
			fligthId = fn.getNewId();

		grid.add(data);

		fn.onFormRender();
		$$("detForm").clear();
		//$$("excelNupp").enable();
	},
	saveNewFile: () => {			// popupi aknas kirja pandud andmete salvestamine 
		dateAndName = $$('date').getValue();
		eventPlace = $$('eventPlace').getValue();
		link = $$('link').getValue();

		var splitter = link.split('/');
		jsonUrl = 'https://spreadsheets.google.com/feeds/list/' + splitter[5] + '/1/public/basic?alt=json';

		$$('popup').hide();
	},
	callback: (data) => {	// funktsioon, filtreerib välja vajalikud Json objekti võtmed ja väärtused
    	var cells = data.feed.entry; // võtab kogu datast võtme feed alt võtme entry, milles on iga vormiga sisestatud rida
    	console.log(cells);
    	jsonRows = [];		// teen massiivi
	    for (var i = 0; i < cells.length; i++){		// loop, mis vaatab iga sisestatud rea võtmeid ja väärtusi
	        var rowObj = {};						// teen objekti kuhu tulevad kõik rea võtmed ja väärtused
	        rowObj.timestamp = cells[i].title.$t;	// lisan rowObj objektile esimese võtme timestamp, mis saab igalt realt timestampi
	        var rowCols = cells[i].content.$t.split(',');	// lisan muutujale rowCols cells objektilt saadud andmed poolitades need "," märgist
	        for (var j = 0; j < rowCols.length; j++){	// loopin omakorda rowColsi 
	            var keyVal = rowCols[j].split(':'),		// lõikan stringi pooleks ":" märgi juures
	            	keyValteine = keyVal[2]?':'+keyVal[2]:""; // kui peale ":" märki on veel andmeid lisan selle keyValteine muutujasse

	            rowObj[keyVal[0].trim()] = keyVal[1].concat(keyValteine).trim(); 	// puhastan tühikutest ja ühendan keyVal keyValteisega
	        }												// lisan rowObj[keyVal] kohal 0 võtmeks ja talle väärtuse keyVal kohal 1 
	        jsonRows.push(rowObj);	//lükkan objekti massiivi
    	}
    	console.log(jsonRows);
    	if (kontroll) {				// kui kontroll on tõene ehk esimest korda alles laetakse andmed
			for (var i = 0; i < jsonRows.length; i++) {		// teen loopi, et läbida kõik objektid jsonRows massiivis
    			jsonTimestamp.push(jsonRows[i].timestamp);	// teen kontrollmassiivi, kuhu lähevad kõik objektide timestamp andmed
    			fn.setJsonSeats(jsonRows[i].reisija, jsonRows[i].reisija_2, jsonRows[i].reisija_3); //kontrollin mitu reisijat on
    			fn.sendDataToGrid(i);			// saadan andmed funktsiooni, mis kirjutab need andmetabelisse
    			flightNr += 1;					// muudan järjekorra numbrit +1 võrra
	    	}
	    	kontroll = false; // muudan kahendmuutuja negatiivseks, et järgmise andmelaadimise korral toimiks teine funktsioon
    	}
    	else { 			// kui kontroll on negatiivne 
	    	for (var j = 0; j < jsonRows.length; j++) {		// loopin läbi uuesti jsonRows objekti
	   			var leitud = false			// teen kahendmuutuja ja annan negatiivse väärtuse
	   			for (var x = 0; x < jsonTimestamp.length; x++) {	// loopin läbi jsonTimestamp massiivi
	   				if (jsonRows[j].timestamp === jsonTimestamp[x]){	// kui leian et seal on sarnane timestamp ehk ajatempel
	   					console.log("sarnasus leitud");				// lõpetan loopimise ja muudan leitud kahendmuutuja positiivseks
    					leitud = true;
    					break;
	    			}
	   			}
	   			if(!leitud) {			// kui leitud jääb negatiivseks ehk on leitud uue timestampiga andmerida
	   				jsonTimestamp.push(jsonRows[j].timestamp);		//toimub sama protsess mis esimest korda andmelaadimisel
	   				fn.setJsonSeats(jsonRows[j].reisija, jsonRows[j].reisija_2, jsonRows[j].reisija_3);
    				fn.sendDataToGrid(j);				// andmed saadetakse andmetabelisse
    				flightNr += 1;	
	   			}
	   		}
    	}

	},
	getData: () => { // andmete tõmbamine Google Drivest
		$.ajax({	// Jquery funktsioon tõmmata andmeid ajaxi kaudu
        	url: jsonUrl,		// aadress, kus kohast andmed saab JSON kujul
        	success: (data) => {		//päringu õnnestumise puhul võetakse kõik andmed 
            	fn.callback(data);		// ja saadetakse argumendina callback funktsiooni
        	}
    	});

    	//$$("excelNupp").enable();

	},
	sendDataToGrid: (number) => {		// drivest alla laetud andmete saatmine tabelisse
		$$("grid").add({flight_nr: flightNr.toString(),
						passenger1: jsonRows[number].reisija,
					    passenger2: jsonRows[number].reisija_2,
					    passenger3: jsonRows[number].reisija_3,
					    check_in: jsonRows[number].checkin,
					    duration: jsonRows[number].lennupikkus,
					    price: jsonRows[number].hind,
						seats: seatValue});

	},
	printFile: () => {
		execSync('print CHANGE_TO_FILEPATH');
		// command prompt käsklus faili printimiseks
	}



};
