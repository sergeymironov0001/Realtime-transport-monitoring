(function() {
	var map;
	var markers;
	var routeDrawControl;
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
	 *            позиция на панели отображения карты
	 * 
	 * @retrun - координаты точки на карте
	 */
	function convertViewPortPositionToMapPosition(viewPortPosition) {
		var lonlat = map.getLonLatFromViewPortPx(viewPortPosition);
		lonlat.transform(map.projection, map.displayProjection);
		return lonlat;
	}

	// ������ ������ � OpenLayers.loadURL
	// OpenLayers.loadURL(
	// "http://geocommons.com/overlays/128725/features.json?limit=10",
	// null, null, function(e) {
	// outputMessage(e.responseText);
	// }, function(e) {
	// outputMessage(e.responseText);
	// });

	/**
	 * ������� ������ ��������� �� ��������
	 * 
	 * @param message -
	 *            ���������
	 */
	function outputMessage(message) {
		var out = document.getElementById("output");
		out.innerHTML = message;
	}

	// �������� ��������������� ����������� ����� �� �����
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
			outputMessage("You clicked near " + +point.lon + " E, " + point.lat
					+ " N");
		}

	});

	/**
	 * ������� ��������� ��������� �� �����
	 * 
	 * @param routesName -
	 *            �������� ���������
	 * @param routesData -
	 *            ������ ���������
	 * @param routesDataFormat -
	 *            ������ ������ ��������� (��� OpenLayers.Format)
	 * @param mapStyle -
	 *            ����� ���������� ��������� (��� OpenLayers.StyleMap)
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
	 * ������� �������� ������� �� �����
	 * 
	 * @param routeName -
	 *            �������� ��������
	 * @param routesData -
	 *            ������ ��������
	 * @param routesDataFormat -
	 *            ������ ������ �������� (��� OpenLayers.Format)
	 */
	function outputRoute(routeName, routeData, routeDataFormat) {
		// ������� ����� ����� ��� ��������� ��������
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

	// ������� ������������� ����� osm
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

		// ------------------------------------------------------
		// ���������� ���� ��������� ��������
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
		// Рисование маршуртов
		// map.addLayer(routesLayer);

		// routeDrawControl = new OpenLayers.Control.DrawFeature(routesLayer,
		// OpenLayers.Handler.Path)

		// map.addControl(routeDrawControl);
		// ------------------------------------------------------
		// Добавляем слой маркеров на карту
		// markers = new OpenLayers.Layer.Markers("Markers");
		// map.addLayer(markers);

		// ------------------------------------------------------

		// var Navigation = new OpenLayers.Control.Navigation({
		// defaultDblClick : function(event) {
		// return;
		// }
		// });
		// map.addControl(Navigation);

		// ���������� ��������������� ����������� ����� �� �����
		var click = new OpenLayers.Control.Click();
		map.addControl(click);
		click.activate();
	}

	// ������� ���������� ����� �������� ��������
	window.onload = function() {
		initOSMMap();

		// getNewObjectsPosition();

		// // Обработчик нажатия кнопки
		// document.getElementById("updateMarkersPositionButton").onclick =
		// getNewObjectsPosition;
		//
		// // Обработчики кнопок для рисования
		// // маршрутов
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
		var finishPoint = new OpenLayers.LonLat(35.93006, 56.85686);
		var url = createRouteConstructUrl(startPoint, finishPoint, "foot",
				"true");
		outputMessage(url);
		outputRoute("Route", url, new OpenLayers.Format.KML());

	}

})();