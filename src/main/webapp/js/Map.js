	// ������� �������������
	// ����� osm
	//function initOSMMap() {
	//	var extent = new OpenLayers.Bounds(restrictedAreaBounds.left,
	//			restrictedAreaBounds.bottom, restrictedAreaBounds.right,
	//			restrictedAreaBounds.top);
	//
	//	map = new OpenLayers.Map("map", {
	//		controls : [ new OpenLayers.Control.Navigation(),
	//				new OpenLayers.Control.PanZoomBar(),
	//				new OpenLayers.Control.MousePosition(),
	//				new OpenLayers.Control.LayerSwitcher(),
	//				new OpenLayers.Control.Attribution(),
	//				new OpenLayers.Control.OverviewMap(), ],
	//		numZoomLevels : 25,
	//		maxExtent : extent,
	//		restrictedExtent : new OpenLayers.Bounds(restrictedAreaBounds.left,
	//				restrictedAreaBounds.bottom, restrictedAreaBounds.right,
	//				restrictedAreaBounds.top),
	//		projection : MAP_PORJECTION,
	//		displayProjection : MAP_DISPLAY_PROJECTION
	//	});
	//
	//	map.addLayer(new OpenLayers.Layer.OSM());
	//	map.zoomToExtent(extent);

		// ������������� �������� �� �����
	//	markers = new OpenLayers.Layer.Markers("Markers");
	//	map.addLayer(markers);

		// ------------------------------------------------------
		// ���������� ����
		// ��������� ��������
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

		// ����������
		// ���������������
		// ����������� ����� ��
		// �����

		//}
(function() {
	// Objects position ajax requester
	var objectsPositionAjaxRequester;
	var UPDATE_OBJECTS_POSITION_TIMEOUT = 2000;
	var UPDATE_OBJECTS_POSITION_URL = "http://localhost:8080/Realtime-transport-monitoring/getAllTransportData.html";
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

	function outputMessage(message) {
		var out = document.getElementById("output");
		out.innerHTML = message;
	}

	function createAddFinishTraceMarkerOnClickControl() {
		var handler = function(control, evt){
				finishTracePosition = convertViewPortPositionToMapPosition(map, evt.xy)
				var marker = createMarker(map, 12, finishTracePosition);
				addMarker(marker, markers);
				addStartTraceMarkerOnClickControl.deactivate();
				addFinishTraceMarkerOnClickControl.activate();
				
				var url = createRouteConstructUrl(
						startTracePosition,
						finishTracePosition, "foot", "true");
				outputRoute("Route", url,
						new OpenLayers.Format.KML());
		}
		return createOneClickControl(handler);	 
	}

	function createAddStartTraceMarkerOnClickControl() {
		var handler = function(control, evt){
				startTracePosition = convertViewPortPositionToMapPosition(map, evt.xy)
				var marker = createMarker(map, 12, startTracePosition);
				addMarker(marker, markers);
				addStartTraceMarkerOnClickControl.deactivate();
				addFinishTraceMarkerOnClickControl.activate();
		}
		return createOneClickControl(handler);	 
	}

	function initControls() {
		//showClickCoordinatesControl = createShowClickCoordinatesControl(alert);
		//map.addControl(showClickCoordinatesControl);
		//showClickCoordinatesControl.activate();
		
		addMarkerOnClickControl = createAddMarkerOnClickControl(map, markers);
		map.addControl(addMarkerOnClickControl);

		// ------------Routing------------------
		//	addFinishTraceMarkerOnClickControl = createAddFinishTraceMarkerOnClickControl();
		//	map.addControl(addFinishTraceMarkerOnClickControl);

		//	addStartTraceMarkerOnClickControl = createAddStartTraceMarkerOnClickControl();
		//	map.addControl(addStartTraceMarkerOnClickControl);

		// ------------------------------
		// ��������� ���������� ��� ������� ������ ���������� ������� ��������
		document.getElementById("addMarkerButton").onclick = function() {
			addMarkerOnClickControl.activate();
		}

		// ��������� ���������� ��� ������� ������ ��������� ��������
		//document.getElementById("constructTraceButton").onclick = function() {
		//	addStartTraceMarkerOnClickControl.activate();
		//}
	}
	
	// Update object position function
	function updateObjectsPosition(http_request) {
		var xmldoc = http_request.responseXML;
		var objects = xmldoc.getElementsByTagName('object');

		for (var i = 0; i < objects.length; i++) {
			if(objects[i] != null){
				var id = objects[i].getAttribute("id");
				var routeID = objects[i].getAttribute("routeID");
				// If id or routeID not defined
				if(id == null || routeID == null){
					continue;
				}
		
				var name = objects[i].getAttribute("name");
				var routeCheckBox = document.getElementById(routeID);
				if(routeCheckBox.checked){
					var lon = objects[i].getAttribute("lon");
					var lat = objects[i].getAttribute("lat");
					var position = new OpenLayers.LonLat(lon, lat);
					//var description = objects[i].getAttribute("description");
					moveMarker(map, id, position, markers);
					setMarkerVisible(id, true, markers);
				}
				else{
					setMarkerVisible(id, false, markers);
				}
			}
		}
	}
	
	// Get new objects position 
	function getNewObjectsPosition() {
		if (objectsPositionAjaxRequester == null) {
			objectsPositionAjaxRequester = new AjaxRequester(
					updateObjectsPosition, outputMessage);
		}
		objectsPositionAjaxRequester
				.makeGetRequest(UPDATE_OBJECTS_POSITION_URL);

		setTimeout(getNewObjectsPosition, UPDATE_OBJECTS_POSITION_TIMEOUT);
	}

	// ������� ���������� �����
	// �������� ��������
	window.onload = function() {
		initOSMMap();
		initControls();

		// get markers position
		setTimeout(getNewObjectsPosition, UPDATE_OBJECTS_POSITION_TIMEOUT);
		
		//moveMarker();
		
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



		// Construct route example
		//var startPoint = new OpenLayers.LonLat(35.90027, 56.83752);
		//var finishPoint = new OpenLayers.LonLat(35.80504, 56.84477);
		//var url = createRouteConstructUrl(startPoint, finishPoint, "foot",
		//		"true");
		//outputRoute("Test route", url, new OpenLayers.Format.KML());
	}

})();
