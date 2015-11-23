(function () {

	angular
	.module("map.core")
	.factory("mapservice", mapservice);

	function mapservice() {
		// scope vars
		var map;
		var navToolbar;
		var drawToolbar;
//		var $cookies;

		var service = {
// LAYERS			
			addGraphicLayer : addGraphicLayer,
			addFeatureLayer : addFeatureLayer,
			addDynamicLayer : addDynamicLayer,
			changeDynamicLayer : changeDynamicLayer,
			removeDynamicLayer : removeDynamicLayer,
			addTiledLayer : addTiledLayer,
			changeTile : changeTile,
			layerOpacityChange : layerOpacityChange,
			layerOpacitySlider : layerOpacitySlider,
			layerOpacityArray : layerOpacityArray,
			updateLayerVisibility : updateLayerVisibility,
// WIDGETS
			initDraw : initDraw,
			initDraw2 : initDraw2,
			addGraphicPoint : addGraphicPoint,
			deactivateDraw : deactivateDraw,
			clearGraphics : clearGraphics,
			selectFeature : selectFeature,
			initMeasurement : initMeasurement,
			initBasemapGallery : initBasemapGallery,
			hoverDialog : hoverDialog,
			initLegend : initLegend,
			initPrint : initPrint,
			initBookmark: initBookmark,

// NAVIGATION
			initMapLocation : initMapLocation,
			initMapHome : initMapHome,
			initScalebar : initScalebar,
			initOverviewMap : initOverviewMap,
			initNavTools : initNavTools,
			initMapSearch : initMapSearch,
			navToolbarToggle : navToolbarToggle,
			panMap : panMap,
			initLayerList : initLayerList, // not used
// UTLITIES
			createMap : createMap,
			refreshMapData : refreshMapData,
			configureMapAnimation : configureMapAnimation,
			initCookies : initCookies,
			setCoordinatesToCurrent : setCoordinatesToCurrent,
			on : on
		};

		return service;

		activate();

		function activate() {
			$scope.$on("$destroy", destroy);
		}

		function createMap(mapDOM, mapModel, onLoad) {
			require(["esri/map",
					"dojo/domReady!"
				],
				function (Map) {
				map = new Map(mapDOM, {
						basemap : mapModel.basemap,
						center : mapModel.center,
						zoom : mapModel.zoom,
						logo : mapModel.logo,
						isKeyboardNavigation : mapModel.isKeyboardNavigation,
						//						isPanArrows : true,
						showAttribution : mapModel.showAttribution,
						sliderPosition : mapModel.sliderPosition,
						sliderStyle : mapModel.sliderStyle
					})
					on("load", onLoad);
			});
		}

		function on(event, callBack) {
			map.on(event, callBack);
		}

		function addGraphicPoint(mapPoint) {
			require(["esri/geometry/Point",
					"esri/Color",
					"esri/symbols/SimpleFillSymbol",
					"esri/symbols/SimpleLineSymbol",
					"esri/symbols/SimpleMarkerSymbol",
					"esri/graphic"],
				function (Point, Color, SimpleFillSymbol, SimpleLineSymbol, SimpleMarkerSymbol, Graphic) {

				map.graphics.clear();

				var lineSymbol = new SimpleLineSymbol(
						SimpleLineSymbol.STYLE_SOLID,
						new Color([88, 116, 152]), 2);

				var pointSymbol = new SimpleMarkerSymbol(
						SimpleMarkerSymbol.STYLE_CIRCLE,
						10,
						lineSymbol,
						new Color([88, 116, 152, 0.45]));

				var point = new Point(mapPoint)

					var graphic = new Graphic(point, pointSymbol);

				map.graphics.add(graphic);
			});
		}

		function addGraphicLayer(id) {
			require(["esri/layers/GraphicsLayer"],
				function (GraphicsLayer) {
				var newLayer = new GraphicsLayer({
						id : id
					});
				map.addLayer(newLayer);
			});
		}

		function addDynamicLayer(layerURL, id) {
			require(["esri/layers/ArcGISDynamicMapServiceLayer",
					"dojo/domReady!"
				],
				function (ArcGISDynamicMapServiceLayer) {

				var newLayer = new ArcGISDynamicMapServiceLayer(layerURL, {
						id : id
					});

				map.addLayer(newLayer);

			});
		}

		function addDynamicLayer(layerURL, id, visibleLayers, opacity) {
			require(["esri/layers/ArcGISDynamicMapServiceLayer",
					"dojo/domReady!"
				],
				function (ArcGISDynamicMapServiceLayer) {
				opacity = typeof opacity !== 'undefined' ? opacity : "0.5";
				var newLayer = new ArcGISDynamicMapServiceLayer(layerURL, {
						id : id,
						"opacity" : opacity
					});
				map.addLayer(newLayer);
			});
		};

		function addTiledLayer(layerURL, id, visibleLayers, opacity) {
			require(["esri/layers/ArcGISTiledMapServiceLayer",
					"dojo/domReady!"
				],
				function (ArcGISTiledMapServiceLayer) {
				opacity = typeof opacity !== 'undefined' ? opacity : "1";
				var newLayer = new ArcGISTiledMapServiceLayer(layerURL, {
						id : id,
						"opacity" : opacity
					});
				map.addLayer(newLayer);
			});
		};

		function changeDynamicLayer(url, id, visibleLayers, opacity) {
			require(["esri/layers/ArcGISDynamicMapServiceLayer", "dojo/on",
					"dojo/domReady!"
				],
				function (ArcGISDynamicMapServiceLayer) {
				//					var maplayers=map.getLayersVisibleAtScale(map.getScale());
				//					if (maplayers.indexOf(id) > -1) {
				var toRemove = map.getLayer(id);
				map.removeLayer(toRemove);
				//					}
				opacity = typeof opacity !== 'undefined' ? opacity : "1";
				var newLayer = new ArcGISDynamicMapServiceLayer(url, {
						id : id,
						"opacity" : opacity
					});
				map.addLayer(newLayer);
			});
		};

		function removeDynamicLayer(id) {
			require(["esri/layers/ArcGISDynamicMapServiceLayer",
					"dojo/domReady!"
				],
				function (ArcGISDynamicMapServiceLayer) {
				var toRemove = map.getLayer(id);
				map.removeLayer(toRemove);
			});
		};

		function changeTile(url, id) {
			require(["esri/layers/ArcGISTiledMapServiceLayer",
					"dojo/domReady!"
				],
				function (ArcGISTiledMapServiceLayer) {
				map.removeLayer(id);
				ArcGISTiledMapServiceLayer(url, id);
			});
		};

		function updateLayerVisibility($event, id) {
			require(["esri/map",
					"esri/layers/ArcGISDynamicMapServiceLayer",
					"esri/layers/ImageParameters",
					"dojo/domReady!"
				],
				function updateLayerVisibility(ArcGISTiledMapServiceLayer) {
				alert($event);
				// var checkbox = $event.target;
				// var action = (checkbox.checked ? 1 : 0);
				// var toChange = map.getLayer(id);
				// toChange.setVisibility(action);
			});
		};

		/*
		function getVisibleLayers () {
		require(["esri/layers/ArcGISTiledMapServiceLayer",
		"dojo/domReady!"
		],
		function getVisibleLayers() {
		// get layer name nodes, build an array corresponding to new layer order
		var layerOrder = [];
		// find the layer IDs for visible layer
		var ids = arrayUtils.filter(layerOrder, function (l) {
		return infos[l].visible;
		});
		// get the dynamicLayerInfos for visible layers
		var visible = arrayUtils.map(ids, function (id) {
		return dynamicLayerInfos[id];
		});
		return visible;
		}
		}
		 */

		function addFeatureLayer(layerURL, id, visibleLayers, opacity) {
			require(["esri/layers/FeatureLayer",
					//"esri/InfoTemplate",
					"esri/layers/LabelLayer",
					"esri/dijit/Popup", "esri/dijit/PopupTemplate",
					"dojo/dom-class", "dojo/dom-construct", "dojo/on",
					"dojo/domReady!"
				],
				function (FeatureLayer, LabelLayer, Popup, PopupTemplate, domClass, domConstruct, on) {

				var popup = new Popup({
						//					fillSymbol: fill,
						titleInBody : false
					}, domConstruct.create("div"));

				var template = new PopupTemplate({
						title : "Boston Marathon 2013",
						description : ""
						//,
						/*           fieldInfos: [{ //define field infos so we can specify an alias
						fieldName: "Number_Ent",
						label: "Entrants"
						},{
						fieldName: "Number_Sta",
						label: "Starters"
						},{
						fieldName: "Number_Fin",
						label: "Finishers"
						}],
						mediaInfos:[{ //define the bar chart
						caption: "",
						type:"barchart",
						value:{
						theme: "Dollar",
						fields:["Number_Ent","Number_Sta","Number_Fin"]
						}
						}]
						 */
					});

				/* 				var labelField = "STATE_NAME";

				// create a renderer for the states layer to override default symbology
				var labelColor = new Color("#666");
				var labelLine = new SimpleLineSymbol("solid", statesColor, 1.5);
				var labelSymbol = new SimpleFillSymbol("solid", statesLine, null);
				var labelRenderer = new SimpleRenderer(statesSymbol);
				var labels = new LabelLayer({ id: "labels" }); */

				opacity = typeof opacity !== 'undefined' ? opacity : "0.5";
				var newLayer = new FeatureLayer(layerURL, {
						id : id,
						mode : FeatureLayer.MODE_ONDEMAND, // SNAPSHOT
						outFields : ["*"],
						popup : popup,
						//						infoWindow : template,
						"opacity" : opacity
					});
				// labels.addFeatureLayer(states, statesLabelRenderer, "{" + labelField + "}");
				// map.addLayer(labels);
				map.addLayer(newLayer);

			});

		};

		function layerOpacitySlider(domID, layerID) {
			require(["esri/dijit/OpacitySlider",
					"dojo/domReady!"
				],
				function (OpacitySlider) {

				var toChange = map.getLayer(layerID);
				var opacitySlider = new OpacitySlider({
						handles : [0],
						opacityInfo : {
							stops : [{
									opacity : "1",
									value : 100
								}
							]
						}
					}, domID);
				opacitySlider.startup();
				opacitySlider.on("handle-value-change", function (sliderValueChange) {
					//console.log("handle-value-change", sliderValueChange);
					toChange.setOpacity(sliderValueChange.stops[0].value / 100);
					//					toChange.redraw();
				});

			});

		};

		function layerOpacityChange(id, pct) {
			require(["dojo/domReady!"
				],
				function () {
				var toChange = map.getLayer(id);
				toChange.setOpacity(pct/100);
				toChange.setVisibility(true);
				//				toChange.redraw();
			});
		};

		function layerOpacityArray() {
			require(["esri/layers/layer",
					"dojo/domReady!"
				],
				function (Layer) {
				var layerOpacity = [];
				var layerIds = map.getLayersVisibleAtScale(map.getScale());
				var layerId;
				angular.forEach(layerIds, function (value, key) {
					layerId = map.getLayer(value.id);
					if (value.id != 'layer0' && value.id != 'Aerial') {
						layerOpacity.push(layerId.opacity);
					}
				});
				console.log(layerOpacity);
				return layerOpacity;
			});
		};

		function initMapSearch(searchDOM) {
			require(["esri/dijit/Search",
					"dojo/domReady!"
				],
				function (Search) {
				var s = new Search({
						map : map
					}, searchDOM);
				s.startup();
			});
		}

		function initMapHome(homeDOM) {
			require(["esri/dijit/HomeButton",
					"dojo/domReady!"
				],
				function (HomeButton) {

				var home = new HomeButton({
						map : map,
					}, homeDOM);
				home.startup();
			});
		}

		function initScalebar() {
			require(["esri/dijit/Scalebar",
					"dojo/domReady!"
				],
				function (Scalebar) {
				var scalebar = new Scalebar({
						map : map,
						// "dual" displays both miles and kilmometers, or "english" is the default, which displays miles
						attachTo : "bottom-left",
						scalebarUnit : "dual"
					});
			});
		};

		function initOverviewMap() {
			require(["esri/dijit/OverviewMap",
					"dojo/domReady!"
				],
				function (overviewMap) {
				var overviewMap = new overviewMap({
						map : map,
						attachTo : "bottom-left",
						visible : true,
						height : 100,
						width : 150
					});
				overviewMap.startup();
			});
		};

		function initNavTools() {
			require([
					"esri/toolbars/navigation",
					"dojo/on",
					// "dojo/parser",
					// "dijit/registry",
					"dijit/Toolbar",
					"dijit/form/Button",
					"dojo/domReady!"
				],
				function (Navigation, on
					//				, parser, registry
				) {

				//          parser.parse();
				navToolbar = new Navigation(map);
				on(navToolbar, "onExtentHistoryChange", extentHistoryChangeHandler);

				$("#zoomin").on("click", function () {
					navToolbar.activate(Navigation.ZOOM_IN);
					dojo.style(dojo.byId('zoomin'), "display", "none");
					dojo.style(dojo.byId('deactivate'), "display", "block");
				});

				// registry.byId("zoomout").on("click", function () {
				// navToolbar.activate(Navigation.ZOOM_OUT);
				// });

				// registry.byId("zoomfullext").on("click", function () {
				// navToolbar.zoomToFullExtent();
				// });

				$("#zoomprev").on("click", function () {
					navToolbar.zoomToPrevExtent();
				});

				$("#zoomnext").on("click", function () {
					navToolbar.zoomToNextExtent();
				});

				// registry.byId("pan").on("click", function () {
				// navToolbar.activate(Navigation.PAN);
				// });

				$("#deactivate").on("click", function () {
					navToolbar.deactivate();
					dojo.style(dojo.byId('zoomin'), "display", "block");
					dojo.style(dojo.byId('deactivate'), "display", "none");
				});

				function extentHistoryChangeHandler() {
					$("#zoomprev").disabled = navToolbar.isFirstExtent();
					$("#zoomnext").disabled = navToolbar.isLastExtent();
				}
			});
		};

		function navToolbarToggle(binary) {
			require([
					"esri/toolbars/navigation",
					"dijit/Toolbar",
					"dojo/domReady!"
				],
				function (Navigation, Toolbar) {
				if (binary == 0) {
					navToolbar.deactivate();
					dojo.style(dojo.byId('zoomin'), "display", "block");
					dojo.style(dojo.byId('deactivate'), "display", "none");
				} else {
					navToolbar.activate(Navigation.ZOOM_IN);
					dojo.style(dojo.byId('zoomin'), "display", "none");
					dojo.style(dojo.byId('deactivate'), "display", "block");
				}
			});
		};

		function panMap(direction) {
			require(["dojo/domReady!"
				],
				function () {
				if (direction == 'up') {
					map.panUp();
				} else if (direction == 'down') {
					map.panDown();
				} else if (direction == 'left') {
					map.panLeft();
				} else if (direction == 'right') {
					map.panRight();
				}
			});
		};

		function initMapLocation(locationDOM) {
			require(["esri/dijit/LocateButton",
					"dojo/domReady!"
				],
				function (LocateButton) {

				var geoLocate = new LocateButton({
						map : map,
						highlightLocation : true
					}, locationDOM);

				geoLocate.startup();
			});

		}

		function initLegend(LegendDOM) {
			// https://developers.arcgis.com/javascript/jssamples/widget_legend.html
			require(["esri/dijit/Legend",
					"dojo/domReady!"
				],
				function (Legend) {
				//				var layerid = map.getLayer(id);
				var legendDijit = new Legend({
						//						layerInfos: [layerid],
						map : map
					}, LegendDOM);
				legendDijit.startup();
			})
		};

		function initLayerList(LayerListDOM) {
			require(["esri/arcgis/utils",
					"esri/dijit/LayerList",
					// "dijit/layout/BorderContainer",
					// "dijit/layout/ContentPane",
					"dojo/domReady!"
				],

				function (arcgisUtils, LayerList) {
				var LayerList = new LayerList({
						map : map,
						layers : arcgisUtils.getLayerList(map)
					}, LayerListDOM);
				LayerList.startup();
			});
		};

		function initMeasurement(MeasurementDOM) {
			require(["esri/dijit/Measurement",
					"dojo/domReady!"
				],
				function (Measurement) {
				//							  parser.parse();
				var measurement = new Measurement({
						map : map
						//						id: "measure_panel",
					}, MeasurementDOM);
				measurement.startup();
			});
		};

		function clearGraphics() {
			require(["esri/graphic",
					"dojo/domReady!"],
				function (Graphic) {
				map.graphics.clear();
			});
		};

		function initDraw2() {
			require([
					"esri/toolbars/draw",
					"esri/graphic",

					"esri/symbols/SimpleMarkerSymbol",
					"esri/symbols/SimpleLineSymbol",
					"esri/symbols/SimpleFillSymbol",
					"dijit/form/Select",
					"dojo/data/ObjectStore",
					"dojo/store/Memory",
					"dojo/parser", "dijit/registry",

					"dijit/layout/BorderContainer", "dijit/layout/ContentPane",
					"dijit/form/Button",
					"dijit/WidgetSet", "dojo/domReady!"
				], function (Draw, Graphic,
					SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, Select, ObjectStore, Memory,
					parser, registry) {
				//			  parser.parse();
				createToolbar();

				var store = new Memory({
						data : [{
								id : "Point",
								label : "Point"
							}, {
								id : "Multi Point",
								label : "Multi Point"
							}, {
								id : "Line",
								label : "Line"
							}, {
								id : "Polyline",
								label : "Polyline"
							}, {
								id : "Freehand Polyline",
								label : "Freehand Polyline"
							}, {
								id : "Triangle",
								label : "Triangle"
							}, {
								id : "Rectangle",
								label : "Rectangle"
							}, {
								id : "Circle",
								label : "Circle"
							}, {
								id : "Ellipse",
								label : "Ellipse"
							}, {
								id : "Polygon",
								label : "Polygon"
							}, {
								id : "Freehand Polygon",
								label : "Freehand Polygon"
							}
						]
					});

				var os = new ObjectStore({
						objectStore : store
					});

				var s = new Select({
						store : os
					}, "sampleSelect");
				s.startup();

				s.on("change", function () {
					activateTool(this.get("value"));
				});

				function activateTool(tool) {
					var thetool = tool.toUpperCase().replace(/ /g, "_");
					drawToolbar.activate(Draw[thetool]);
				}

				function createToolbar(themap) {
					drawToolbar = new Draw(map);
					drawToolbar.on("draw-end", addToMap);
				}

				function addToMap(evt) {
					var symbol;
					switch (evt.geometry.type) {
					case "point":
					case "multipoint":
						symbol = new SimpleMarkerSymbol();
						break;
					case "polyline":
						symbol = new SimpleLineSymbol();
						break;
					default:
						symbol = new SimpleFillSymbol();
						break;
					}
					//				  var drawLayer = new GraphicsLayer();
					var graphic = new Graphic(evt.geometry, symbol);
					//				  drawLayer.add(graphic);
					map.graphics.add(graphic);
					drawToolbar.deactivate();
					//						  map.showZoomSlider();
				}
			})
		};

		function initDraw() {
			require([
					"esri/toolbars/draw",
					"esri/graphic",

					"esri/symbols/SimpleMarkerSymbol",
					"esri/symbols/SimpleLineSymbol",
					"esri/symbols/SimpleFillSymbol",

					"dojo/parser", "dijit/registry",

					"dijit/layout/BorderContainer", "dijit/layout/ContentPane",
					"dijit/form/Button", "dijit/WidgetSet", "dojo/domReady!"
				], function (Draw, Graphic,
					SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol,
					parser, registry) {
				//			  parser.parse();
				createToolbar();
				//			 $(".dijit.form.dijitButton").forEach(function(d) {
				registry.forEach(function (d) {
					// d is a reference to a dijit
					// could be a layout container or a button
					if (d.declaredClass === "dijit.form.Button") {
						d.on("click", activateTool);
					}
				});

				function activateTool() {
					var tool = this.label.toUpperCase().replace(/ /g, "_");
					drawToolbar.activate(Draw[tool]);
					//					map.hideZoomSlider();
				}

				function createToolbar(themap) {
					drawToolbar = new Draw(map);
					drawToolbar.on("draw-end", addToMap);
				}

				function addToMap(evt) {
					var symbol;
					switch (evt.geometry.type) {
					case "point":
					case "multipoint":
						symbol = new SimpleMarkerSymbol();
						break;
					case "polyline":
						symbol = new SimpleLineSymbol();
						break;
					default:
						symbol = new SimpleFillSymbol();
						break;
					}
					//				  var drawLayer = new GraphicsLayer();
					var graphic = new Graphic(evt.geometry, symbol);
					//				  drawLayer.add(graphic);
					map.graphics.add(graphic);
					drawToolbar.deactivate();
					//						  map.showZoomSlider();
				}
			})
		};

		function deactivateDraw() {
			require([
					"esri/toolbars/draw",
					"dojo/domReady!"
				], function (Draw) {
				drawToolbar.deactivate();
			})
		};

		function selectFeature(serviceURL, gridColumns) {
			require([
					"esri/layers/ArcGISDynamicMapServiceLayer",
					"esri/layers/FeatureLayer",
					"esri/toolbars/draw",
					"esri/graphic",
					"esri/tasks/QueryTask",
					"esri/tasks/query",

					"esri/symbols/SimpleFillSymbol",
					"esri/symbols/SimpleLineSymbol",
					"esri/symbols/SimpleMarkerSymbol",

					"dojo/ready",
					"dojo/parser",
					"dojo/on",
					"dojo/dom",

					"dojo/store/Memory",
					"dojo/date/locale",

					"dojo/_base/Color",
					"dojo/_base/declare",
					"dojo/_base/array",

					"dgrid/OnDemandGrid",
					"dgrid/Selection",

					"dijit/layout/BorderContainer",
					"dijit/layout/ContentPane",
					"dijit/form/Button",
					"dojo/domReady!"],
				function (ArcGISDynamicMapServiceLayer, FeatureLayer, Draw, Graphic, QueryTask, Query,
					SimpleFillSymbol, SimpleLineSymbol, SimpleMarkerSymbol,
					ready, parser, on, dom,
					Memory, locale,
					Color, declare, array,
					Grid, Selection,
					BorderContainer, ContentPane, Button) {

				// parser.parse();
				// Initialize the dgrid
				var fields = ["PRECINCT", "SENATEDIST", "HOUSEDIST", "COMMDIST", "CONGRESSDIST"];
				var labels = ["Precinct", "Senate Dist", "House Dist", "Comm Dist", "Congress Dist"];

				// https://geonet.esri.com/thread/105966, https://geonet.esri.com/thread/106854

				/*  				var gridColumns = "{"; // new Array(); // {
				for (var i = 0; i < fields.length; i++) {
				// gridColumns[i].field=fields[i];
				// gridColumns[i].label=labels[i];
				//					gridColumns+='"'+fields[i] + '": { "label": "'+labels[i] + '"}';
				gridColumns+=fields[i] + ' : "'+labels[i] + '"';
				if(i!= fields.length-1) {
				gridColumns+= ', ';
				}
				}
				gridColumns+= '}';
				// gridColumns = JSON.stringify(gridColumns);
				// gridColumns = JSON.parse(gridColumns);
				//				JSON.parse(gridColumns);
				gridColumns={PRECINCT : "PRECINCT",	SENATEDIST: "Senate Dist",	HOUSEDIST: "House Dist", COMMDIST : "Comm Dist", CONGRESSDIST : "Congress Dist"};

				console.log(gridColumns);
				 */
				var gridSelect = new(declare([Grid, Selection]))({
						bufferRows : 1000, // Infinity
						columns : gridColumns
					}, "divGrid");

				/* 						{
				PRECINCT : "Precinct",
				SENATEDIST: "Senate Dist",
				HOUSEDIST: "House Dist",
				COMMDIST : "Comm Dist",
				CONGRESSDIST : "Congress Dist"
				}
				 */

				// fieldArray, labelArray, expression (optional)

				var outFieldsSelect = ["OBJECTID", "PRECINCT", "SENATEDIST", "HOUSEDIST", "COMMDIST", "CONGRESSDIST"]; //PARCELNUM", "LOCADDRESS

				// Construct the Select layer
				var lyrSelect = new FeatureLayer(serviceURL, {
						//						mode: FeatureLayer.MODE_ONDEMAND,
						outFields : outFieldsSelect
					});
				lyrSelect.setDefinitionExpression("OBJECTID >= 1");
				map.addLayers([lyrSelect]);

				// Wire the draw tool initialization function
				//						map.on("load", initDrawTool);
				initDrawTool();

				function initDrawTool() {
					// Implement the Draw toolbar
					var tbDraw = new Draw(map);
					tbDraw.on("draw-end", displayPolygon);
					tbDraw.activate(Draw.POLYGON);
				}

				function displayPolygon(evt) {

					// Get the geometry from the event object
					var geometryInput = evt.geometry;

					// Define symbol for finished polygon
					var tbDrawSymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT, new Color([255, 255, 0]), 2), new Color([255, 255, 0, 0.2]));

					// Clear the map's graphics layer
					map.graphics.clear();

					// Construct and add the polygon graphic
					var graphicPolygon = new Graphic(geometryInput, tbDrawSymbol);
					map.graphics.add(graphicPolygon);

					// Call the next function
					selectSelect(geometryInput);
				}

				function selectSelect(geometryInput) {

					// Define symbol for selected features
					var symbolSelected = new SimpleMarkerSymbol({
							"type" : "esriSMS",
							"style" : "esriSMSCircle",
							"color" : [255, 115, 0, 128],
							"size" : 6,
							"outline" : {
								"color" : [255, 0, 0, 214],
								"width" : 1
							}
						});

					// Set the selection symbol
					lyrSelect.setSelectionSymbol(symbolSelected);

					// Initialize the query
					var querySelect = new Query();
					querySelect.geometry = geometryInput;

					// Wire the layer's selection complete event
					lyrSelect.on("selection-complete", populateGrid);

					// Step: Perform the selection
					// d is undefined
					lyrSelect.selectFeatures(querySelect, FeatureLayer.SELECTION_NEW);

				}

				function populateGrid(results) {
					var gridData;
					$("#divGrid-outer").css('left', 0);
					$("#divGrid-outer").show();
					$(".dataCount").html(" (" + results.features.length + " Records)");

					/* 			dsReturn = {"PRECINCT" : feature.attributes[outFieldsSelect[0]], "SENATEDIST" : feature.attributes[outFieldsSelect[1]], "HOUSEDIST" : feature.attributes[outFieldsSelect[2]],  "COMMDIST" : feature.attributes[outFieldsSelect[3]],  "CONGRESSDIST" : feature.attributes[outFieldsSelect[4]]}; */

					dataSelect = array.map(results.features, function (feature) {
							//							return dsReturn
							return {
								// Reference the attribute field values
								// "PARCELNUM" : feature.attributes[outFieldsSelect[0]]
								// "OBJECTID" : feature.attributes[outFieldsSelect[0]],
								"PRECINCT" : feature.attributes[outFieldsSelect[0]],
								"SENATEDIST" : feature.attributes[outFieldsSelect[1]],
								"HOUSEDIST" : feature.attributes[outFieldsSelect[2]],
								"COMMDIST" : feature.attributes[outFieldsSelect[3]],
								"CONGRESSDIST" : feature.attributes[outFieldsSelect[4]]
							}
						});

					// Pass the data to the grid
					var memStore = new Memory({
							data : dataSelect
						});
					gridSelect.set("store", memStore);
					// gridSelect.on('dgrid-refresh-complete', function(evt) {
					// });
				}

			});
		};

		function initPrint(printDOM) {
			require(["esri/dijit/Print", "esri/tasks/PrintTemplate",
					"esri/request", "esri/config",
					// "dojo/_base/array", "dojo/dom",
					//		"dojo/parser",
					// "dijit/layout/BorderContainer", "dijit/layout/ContentPane",
					"dojo/domReady!"
				],
				function (Print, PrintTemplate, esriRequest, esriConfig
					//				, arrayUtils, dom, parser
				) {
				//				 parser.parse();
				/* 				printUrl = "http://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task";
				//				esriConfig.defaults.io.proxyUrl = "/proxy/";  // causing errors
				// get print templates from the export web map task
				var printInfo = esriRequest({
				"url": printUrl,
				"content": { "f": "json" }
				});
				printInfo.then(handlePrintInfo, handleError);

				function handlePrintInfo(resp) {
				var layoutTemplate, templateNames, mapOnlyIndex, templates;

				layoutTemplate = arrayUtils.filter(resp.parameters, function(param, idx) {
				return param.name === "Layout_Template";
				});

				if ( layoutTemplate.length === 0 ) {
				console.log("print service parameters name for templates must be \"Layout_Template\"");
				return;
				}
				templateNames = layoutTemplate[0].choiceList;

				// remove the MAP_ONLY template then add it to the end of the list of templates
				mapOnlyIndex = arrayUtils.indexOf(templateNames, "MAP_ONLY");
				if ( mapOnlyIndex > -1 ) {
				var mapOnly = templateNames.splice(mapOnlyIndex, mapOnlyIndex + 1)[0];
				templateNames.push(mapOnly);
				}

				// create a print template for each choice
				templates = arrayUtils.map(templateNames, function(ch) {
				var plate = new PrintTemplate();
				plate.layout = plate.label = ch;
				plate.format = "PDF";
				plate.layoutOptions = {
				"authorText": "Made by:  Esri's JS API Team",
				"copyrightText": "<copyright info here>",
				"legendLayers": [],
				"titleText": "Lerimer County GIS App",
				//              "scalebarUnit": "Miles"
				};
				return plate;
				});

				// create the print dijit
				printer = new Print({
				"map": map,
				"templates": templates,
				url: printUrl
				}, printDOM);
				printer.startup();
				}

				function handleError(err) {
				console.log("Something broke: ", err);
				}  */

				var print = new Print({
						map : map,
						url : "http://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"
					}, printDOM);
				print.startup();
				/* */
			});
		};

		//** hoverDialog *//
		function hoverDialog() {
			require([
					"esri/layers/FeatureLayer",
					"esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleLineSymbol",
					"esri/renderers/SimpleRenderer", "esri/graphic", "esri/lang",
					"esri/Color", "dojo/number", "dojo/dom-style",
					"dijit/TooltipDialog", "dijit/popup", "dojo/domReady!"
				], function (
					FeatureLayer,
					SimpleFillSymbol, SimpleLineSymbol,
					SimpleRenderer, Graphic, esriLang,
					Color, number, domStyle,
					TooltipDialog, dijitPopup) {

				var featLayer = new FeatureLayer("http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Demographics/ESRI_Census_USA/MapServer/3", {
						mode : FeatureLayer.MODE_SNAPSHOT,
						outFields : ["NAME", "POP2000", "POP2007", "POP00_SQMI", "POP07_SQMI"]
					});
				featLayer.setDefinitionExpression("STATE_NAME = 'Colorado'");

				var symbol = new SimpleFillSymbol(
						SimpleFillSymbol.STYLE_SOLID,
						new SimpleLineSymbol(
							SimpleLineSymbol.STYLE_SOLID,
							new Color([255, 255, 255, 0.35]),
							1),
						new Color([125, 125, 125, 0.35]));
				featLayer.setRenderer(new SimpleRenderer(symbol));
				map.addLayer(featLayer);
				console.log(featLayer);

				map.infoWindow.resize(245, 125);

				dialog = new TooltipDialog({
						id : "tooltipDialog",
						style : "position: absolute; width: 250px; font: normal normal normal 10pt Helvetica;z-index:100"
					});
				dialog.startup();

				var highlightSymbol = new SimpleFillSymbol(
						SimpleFillSymbol.STYLE_SOLID,
						new SimpleLineSymbol(
							SimpleLineSymbol.STYLE_SOLID,
							new Color([255, 0, 0]), 3),
						new Color([125, 125, 125, 0.35]));

				//close the dialog when the mouse leaves the highlight graphic
				//			map.on("load", function(){
				map.graphics.enableMouseEvents();
				map.graphics.on("mouse-out", closeDialog);

				//			});

				//listen for when the onMouseOver event fires on the countiesGraphicsLayer
				//when fired, create a new graphic with the geometry from the event.graphic and add it to the maps graphics layer
				featLayer.on("mouse-over", function (evt) {
					var t = "<b>${NAME}</b><hr><b>2000 Population: </b>${POP2000:NumberFormat}<br>"
						 + "<b>2000 Population per Sq. Mi.: </b>${POP00_SQMI:NumberFormat}<br>"
						 + "<b>2007 Population: </b>${POP2007:NumberFormat}<br>"
						 + "<b>2007 Population per Sq. Mi.: </b>${POP07_SQMI:NumberFormat}";

					var content = esriLang.substitute(evt.graphic.attributes, t);
					var highlightGraphic = new Graphic(evt.graphic.geometry, highlightSymbol);
					map.graphics.add(highlightGraphic);

					dialog.setContent(content);

					domStyle.set(dialog.domNode, "opacity", 0.85);
					dijitPopup.open({
						popup : dialog,
						x : evt.pageX,
						y : evt.pageY
					});
				});
			});
		};

		function closeDialog() {
			map.graphics.clear();
			dijitPopup.close(dialog);
		}

		
		
		function initBookmark(bookmarkDOM) {		
			require([
				"esri/dijit/Bookmarks", "dojo/domReady!"
					], function (
						Bookmarks) {
		
				var bookmark = new esri.dijit.Bookmarks({
				  map: map, 
				  bookmarks: [],
				  editable: true
				}, bookmarkDOM); 

				// Add bookmarks to the widget
				var bookmarkCA = {
					"extent": {
					"spatialReference": {
						"wkid": 102100
					},
					"xmin":-14201669,
					"ymin":4642975,
					"xmax":-13021482,
					"ymax":5278931
				  },
				  "name": "Northern California" 
				};
				var bookmarkPA = {
				  "extent": {
					"spatialReference": {
					  "wkid":102100
					},
					"xmin":-8669334,
					"ymin":4982379,
					"xmax":-8664724,
					"ymax":4984864
				  },
				  "name": "Central Pennsylvania"
				};
				bookmark.addBookmark(bookmarkCA);
				bookmark.addBookmark(bookmarkPA);
			});
		}
		
		
		function initCookies(list) {
			// settings cookies
			var cookieName='';
			console.log(list);
			angular.forEach(list, function (value, key) {
				cookieName ="userSettings."+value;
				if (!$cookies.get(cookieName)) {
					$cookies.put(cookieName, "no");
					console.log(value);
				} else {
					console.log("cookie set: "+value);
				}
			});
//			console.log($cookies.get("userSettings"));
		}

		function setCoordinatesToCurrent() {
			$cookies.put("userSettings.X-Coordinate") = mapModel.lng;
			$cookies.put("userSettings.Y-Coordinate") = mapModel.lat;
			$cookies.put("userSettings.Zoom-Level") = mapModel.scale;
		}

		function initBasemapGallery(BasemapGalleryDOM) {
			require(["esri/dijit/BasemapGallery",
					"dojo/domReady!"
				],
				function (basemapGallery) {
				var basemapGallery = new basemapGallery({
						showArcGISBasemaps : true,
						map : map
					}, BasemapGalleryDOM);
				basemapGallery.startup();
				// Listen to the basemap selection and set the title
				// on(basemapGallery, "onSelectionChange", function() {
				// dom.byId("userMessage").innerHTML = basemapGallery.getSelected().title;
				// });
			});
		};

		function configureMapAnimation() {
			require(["esri/config"],
				function (esriConfig) {
				//configure map animation to be faster
				esriConfig.defaults.map.panDuration = 1; // time in milliseconds, default panDuration: 350
				esriConfig.defaults.map.panRate = 1; // default panRate: 25
				esriConfig.defaults.map.zoomDuration = 100; // default zoomDuration: 500
				esriConfig.defaults.map.zoomRate = 1; // default zoomRate: 25
			});
		}

		function refreshMapData(mapModel) {
			mapModel.zoom = map.getZoom();
			var geoCenter = map.geographicExtent.getCenter();
			mapModel.lng = geoCenter.x;
			mapModel.lat = geoCenter.y;
			mapModel.scale = map.getScale();
			mapModel.basemap = map.getBasemap();
			mapModel.maplayers = map.getLayersVisibleAtScale(mapModel.scale);
			mapModel.layerOpacity = layerOpacityArray();
			//			window.history.pushState("page", "page title", "index.htm?xCenter="+mapModel.lng+"&yCenter="+mapModel.lng+"&Scale="+mapModel.scale);
			parent.location.hash = "xCenter=" + mapModel.lng + "&yCenter=" + mapModel.lng + "&Scale=" + mapModel.scale;
			//			console.log("layer opacity: "+vm.layerOpacity[0]);
		}

		function destroy() {
			map.destroy();
		}

	}

}
	());
