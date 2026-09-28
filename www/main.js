"use strict";

var map;
var geoLayerLegend;

class FossilSite {
	constructor(description, state, latitude, longitude, website, notes) {
		this.description = description;
		this.state = state;
		this.latitude = latitude;
		this.longitude = longitude;
		this.website = website;
		this.notes = notes;
	}
}

function getMarker(textDisplay, state, latitude, longitude, website, notes, displayIcon) {
	var content = "<h2>" + textDisplay + "</h2>";

	content += "<p>" + state + "<p>";

	content += "<hr>";

	if (!website == '') {
		content += "<p><a target='_blank' href='" + website + "'>Website</a></p>";
	}

	content += "<p><a target='_blank' rel='noopener noreferrer' href='https://maps.google.com/maps?ll=" + latitude + "," + longitude + "&q=" + latitude + "," + longitude + "&hl=en&t=m&z=12'>Google Maps</a></p>";

	if (!notes == '') {
		content +=
			"<hr>" +
			"<p>" + notes + "</p>";
	}

	var newMarker = L.marker([latitude, longitude], { icon: displayIcon, alt: textDisplay });
	newMarker.bindPopup(content);
	newMarker.bindTooltip(textDisplay);

	return newMarker;
}

function populateFossilSites() {
	let fossilSites = [];

	fossilSites.push(
		new FossilSite("Indian Gardens Paleo Site", "Arizona", 34.321974, -111.110955, "", "Marine fossils."),
		new FossilSite("Sharktooth Hill", "California", 35.441876, -118.905526, "https://www.fossilguy.com/sites/sharktooth-hill/index.htm", "Miocene-age shark teeth."),
		new FossilSite("Florissant Fossil Quarry", "Colorado", 38.944147, -105.28842, "https://www.florissantfossilquarry.com/", "Insects and plants in shale."),
		new FossilSite("Peace River", "Florida", 27.220116, -81.876817, "", "Miocene to Pliocene shark teeth, mammal bones.  Note that the map only shows a common starting point: there are many miles of sites along the river."),
		new FossilSite("Mazon Creek", "Illinois", 41.188835, -88.230053, "https://nautiloid.net/fossils/sites/mazon/mazon.html", "Soft-bodied fauna, including jellyfish.  Permit is required.  Surface collecting only."),
		new FossilSite("Bon Well Hill - roadcut", "Indiana", 39.43693, -84.993, "", "Ordovician marine fossils, including brachiopods, bryozoa, and trilobites."),
		new FossilSite("Brookville North - roadcuts", "Indiana", 39.4875, -84.94861, "", "Ordovician marine fossils, including brachiopods, bryozoa, and trilobites."),
		new FossilSite("Garr Hill - roadcut", "Indiana", 39.480417, -84.948358, "", "Ordovician marine fossils, including brachiopods, bryozoa, and trilobites."),
		new FossilSite("Richmond - roadcuts", "Indiana", 39.78722, -84.90166, "", ""),
		new FossilSite("South Gate Hill - roadcuts", "Indiana", 39.339, -84.95286, "", ""),
		new FossilSite("Tell City - roadcut", "Indiana", 37.957847, -86.724334, "", "Blastoid echinoderms."),
		new FossilSite("Ashlock Cemetery - roadcut", "Kentucky", 37.57361, -84.61361, "", ""),
		new FossilSite("Bedford - roadcuts", "Kentucky", 38.60222, -85.27361, "", ""),
		new FossilSite("Bighill exposure", "Kentucky", 37.529363, -84.212426, "", "Small phosphate nodules, fish teeth, scales, small fragmented bones, and conodonts.  Phosphatized invertebrate remains, including, gastropods, brachiopods, and crinoid debris are also present."),
		new FossilSite("Bybee - roadcuts", "Kentucky", 37.72322, -84.10935, "", ""),
		new FossilSite("Clays Ferry - roadcuts", "Kentucky", 37.88102, -84.33972, "", ""),
		new FossilSite("Flemingsburg - roadcuts", "Kentucky", 38.40374, -83.72613, "", ""),
		new FossilSite("Fredericktown - roadcut", "Kentucky", 37.76917, -85.35694, "", ""),
		new FossilSite("Lincoln County Line - roadcuts", "Kentucky", 37.57778, -84.61, "", ""),
		new FossilSite("Maysville - roadcut", "Kentucky", 38.679081, -83.794398, "", ""),
		new FossilSite("Orphanage Road - roadcut", "Kentucky", 39.02972, -84.54166, "", ""),
		new FossilSite("Riedlin Road - roadcuts", "Kentucky", 39.02778, -84.51056, "", ""),
		new FossilSite("Calvert Cliffs", "Maryland", 38.402222, -76.407975, "http://www.mgs.md.gov/geology/fossils/fossil_collecting.html", "Miocene-age formations.  Some areas are restricted, and some have fees.  Beach collecting only: digging into the cliffs is not permitted."),
		new FossilSite("Lafarge Fossil Park", "Michigan", 45.081325, -83.448752, "https://www.bessermuseum.org/fossil-park", "Devonian-age limestone."),
		new FossilSite("Big Brook", "New Jersey", 40.326349, -74.224072, "https://www.monmouthcountyparks.com/page.aspx?Id=2549", "Cretaceous-age fossils including teeth from sharks, Mosasaur, and Enchodus."),
		new FossilSite("Penn Dixie Fossil Park", "New York", 42.776627, -78.83098, "https://penndixie.org/", "Trilobites, prehistoric crabs, sea lilies, starfish, mollusks, coral, and snails."),
		new FossilSite("Blue Rock Road - roadcuts", "Ohio", 39.22972, -84.62112, "", ""),
		new FossilSite("Caesar Creek - spillway", "Ohio", 39.479961, -84.057065, "https://ohiodnr.gov/wps/portal/gov/odnr/go-and-do/plan-a-visit/find-a-property/caesar-creek-state-park-campground", "Ordovician marine fossils, including brachiopods, bryozoa, and trilobites."),
		new FossilSite("Cowan Lake State Park", "Ohio", 39.385994, -83.902651, "https://ohiodnr.gov/wps/portal/gov/odnr/go-and-do/plan-a-visit/find-a-property/cowan-lake-state-park", ""),
		new FossilSite("East Fork State Park", "Ohio", 39.02589, -84.134252, "https://ohiodnr.gov/wps/portal/gov/odnr/go-and-do/plan-a-visit/find-a-property/east-fork-state-park", ""),
		new FossilSite("Georgetown - roadcuts", "Ohio", 38.87222, -83.91667, "", ""),
		new FossilSite("Germantown Reservoir - spillway", "Ohio", 39.6377, -84.400598, "https://www.metroparks.org/places-to-go/germantown/", "Ordovician marine fossils, including brachiopods, bryozoa, and trilobites."),
		new FossilSite("Hueston Woods - covered bridge", "Ohio", 39.592453, -84.770273, "https://ohiodnr.gov/wps/portal/gov/odnr/go-and-do/plan-a-visit/find-a-property/hueston-woods-state-park", "Ordovician marine fossils, including brachiopods, bryozoa, and trilobites."),
		new FossilSite("Hueston Woods - spillway", "Ohio", 39.556294, -84.733815, "https://ohiodnr.gov/wps/portal/gov/odnr/go-and-do/plan-a-visit/find-a-property/hueston-woods-state-park", "Ordovician marine fossils, including brachiopods, bryozoa, and trilobites."),
		new FossilSite("Miamisburg - railroad cut", "Ohio", 39.631822, -84.29078, "", "Ordovician marine fossils, including brachiopods, bryozoa, and trilobites."),
		new FossilSite("Oakes Quarry Park", "Ohio", 39.814103, -83.984217, "http://www.beavercreekwetlands.org/maplocations-oakes.html", "Silurian marine fossils."),
		new FossilSite("Sylvania Fossil Park - Olander Park System", "Ohio", 41.712321, -83.745112, "https://www.olanderpark.com/olanderpark/fossil-park/", ""),
		new FossilSite("Trammel Fossil Park", "Ohio", 39.296417, -84.404785, "https://www.sharonville.org/188/Trammel-Fossil-Park", ""),
		new FossilSite("West Union - roadcut", "Ohio", 38.82722, -83.50555, "", ""),
		new FossilSite("Wright Brothers Memorial - railroad cut", "Ohio", 39.79611, -84.08694, "", ""),
		new FossilSite("Wheeler High School Fossil Beds", "Oregon", 45.002944, -120.214194, "https://www.oregonpaleolandscenter.com/", "Plant fossils from the 33-million-year-old (Oligocene) Bridge Creek Member of the John Day Formation."),
		new FossilSite("Fossil Pit - Montour Preserve", "Pennsylvania", 41.110518, -76.647395, "https://montourpreserve.org/fossil-pit/", "Fossils in Mahantango shale."),
		new FossilSite("Celina - roadcuts", "Tennessee", 36.560661, -85.450787, "", "Crinoid / bryozoan grainstones."),
		new FossilSite("Celina - roadcuts", "Tennessee", 36.507301, -85.462731, "", "Crinoid / bryozoan grainstones."),
		new FossilSite("Ladonia Fossil Park", "Texas", 33.457438, -95.942574, "http://www.cocladonia.org/ladonia-fossil-park.html", "Cretaceous fossils, including mosasaur teeth, ammonites, bivalves and shark teeth. The Pleistocene sediments above have mammoth bones and teeth."),
		new FossilSite("Mineral Wells Fossil Park", "Texas", 32.825748, -98.190511, "https://www.mineralwellsfossilpark.com/", "Crinoids, echinoids, brachiopods, pelecypods, bryozoans, corals, trilobites, plants and primitive sharks."),
		new FossilSite("U - dig Fossils", "Utah", 39.354909, -113.278575, "https://u-digfossils.com/", "Trilobites, brachiopods, sponges, worm tracks, phyllocarids and other mid-Cambrian fossils."),
		new FossilSite("Westmoreland State Park", "Virginia", 38.167033, -76.854534, "https://www.dcr.virginia.gov/state-parks/westmoreland", "Miocene fossils, including megalodon teeth, alligators, dolphins, whales, fish, and assorted mammals."),
		new FossilSite("Fossil Safari at Warfield Fossil Quarries", "Wyoming", 41.868175, -110.676794, "http://fossilsafari.com/", "Eocene-age fish, including Knightia, Diplomystus, Phareodus, Mioplosus, Amphiplaga, and Priscacara.")
	);

	return fossilSites;
}

function loadFossilLocalities(markerIcon, loadLocal = true) {
	var fossilLocalities = L.layerGroup();

	if (loadLocal) {
		let fossilSites = populateFossilSites();

		for (let fossilSite of fossilSites) {
			var newMarker = getMarker(fossilSite.description, fossilSite.state, fossilSite.latitude, fossilSite.longitude, fossilSite.website, fossilSite.notes, markerIcon);

			newMarker.addTo(fossilLocalities);
		}
	} else {
		$.getJSON("get_sites.php", function (data) {
			for (var i = 0; i < data.length; i++) {
				var newMarker = getMarker(data[i].description, data[i].state, data[i].latitude, data[i].longitude, data[i].website, data[i].notes, markerIcon);

				newMarker.addTo(fossilLocalities);
			}
		});
	}

	return fossilLocalities;
}

function onLocationFound(e) {
	var radius = Math.round(e.accuracy * 3.28084);

	L.marker(e.latlng).addTo(map).bindTooltip("You are within " + radius + " feet from this point");
}

function legendSegment(name, color) {
	return '<i style="background:' + color + '"></i> ' + name + '<br>';
}

function init(loadLocal = true) {
	// Marker icons
	var pickaxeIcon = L.icon({ iconUrl: "images/pickaxe.png", iconSize: [30, 30] });

	var osmLink = "<a href='http://www.openstreetmap.org'>Open StreetMap</a>";

	// Base maps
	var osmBaseMap = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: 'Map data &copy; ' + osmLink, maxZoom: 18, });
	var osmTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
		maxZoom: 17,
		attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
	});
	var esriWorldImageryMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
		attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
	});
	var esriWorldTopoMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
		attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
	});
	var usgsUSTopo = L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}', {
		maxZoom: 20,
		attribution: 'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>'
	});
	var usgsGeologyLayer = L.tileLayer.wms('https://mrdata.usgs.gov/services/kb?', {
		layers: 'KB_Geology', opacity: 0.5
	});
	var usgsFaultsLayer = L.tileLayer.wms('https://mrdata.usgs.gov/services/kb?', {
		layers: 'Faults', opacity: 0.4
	});
	var varNOAARadarLayer = L.tileLayer.wms('https://opengeo.ncep.noaa.gov/geoserver/conus/conus_bref_qcd/ows?', {
		layers: 'conus_bref_qcd', format: "image/png", transparent: true, opacity: 0.6
	});
	var varNOAAWarningsLayer = L.tileLayer.wms('https://opengeo.ncep.noaa.gov/geoserver/wwa/warnings/ows?', {
		layers: 'warnings', format: "image/png", transparent: true
	});

	// Fossil site overlay
	var fossilLocalities = loadFossilLocalities(pickaxeIcon, loadLocal);

	map = L.map('map', {
		center: [40.498285, -96.898910],
		zoom: 5,
		layers: [osmBaseMap, fossilLocalities]
	});

	var baseMaps = { "Standard": osmBaseMap, "Esri World Imagery": esriWorldImageryMap, "Esri World Topo": esriWorldTopoMap, "Open Topo": osmTopoMap, "USGS Topo": usgsUSTopo };

	var overlayMaps = { "Fossil Hunting Localities": fossilLocalities, "USGS - Geology": usgsGeologyLayer, "USGS - Faults": usgsFaultsLayer, "NOAA Radar": varNOAARadarLayer, "Weather Warnings": varNOAAWarningsLayer };

	L.control.layers(baseMaps, overlayMaps).addTo(map);

	L.control.scale().addTo(map);

	geoLayerLegend = L.control({ position: 'bottomright' });
	geoLayerLegend.onAdd = function (map) {
		var div = L.DomUtil.create('div', 'info legend');

		div.innerHTML +=
			legendSegment('Middle Ordovician (470 - 458 mya)', '#eb5cb6') +
			legendSegment('Upper Ordovician (458 - 443 mya)', '#ffa5a5') +
			legendSegment('Silurian (443 - 419 mya)', '#bb00ff') +
			legendSegment('Devonian (419 - 358 mya)', '#aea5fe') +
			legendSegment('Mississipian (358 - 323 mya)', '#a5faff') +
			legendSegment('Missourian', '#a5a5a5') +
			legendSegment('Eocene (56 - 34 mya)', '#ffad01')

		return div;
	};

	map.on('overlayadd', function (eventLayer) {
		if (eventLayer.name == 'USGS - Geology') {
			geoLayerLegend.addTo(this);
		}
	});
	map.on('overlayremove', function (eventLayer) {
		if (eventLayer.name == 'USGS - Geology') {
			this.removeControl(geoLayerLegend);
		}
	});

	map.locate({ setView: true, maxZoom: 7 });

	map.on('locationfound', onLocationFound);
}

