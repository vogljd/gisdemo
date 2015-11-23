(function () {
	var app = angular.module("map.core");

		app.constant("modals", [
			{id: "Help", title: "Help: Tips & Tricks", file: "help.htm"}, 
			{id: "About", title: "About This App", file: "about.htm"}, 
			{id: "Contact", title: "Contact Larimer County GIS Department", file: "contact.htm"}, 
			{id: "Disclaimer", title: "Disclaimer", file: "disclaimer.htm"}, 
			{id: "Settings", title: "My Settings", file: "settings.htm"}, 
			{id: "Print", title: "Print", file: "print.htm"}, 
			{id: "Share", title: "Email This Link to a Friend", file: "share-email.htm"}
		]); 
		app.constant("panels", [
			{name: "legend", glyph: "glyphicon glyphicon-list-alt"},
			{name: "layer", glyph: "glyphicon glyphicon-align-center"},
			{name: "basemap", glyph: "glyphicon glyphicon-map-marker"},
			{name: "select", glyph: "glyphicon glyphicon-hand-up"},
			{name: "markup", glyph: "glyphicon glyphicon glyphicon-pencil"},
			{name: "measure", glyph: "glyphicon glyphicon-resize-full"},
			{name: "bookmark", glyph: "glyphicon glyphicon-star"}
		]); 
		
		app.constant("gisApps", [
			{id: "lil", glyph: "glyphicon glyphicon-pushpin", name: "Land Information Locator (LIL)", description: "<p>Land Information Locactor enables you to locate property info in Larimer County by:</p><ul><li>Searching tax parcels, details and sales on a map;<li>Searching by various themes & search categories; and<li>Selecting areas on the map with drawing tools.</li></ul><p>You can also:</p><ul><li>Create owner notification mailing lists based on location and distance.</li> <li>Export maps to PDF, export reports as PDF or Excel files.</li><li>View aerial photography dating back to 1999, etc.</li></ul>"},
			{id: "lex", glyph: "glyphicon glyphicon-tree-conifer", name: "Landscape Explorer (LEX)", description: "LEX App description"},
			{id: "ril", glyph: "glyphicon glyphicon-road", name: "Road Info Locator (RIL)", description: "RIL App description"},
			{id: "fil", glyph: "glyphicon glyphicon-tint", name: "Flood Info Locator (FIL)", description: "FIL App description"},
			{id: "mil", glyph: "fa fa-car", name: "MotorV Emissions Info Locator (MIL)", description: "MIL App description"},
			{id: "vil", glyph: "glyphicon glyphicon-check", name: "Voter Info Locator (VIL)", description: "VIL App description"},
			{id: "wsil", glyph: "glyphicon glyphicon-warning-sign", name: "Wind & Snowload Info Locator (WSIL)", description: "WSIL App description"}		  
		]); 

		app.constant("layerDefs", [
			{name: "Tax Parcel", type: "Feature", url: "http://maps.larimer.org/arcgis/rest/services/maps/parcelOwnerSelectService/MapServer/0"},								
	//		{name: "Aerial", type: "Tile", url: $scope.YearFeature[$scope.YearFeature.length-1].url},
			{name: "Parcel Detail", type: "Tile", url: "http://maps.larimer.org/arcgis/rest/services/mapsCached/ParcelDetailCached/MapServer/18"},
			{name: "Parcel Sales", type: "Tile", url: "http://maps.larimer.org/arcgis/rest/services/mapsCached/ParcelSalesCached/MapServer/18"},
			{name: "Flood Plane", type: "Feature", url: "http://maps.larimer.org/arcgis/rest/services/maps/EFM/MapServer"},
			{name: "Voter", type: "Feature", url: "http://maps.larimer.org/arcgis/rest/services/maps/voterMap/MapServer"},
			{name: "ROLO", type: "Feature", url: "http://maps.larimer.org/arcgis/rest/services/maps/findFeaturesRIL/MapServer"},
			{name: "PacelOwner", type: "Feature", url: "http://maps.larimer.org/arcgis/rest/services/maps/parcelOwnerSelectService/MapServer"},
			{name: "Popup Feature Layer", type: "Feature", url:" http://agomaps.larimer.org/arcgis/rest/services/maps/ParcelAGOL/MapServer/11"},
			{name: "County Boundary", type: "Feature", url: "http://agomaps.larimer.org/arcgis/rest/services/maps/ParcelAGOL/MapServer/0"},
			{name: "PLSS Township and Range", type: "Feature", url:" http://agomaps.larimer.org/arcgis/rest/services/maps/ParcelAGOL/MapServer/1"},
			{name: "PLSS Sections", type: "Feature", url:" http://agomaps.larimer.org/arcgis/rest/services/maps/ParcelAGOL/MapServer/2"},
			{name: "PLSS Quarter Sections", type: "Feature", url:" http://agomaps.larimer.org/arcgis/rest/services/maps/ParcelAGOL/MapServer/3"},
			{name: "Major Subdivision Boundaries", type: "Feature", url: "http://agomaps.larimer.org/arcgis/rest/services/maps/ParcelAGOL/MapServer/4"},
			{name: "Subdivisions", type: "Feature", url: "http://agomaps.larimer.org/arcgis/rest/services/maps/ParcelAGOL/MapServer/5"},
			{name: "Platted Blocks", type: "Feature", url: "http://agomaps.larimer.org/arcgis/rest/services/maps/ParcelAGOL/MapServer/6"},
			{name: "Tax Parcels", type: "Feature", url: "http://agomaps.larimer.org/arcgis/rest/services/maps/ParcelAGOL/MapServer/7"},
			{name: "2009 to Current", type: "Feature", url: "http://agomaps.larimer.org/arcgis/rest/services/maps/ParcelAGOL/MapServer/8"},
			{name: "Platted Lots", type: "Feature", url: "http://agomaps.larimer.org/arcgis/rest/services/maps/ParcelAGOL/MapServer/9"},
			{name: "Incorporated Areas", type: "Feature", url:"http://agomaps.larimer.org/arcgis/rest/services/maps/ParcelAGOL/MapServer/10"}
	//		{name: "", type: "Feature", url: ""},
		]); 		
		
		app.constant("YrFeature", [
			{year: "1999", url: "http://maps.larimer.org/ArcGIS/rest/services/mapsCached/imagery1999only/MapServer"}, 
			{year: "2002", url: "http://maps.larimer.org/ArcGIS/rest/services/mapsCached/imagery2002only/MapServer"}, 
			{year: "2005", url: "http://maps.larimer.org/ArcGIS/rest/services/mapsCached/imagery2005only/MapServer"}, 
			{year: "2006", url: "http://maps.larimer.org/ArcGIS/rest/services/mapsCached/imagery2006only/MapServer"}, 
			{year: "2007", url: "http://maps.larimer.org/ArcGIS/rest/services/mapsCached/imagery2007only/MapServer"}, 
			{year: "2008", url: "http://maps.larimer.org/ArcGIS/rest/services/mapsCached/imagery2008only/MapServer"}, 
			{year: "2009", url: "http://maps.larimer.org/ArcGIS/rest/services/mapsCached/imagery2009only/MapServer"}, 
			{year: "2010", url: "http://maps.larimer.org/ArcGIS/rest/services/mapsCached/imagery2010only/MapServer"}, 
			{year: "2011", url: "http://maps.larimer.org/ArcGIS/rest/services/mapsCached/imagery2011only/MapServer"}, 
			{year: "2012", url: "http://maps.larimer.org/arcgis/rest/services/mapsCached/imagery2012_fullCounty/MapServer"}, 
			{year: "2014", url: "http://maps.larimer.org/arcgis/rest/services/mapsCached/imagery2014only/MapServer"}
		]); 

		app.constant("drawingShapes",
			["Point", "Multi Point", "Line", "Polyline", "Freehand Polyline", "Triangle", "Rectangle", "Circle", "Ellipse", "Polygon", "Freehand Polygon"]
		); 

	}
());	