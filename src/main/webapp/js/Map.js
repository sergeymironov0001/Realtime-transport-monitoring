(function() {
	var map;
	var markers;
	// Controls------------------------------------
	var routeDrawControl;
	var addMarkerOnClickControl;
	var showClickCoordinatesControl;
	var addFinishTraceMarkerOnClickControl;
	var addStartTraceMarkerOnClickControl;
	// ------------------------------------
	var startTracePosition;
	var finishTracePosition;
	// ------------------------------------
	var objectsPositionAjaxRequester = null;
	var MAP_PORJECTION = new OpenLayers.Projection("EPSG:900913");
	var MAP_DISPLAY_PROJECTION = new OpenLayers.Projection("EPSG:4326");
	var ROUTING_API_BASE_URL = "http://www.yournavigation.org/api/1.0/gosmore.php?";
	var restrictedAreaBounds = {
		left : 3974190.41092,
		bottom : 7715591.85224,
		right : 4015619.28024,
		top : 7747848.27817
	};

	/**
	 * 
	 * @param viewPortPosition -
	 *            РїРѕР·РёС†РёСЏ РЅР° РїР°РЅРµР»Рё РѕС‚РѕР±СЂР°Р¶РµРЅРёСЏ
	 *            РєР°СЂС‚С‹
	 * 
	 * @retrun - РєРѕРѕСЂРґРёРЅР°С‚С‹ С‚РѕС‡РєРё РЅР° РєР°СЂС‚Рµ
	 */
	function convertViewPortPositionToMapPosition(viewPortPosition) {
		var lonlat = map.getLonLatFromViewPortPx(viewPortPosition);
		lonlat.transform(map.projection, map.displayProjection);
		return lonlat;
	}

	/**
	 * Создать маркер начала маршрута
	 * 
	 * @param id -
	 * @param position -
	 *            позиция объекта на карте (OpenLayers.LonLat);
	 */
	function createStartTraceMarker(id, position) {
		var lonlat = new OpenLayers.LonLat(position.lon, position.lat)
				.transform(MAP_DISPLAY_PROJECTION, map.getProjectionObject());
		var marker = new OpenLayers.Marker(lonlat);
		marker.id = id;
		return marker;
	}

	/**
	 * Создать маркер окончания маршрута маршрута
	 * 
	 * @param id -
	 * @param position -
	 *            позиция объекта на карте (OpenLayers.LonLat);
	 */
	function createFinishTraceMarker(id, position) {
		return createStartTraceMarker(id, position);
	}

	/**
	 * Создать маркер окончания маршрута маршрута
	 * 
	 * @param id -
	 * @param position -
	 *            позиция объекта на карте (OpenLayers.LonLat);
	 */
	function createMarker(id, position) {
		return createStartTraceMarker(id, position);
	}
	/**
	 * Добавить маркер на карту
	 * 
	 * @param marker -
	 *            маркер (OpenLayers.Marker)
	 */
	function addMarker(marker) {
		markers.addMarker(marker);
	}

	// пїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅ пїЅ OpenLayers.loadURL
	// OpenLayers.loadURL(
	// "http://geocommons.com/overlays/128725/features.json?limit=10",
	// null, null, function(e) {
	// outputMessage(e.responseText);
	// }, function(e) {
	// outputMessage(e.responseText);
	// });

	/**
	 * пїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ
	 * пїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ
	 * 
	 * @param message -
	 *            пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ
	 */
	function outputMessage(message) {
		var out = document.getElementById("output");
		out.innerHTML = message;
	}

	/**
	 * Добавляем обработчики событий мыши
	 */
	function createShowClickCoordinatesControl() {
		OpenLayers.Control.Click = OpenLayers.Class(OpenLayers.Control, {
			defaultHandlerOptions : {
				'single' : true,
				'double' : false,
				'pixelTolerance' : 0,
				'stopSingle' : false,
				'stopDouble' : false
			},

			initialize : function(options) {
				this.handlerOptions = OpenLayers.Util.extend({},
						this.defaultHandlerOptions);
				OpenLayers.Control.prototype.initialize.apply(this, arguments);
				this.handler = new OpenLayers.Handler.Click(this, {
					'click' : this.onClick
				}, this.handlerOptions);
			},

			onClick : function(evt) {
				var point = convertViewPortPositionToMapPosition(evt.xy)
				outputMessage("You clicked near " + +point.lon + " E, "
						+ point.lat + " N");
			}

		});
		return new OpenLayers.Control.Click();
	}
	/**
	 * пїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ
	 * пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅ пїЅпїЅпїЅпїЅпїЅ
	 * 
	 * @param routesName -
	 *            пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ
	 * @param routesData -
	 *            пїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ
	 * @param routesDataFormat -
	 *            пїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅ
	 *            пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ (пїЅпїЅпїЅ OpenLayers.Format)
	 * @param mapStyle -
	 *            пїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ
	 *            пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ (пїЅпїЅпїЅ OpenLayers.StyleMap)
	 */
	function outputRoutes(routesName, routesDataUrl, routesDataFormat, mapStyle) {
		var layer = new OpenLayers.Layer.Vector(routesName, {
			projection : MAP_DISPLAY_PROJECTION,
			strategies : [ new OpenLayers.Strategy.Fixed() ],
			protocol : new OpenLayers.Protocol.HTTP({
				url : routesDataUrl,
				format : routesDataFormat
			}),
			styleMap : mapStyle
		});
		map.addLayer(layer);
	}

	/**
	 * пїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅпїЅ
	 * пїЅпїЅ пїЅпїЅпїЅпїЅпїЅ
	 * 
	 * @param routeName -
	 *            пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ
	 * @param routesData -
	 *            пїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ
	 * @param routesDataFormat -
	 *            пїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ
	 *            (пїЅпїЅпїЅ OpenLayers.Format)
	 */
	function outputRoute(routeName, routeData, routeDataFormat) {
		// пїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅ
		// пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ
		var style = new OpenLayers.Style({
			fillColor : "red"
		}, {
			rules : [ new OpenLayers.Rule({
				filter : new OpenLayers.Filter.Comparison({
					type : OpenLayers.Filter.Comparison.EQUAL_TO,
					property : "name",
					value : routeName
				}),
				symbolizer : {
					fillColor : "blue",
					strokeWidth : 4,
					strokeOpacity : 0.5,
					strokeColor : "red"
				}
			}), new OpenLayers.Rule({
				elseFilter : true,
				symbolizer : {
					fillColor : "blue",
					strokeWidth : 4,
					strokeOpacity : 0.5,
					strokeColor : "green"
				}
			}) ]
		});
		var styleMap = new OpenLayers.StyleMap({
			"default" : style,
			"select" : new OpenLayers.Style({
				fillColor : "fuchsia"
			})
		});

		// var styleMap = new OpenLayers.StyleMap(style);
		outputRoutes(routeName, routeData, routeDataFormat, styleMap);
	}

	// пїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ
	// пїЅпїЅпїЅпїЅпїЅ osm
	function initOSMMap() {
		var extent = new OpenLayers.Bounds(restrictedAreaBounds.left,
				restrictedAreaBounds.bottom, restrictedAreaBounds.right,
				restrictedAreaBounds.top);

		map = new OpenLayers.Map("map", {
			controls : [ new OpenLayers.Control.Navigation(),
					new OpenLayers.Control.PanZoomBar(),
					new OpenLayers.Control.MousePosition(),
					new OpenLayers.Control.LayerSwitcher(),
					new OpenLayers.Control.Attribution(),
					new OpenLayers.Control.OverviewMap(), ],
			numZoomLevels : 25,
			maxExtent : extent,
			restrictedExtent : new OpenLayers.Bounds(restrictedAreaBounds.left,
					restrictedAreaBounds.bottom, restrictedAreaBounds.right,
					restrictedAreaBounds.top),
			projection : MAP_PORJECTION,
			displayProjection : MAP_DISPLAY_PROJECTION
		});

		map.addLayer(new OpenLayers.Layer.OSM());
		map.zoomToExtent(extent);

		// Инициализация маркеров на карте
		markers = new OpenLayers.Layer.Markers("Markers");
		map.addLayer(markers);

		// ------------------------------------------------------
		// пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅ
		// пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ
		// var lgpx = new OpenLayers.Layer.GML("Traces", "gpx/traces.gpx", {
		// format : OpenLayers.Format.GPX,
		// // style : {
		// // strokeColor : "green",
		// // strokeWidth : 5,
		// // strokeOpacity : 0.5
		// // },

		// projection : new OpenLayers.Projection("EPSG:4326"),
		// styleMap : getLineStyles()
		// });
		// map.addLayer(lgpx);

		// ------------------------------------------------------
		// var routesLayer = new OpenLayers.Layer.Vector("Drawing traces");
		// Р РёСЃРѕРІР°РЅРёРµ РјР°СЂС€СѓСЂС‚РѕРІ
		// map.addLayer(routesLayer);

		// routeDrawControl = new OpenLayers.Control.DrawFeature(routesLayer,
		// OpenLayers.Handler.Path)

		// map.addControl(routeDrawControl);
		// ------------------------------------------------------
		// Р”РѕР±Р°РІР»СЏРµРј СЃР»РѕР№ РјР°СЂРєРµСЂРѕРІ РЅР° РєР°СЂС‚Сѓ
		// markers = new OpenLayers.Layer.Markers("Markers");
		// map.addLayer(markers);

		// ------------------------------------------------------

		// var Navigation = new OpenLayers.Control.Navigation({
		// defaultDblClick : function(event) {
		// return;
		// }
		// });
		// map.addControl(Navigation);

		// пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ
		// пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ
		// пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅ пїЅпїЅ
		// пїЅпїЅпїЅпїЅпїЅ

	}

	/**
	 * Функция создает обработчик клика мыши по карте. После клика на карте
	 * появляется маркер
	 */
	function createAddMarkerOnClickControl() {
		OpenLayers.Control.Click = OpenLayers.Control.Click = OpenLayers
				.Class(
						OpenLayers.Control,
						{
							defaultHandlerOptions : {
								'single' : true,
								'double' : false,
								'pixelTolerance' : 0,
								'stopSingle' : false,
								'stopDouble' : false
							},

							initialize : function(options) {
								this.handlerOptions = OpenLayers.Util.extend(
										{}, this.defaultHandlerOptions);
								OpenLayers.Control.prototype.initialize.apply(
										this, arguments);
								this.handler = new OpenLayers.Handler.Click(
										this, {
											'click' : this.onClick
										}, this.handlerOptions);
							},

							onClick : function(evt) {
								var point = convertViewPortPositionToMapPosition(evt.xy)
								var marker = createMarker(12, point);
								addMarker(marker);
								addMarkerOnClickControl.deactivate();
							}

						});
		return new OpenLayers.Control.Click();
	}

	function createAddFinishTraceMarkerOnClickControl() {
		OpenLayers.Control.Click = OpenLayers.Control.Click = OpenLayers
				.Class(
						OpenLayers.Control,
						{
							defaultHandlerOptions : {
								'single' : true,
								'double' : false,
								'pixelTolerance' : 0,
								'stopSingle' : false,
								'stopDouble' : false
							},

							initialize : function(options) {
								this.handlerOptions = OpenLayers.Util.extend(
										{}, this.defaultHandlerOptions);
								OpenLayers.Control.prototype.initialize.apply(
										this, arguments);
								this.handler = new OpenLayers.Handler.Click(
										this, {
											'click' : this.onClick
										}, this.handlerOptions);
							},

							onClick : function(evt) {
								finishTracePosition = convertViewPortPositionToMapPosition(evt.xy)
								var marker = createFinishTraceMarker(12,
										finishTracePosition);
								addMarker(marker);
								addFinishTraceMarkerOnClickControl.deactivate();

								var url = createRouteConstructUrl(
										startTracePosition,
										finishTracePosition, "foot", "true");
								outputRoute("Route", url,
										new OpenLayers.Format.KML());

							}
						});
		return new OpenLayers.Control.Click();
	}

	function createAddStartTraceMarkerOnClickControl() {
		OpenLayers.Control.Click = OpenLayers.Control.Click = OpenLayers
				.Class(
						OpenLayers.Control,
						{
							defaultHandlerOptions : {
								'single' : true,
								'double' : false,
								'pixelTolerance' : 0,
								'stopSingle' : false,
								'stopDouble' : false
							},

							initialize : function(options) {
								this.handlerOptions = OpenLayers.Util.extend(
										{}, this.defaultHandlerOptions);
								OpenLayers.Control.prototype.initialize.apply(
										this, arguments);
								this.handler = new OpenLayers.Handler.Click(
										this, {
											'click' : this.onClick
										}, this.handlerOptions);
							},

							onClick : function(evt) {
								startTracePosition = convertViewPortPositionToMapPosition(evt.xy)
								var marker = createStartTraceMarker(12,
										startTracePosition);
								addMarker(marker);
								addStartTraceMarkerOnClickControl.deactivate();
								addFinishTraceMarkerOnClickControl.activate();
							}
						});
		return new OpenLayers.Control.Click();
	}

	function initControls() {

		showClickCoordinatesControl = createShowClickCoordinatesControl();
		map.addControl(showClickCoordinatesControl);
		showClickCoordinatesControl.activate();

		addMarkerOnClickControl = createAddMarkerOnClickControl();
		map.addControl(addMarkerOnClickControl);

		// ------------Routing------------------
		addFinishTraceMarkerOnClickControl = createAddFinishTraceMarkerOnClickControl();
		map.addControl(addFinishTraceMarkerOnClickControl);

		addStartTraceMarkerOnClickControl = createAddStartTraceMarkerOnClickControl();
		map.addControl(addStartTraceMarkerOnClickControl);
		
		

		// var d = new OpenLayers.Control.DragFeature(markers);
		// map.addControl(d);
		// d.activate();
		// ------------------------------
		// Добавляем обработчик для нажатия кнопки добавления маркера маршрута
		document.getElementById("addMarkerButton").onclick = function() {
			addMarkerOnClickControl.activate();
		}

		// Добавляем обработчик для нажатия кнопки прокалдки маршрута
		document.getElementById("constructTraceButton").onclick = function() {
			addStartTraceMarkerOnClickControl.activate();
		}
	}

	// пїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅ
	// пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ
	window.onload = function() {
		initOSMMap();
		initControls();

		// getNewObjectsPosition();

		// // РћР±СЂР°Р±РѕС‚С‡РёРє РЅР°Р¶Р°С‚РёСЏ РєРЅРѕРїРєРё
		// document.getElementById("updateMarkersPositionButton").onclick =
		// getNewObjectsPosition;
		//
		// // РћР±СЂР°Р±РѕС‚С‡РёРєРё РєРЅРѕРїРѕРє РґР»СЏ СЂРёСЃРѕРІР°РЅРёСЏ
		// // РјР°СЂС€СЂСѓС‚РѕРІ
		// document.getElementById("startDrawTraceButton").onclick = function()
		// {
		// routeDrawControl.activate();
		// return false;
		// }
		// document.getElementById("stopDrawTraceButton").onclick = function() {
		// routeDrawControl.deactivate();
		// return false;
		// }

		// setTimeout(getNewObjectsPosition, 2000);

		// Construct route example
		var startPoint = new OpenLayers.LonLat(35.90027, 56.83752);
		var finishPoint = new OpenLayers.LonLat(35.80504, 56.84477);
		var url = createRouteConstructUrl(startPoint, finishPoint, "foot",
				"true");
		outputRoute("Test route", url, new OpenLayers.Format.KML());

	}

})();